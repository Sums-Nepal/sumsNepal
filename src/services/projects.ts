import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { account, databases, ID } from "../lib/appwrite";
import type { Project, Person } from "../types/componentsType/projectTypes";
import { APPWRITE_CONFIG, PAGE_SIZE } from "../constant";
import { Query, Permission, Role } from "appwrite";

/** ---------------------------------------------
 * Types
 * --------------------------------------------- */

export type GetProjectsArgs = {
  page: number;
  stage?: string | null;
  colleges?: string[];
  years?: number[]; // year filter like [2024, 2025]
  q?: string; // search text
};

type SerializableError = {
  message: string;
  code?: number;
  type?: string;
};

/** ---------------------------------------------
 * Helpers
 * --------------------------------------------- */

// ✅ Always return a serializable error (fixes RTK non-serializable warning)
function toSerializableError(e: any): SerializableError {
  return {
    message: e?.message ?? "Something went wrong",
    code: e?.code,
    type: e?.type,
  };
}

// helper: safe delete (doesn't crash rollback if delete fails)
async function safeDeleteDoc(
  databaseId: string,
  collectionId: string,
  documentId: string
) {
  try {
    await databases.deleteDocument(databaseId, collectionId, documentId);
  } catch {
    // ignore rollback delete errors
  }
}

/**
 * Convert relationship doc -> Person
 */
const toPerson = (docOrId: any): Person => {
  if (!docOrId || typeof docOrId === "string") return { name: "", email: "" };
  return {
    name: docOrId.name ?? "",
    email: docOrId.email ?? "",
  };
};

const toPersonsArray = (arr: any): Person[] => {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => toPerson(x)).filter((p) => p.name || p.email);
};

const toProject = (doc: any): Project => ({
  id: doc.$id,
  title: doc.title ?? "",
  description: doc.description ?? "",
  stage: doc.stage ?? "idea",
  team: doc.team ?? "",
  college: doc.college ?? "",
  year: doc.year ?? "", // keep as stored (string/datetime)
  image: doc.image ?? "",
  projectLeaders: toPerson(doc.projectLeaders),
  teams: toPersonsArray(doc.teams),
});

function readLeaderId(projectDoc: any): string | undefined {
  const v = projectDoc?.projectLeaders;
  if (!v) return undefined;
  if (typeof v === "string") return v;
  return v?.$id;
}

function readTeamIds(projectDoc: any): string[] {
  const v = projectDoc?.teams;
  if (!Array.isArray(v)) return [];
  return v
    .map((t: any) => (typeof t === "string" ? t : t?.$id))
    .filter(Boolean);
}

/**
 * Convert any stored year to JS year number (frontend safe)
 */
function yearToNumber(value: any): number | null {
  if (!value) return null;
  // if already number (rare)
  if (typeof value === "number") return value;

  const s = String(value);

  // Try Date parse (works if Appwrite stored datetime ISO OR readable string)
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return d.getFullYear();

  // If format like "12/17/2025 05:45:00.000 AM"
  // Try extracting 4-digit year
  const match = s.match(/\b(20\d{2}|19\d{2})\b/);
  if (match) return Number(match[1]);

  return null;
}

function matchesSearch(p: Project, q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    (p.title ?? "").toLowerCase().includes(s) ||
    (p.description ?? "").toLowerCase().includes(s) ||
    (p.team ?? "").toLowerCase().includes(s) ||
    (p.college ?? "").toLowerCase().includes(s)
  );
}

function matchesYears(p: Project, years: number[]) {
  if (!Array.isArray(years) || years.length === 0) return true;
  const y = yearToNumber(p.year);
  if (!y) return false;
  return years.includes(y);
}

/**
 * Build Appwrite listDocuments queries safely
 * - We will try backend year filtering (between) ONLY using ISO bounds.
 * - If it fails due to bad stored format, we fallback automatically.
 */
function buildBaseQueries(page: number) {
  const offset = (page - 1) * PAGE_SIZE;

  return [
    Query.select(["*", "projectLeaders.*", "teams.*"]),
    Query.limit(PAGE_SIZE),
    Query.offset(offset),
    Query.orderDesc("$createdAt"),
  ];
}

function yearRangeISO(y: number) {
  return {
    start: `${y}-01-01T00:00:00.000Z`,
    end: `${y}-12-31T23:59:59.999Z`,
  };
}

/**
 * Fetch ALL docs with pagination (used for getProjectColleges/getProjectYears)
 * Appwrite has max limits, so we page until done.
 */
async function fetchAllDocsSelect(
  selectFields: string[],
  extraQueries: any[] = []
) {
  const limit = 100; // safe
  let offset = 0;

  const all: any[] = [];
  while (true) {
    const res = await databases.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.projectsCollectionId,
      [Query.select(selectFields), Query.limit(limit), Query.offset(offset), ...extraQueries]
    );

    all.push(...res.documents);
    offset += res.documents.length;

    if (offset >= res.total || res.documents.length === 0) break;
  }

  return all;
}

/** ---------------------------------------------
 * Update inputs
 * --------------------------------------------- */

type PersonInput = Person & { $id?: string };

type UpdateProjectInput = {
  id: string;
  data: Partial<Omit<Project, "id">> & {
    projectLeaders?: PersonInput;
    teams?: PersonInput[];
  };
};

/** ---------------------------------------------
 * API
 * --------------------------------------------- */

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Projects", "ProjectFilters"],
  endpoints: (builder) => ({
    /**
     * ✅ GET PROJECTS (server filters + safe fallbacks)
     */
    getProjects: builder.query<
      { projects: Project[]; hasMore: boolean; total: number },
      GetProjectsArgs
    >({
      async queryFn(args) {
        try {
          const { page, stage, colleges, years, q } = args;
          const offset = (page - 1) * PAGE_SIZE;

          // Base queries
          const queries: any[] = buildBaseQueries(page);

          // stage filter
          if (stage) queries.push(Query.equal("stage", stage));

          // colleges filter (multi OR)
          if (Array.isArray(colleges) && colleges.length > 0) {
            queries.push(Query.equal("college", colleges));
          }

          // We'll try backend search first (needs FULLTEXT index on title)
          const hasSearch = !!q?.trim();
          if (hasSearch) {
            queries.push(Query.search("title", q!.trim()));
          }

          // Year filter:
          // - If only one year: use between
          // - If multiple years: Appwrite has no OR between, so we do multiple requests and merge.
          const yearList = Array.isArray(years) ? years.filter(Boolean) : [];

          // helper to run listDocuments and map
          const run = async (qs: any[]) => {
            const res = await databases.listDocuments(
              APPWRITE_CONFIG.databaseId,
              APPWRITE_CONFIG.projectsCollectionId,
              qs
            );
            return res;
          };

          // =============== Case: 0 or 1 year selected ===============
          if (yearList.length <= 1) {
            let res: any;

            // Try with year between if selected
            if (yearList.length === 1) {
              const r = yearRangeISO(yearList[0]);
              try {
                res = await run([...queries, Query.between("year", r.start, r.end)]);
              } catch (e: any) {
                // fallback: remove year filter and filter client-side
                res = await run(queries);
              }
            } else {
              res = await run(queries);
            }

            let projects = res.documents.map(toProject);

            // If backend search failed (no fulltext index), fallback:
            // We detect this by catching earlier — but Appwrite throws in run(),
            // so we also guard by refetch if needed.
            // (If it reached here, it didn't throw.)
            // Still, if year fallback used, apply client-side year filter.
            if (yearList.length === 1) {
              projects = projects.filter((p: Project) => matchesYears(p, yearList));
            }

            // If search wasn't applied backend (because it threw earlier),
            // you'd be in catch. Here we still do client-side search for safety.
            if (hasSearch) projects = projects.filter((p: Project) => matchesSearch(p, q!.trim()));

            const hasMore = offset + res.documents.length < res.total;
            return { data: { projects, hasMore, total: res.total } };
          }

          // =============== Case: multiple years selected ===============
          // We'll do multiple listDocuments with between and merge/dedupe.
          const merged = new Map<string, any>();
          let totalApprox = 0;

          for (const y of yearList) {
            const r = yearRangeISO(y);

            try {
              const res = await run([...queries, Query.between("year", r.start, r.end)]);
              totalApprox += res.total;
              for (const d of res.documents) merged.set(d.$id, d);
            } catch (e: any) {
              // fallback if year between fails (bad stored format):
              // fetch without year filter, merge what we can
              const res = await run(queries);
              totalApprox += res.total;
              for (const d of res.documents) merged.set(d.$id, d);
              break;
            }
          }

          // After merge, apply pagination client-side
          let mergedArr = Array.from(merged.values()).map(toProject);

          // Ensure year filter really applied (fallback safety)
          mergedArr = mergedArr.filter((p) => matchesYears(p, yearList));

          // search safety
          if (hasSearch) mergedArr = mergedArr.filter((p) => matchesSearch(p, q!.trim()));

          const pageSlice = mergedArr.slice(offset, offset + PAGE_SIZE);
          const hasMore = offset + pageSlice.length < mergedArr.length;

          return {
            data: {
              projects: pageSlice,
              hasMore,
              total: mergedArr.length || totalApprox,
            },
          };
        } catch (e: any) {
          // ✅ serializable error
          return { error: toSerializableError(e) as any };
        }
      },

      providesTags: (result) =>
        result?.projects?.length
          ? [
              { type: "Projects", id: "LIST" },
              ...result.projects.map((p) => ({ type: "Projects" as const, id: p.id })),
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),

    /**
     * ✅ GET DISTINCT COLLEGES (backend)
     */
    getProjectColleges: builder.query<string[], void>({
      async queryFn() {
        try {
          const docs = await fetchAllDocsSelect(["college"]);
          const colleges = Array.from(
            new Set(docs.map((d: any) => (d.college ?? "").trim()).filter(Boolean))
          ).sort();

          return { data: colleges };
        } catch (e: any) {
          return { error: toSerializableError(e) as any };
        }
      },
      providesTags: [{ type: "ProjectFilters", id: "COLLEGES" }],
    }),

    /**
     * ✅ GET DISTINCT YEARS (backend, derived from `year`)
     * Works even if stored like "12/17/2025 05:45:00.000 AM"
     */
    getProjectYears: builder.query<number[], void>({
      async queryFn() {
        try {
          const docs = await fetchAllDocsSelect(["year"]);
          const years = Array.from(
            new Set(
              docs
                .map((d: any) => yearToNumber(d.year))
                .filter((x: any) => typeof x === "number" && Number.isFinite(x))
            )
          ).sort((a, b) => b! - a!);

          return { data: years as number[] };
        } catch (e: any) {
          return { error: toSerializableError(e) as any };
        }
      },
      providesTags: [{ type: "ProjectFilters", id: "YEARS" }],
    }),

    /**
     * ✅ GET BY ID
     */
    getProjectById: builder.query<Project, string>({
      async queryFn(projectId) {
        try {
          if (!projectId) return { error: { message: "Project id is required" } as any };

          const doc = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            projectId,
            [Query.select(["*", "projectLeaders.*", "teams.*"])]
          );

          return { data: toProject(doc) };
        } catch (e: any) {
          return { error: toSerializableError(e) as any };
        }
      },
      providesTags: (_res, _err, id) => [{ type: "Projects", id }],
    }),

    /**
     * ✅ CREATE (leader + teams in separate collections)
     */
    createProject: builder.mutation<Project, Omit<Project, "id">>({
      async queryFn(project) {
        const created: Array<{ collectionId: string; id: string }> = [];

        try {
          const user = await account.get();
          if (!user) throw new Error("You are not authorized to add a project");

          if (!project.projectLeaders?.name?.trim() || !project.projectLeaders?.email?.trim()) {
            throw new Error("Team leader name/email is required");
          }

          // 1) Create leader
          const leaderDoc = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            "project_leaders",
            ID.unique(),
            {
              name: project.projectLeaders.name.trim(),
              email: project.projectLeaders.email.trim(),
            }
          );
          created.push({ collectionId: "project_leaders", id: leaderDoc.$id });

          // 2) Create team members
          const memberIds: string[] = [];
          const members = Array.isArray(project.teams) ? project.teams : [];

          for (const m of members) {
            if (!m?.name?.trim() || !m?.email?.trim()) continue;

            const memberDoc = await databases.createDocument(
              APPWRITE_CONFIG.databaseId,
              "project_teams",
              ID.unique(),
              { name: m.name.trim(), email: m.email.trim() }
            );

            memberIds.push(memberDoc.$id);
            created.push({ collectionId: "project_teams", id: memberDoc.$id });
          }

          // 3) Create project
          const projectDoc = await databases.createDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            ID.unique(),
            {
              title: project.title.trim(),
              description: project.description.trim(),
              stage: project.stage,
              team: project.team.trim(),
              college: project.college.trim(),

              // IMPORTANT:
              // Ideally store ISO datetime in Appwrite (Datetime attribute).
              // If your schema is string, it still works but BETWEEN may fail.
              year: project.year,

              image: project.image.trim(),
           

              projectLeaders: leaderDoc.$id,
              teams: memberIds,

              ownerId: user.$id,
            },
            [
              Permission.read(Role.user(user.$id)),
              Permission.update(Role.user(user.$id)),
              Permission.delete(Role.user(user.$id)),
            ]
          );

          created.push({
            collectionId: APPWRITE_CONFIG.projectsCollectionId,
            id: projectDoc.$id,
          });

          // 4) Re-fetch expanded
          const expanded = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            projectDoc.$id,
            [Query.select(["*", "projectLeaders.*", "teams.*"])]
          );

          return { data: toProject(expanded) };
        } catch (e: any) {
          for (let i = created.length - 1; i >= 0; i--) {
            await safeDeleteDoc(APPWRITE_CONFIG.databaseId, created[i].collectionId, created[i].id);
          }
          return { error: toSerializableError(e) as any };
        }
      },
      invalidatesTags: [
        { type: "Projects", id: "LIST" },
        { type: "ProjectFilters", id: "COLLEGES" },
        { type: "ProjectFilters", id: "YEARS" },
      ],
    }),

    /**
     * ✅ UPDATE (like create)
     * - leader: update existing or create new if missing
     * - teams: update existing by $id, create new, delete removed
     */
    updateProject: builder.mutation<Project, UpdateProjectInput>({
      async queryFn({ id, data }) {
        const created: Array<{ collectionId: string; id: string }> = [];

        try {
          const user = await account.get();
          if (!user) throw new Error("You are not authorized to update a project");

          // 1) Get current project expanded
          const current = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            id,
            [Query.select(["*", "projectLeaders.*", "teams.*"])]
          );

          const currentLeaderId = readLeaderId(current);
          const currentTeamIds = readTeamIds(current);

          // 2) Leader upsert
          let leaderIdToSave = currentLeaderId;

          if (data.projectLeaders !== undefined) {
            const leaderName = data.projectLeaders?.name?.trim();
            const leaderEmail = data.projectLeaders?.email?.trim();

            if (!leaderName || !leaderEmail) {
              throw new Error("Team leader name/email is required");
            }

            if (leaderIdToSave) {
              await databases.updateDocument(
                APPWRITE_CONFIG.databaseId,
                "project_leaders",
                leaderIdToSave,
                { name: leaderName, email: leaderEmail }
              );
            } else {
              const leaderDoc = await databases.createDocument(
                APPWRITE_CONFIG.databaseId,
                "project_leaders",
                ID.unique(),
                { name: leaderName, email: leaderEmail }
              );
              leaderIdToSave = leaderDoc.$id;
              created.push({ collectionId: "project_leaders", id: leaderDoc.$id });
            }
          }

          // 3) Teams upsert + delete removed
          let teamIdsToSave = currentTeamIds;

          if (data.teams !== undefined) {
            const incoming = Array.isArray(data.teams) ? data.teams : [];
            const cleaned = incoming
              .map((m) => ({
                $id: (m as any)?.$id as string | undefined,
                name: (m?.name ?? "").trim(),
                email: (m?.email ?? "").trim(),
              }))
              .filter((m) => m.name && m.email);

            const incomingIds = cleaned.map((m) => m.$id).filter(Boolean) as string[];

            // delete removed docs
            const toDelete = currentTeamIds.filter((oldId) => !incomingIds.includes(oldId));
            for (const delId of toDelete) {
              await safeDeleteDoc(APPWRITE_CONFIG.databaseId, "project_teams", delId);
            }

            // upsert
            const newIds: string[] = [];
            for (const m of cleaned) {
              if (m.$id) {
                await databases.updateDocument(
                  APPWRITE_CONFIG.databaseId,
                  "project_teams",
                  m.$id,
                  { name: m.name, email: m.email }
                );
                newIds.push(m.$id);
              } else {
                const memberDoc = await databases.createDocument(
                  APPWRITE_CONFIG.databaseId,
                  "project_teams",
                  ID.unique(),
                  { name: m.name, email: m.email }
                );
                newIds.push(memberDoc.$id);
                created.push({ collectionId: "project_teams", id: memberDoc.$id });
              }
            }

            teamIdsToSave = newIds;
          }

          // 4) Update project fields
          const safeData: any = {
            ...(data.title !== undefined ? { title: data.title.trim() } : {}),
            ...(data.description !== undefined ? { description: data.description.trim() } : {}),
            ...(data.stage !== undefined ? { stage: data.stage } : {}),
            ...(data.team !== undefined ? { team: data.team.trim() } : {}),
            ...(data.college !== undefined ? { college: data.college.trim() } : {}),
            ...(data.year !== undefined ? { year: data.year } : {}),
            ...(data.image !== undefined ? { image: data.image.trim() } : {}),

            ...(data.projectLeaders !== undefined ? { projectLeaders: leaderIdToSave } : {}),
            ...(data.teams !== undefined ? { teams: teamIdsToSave } : {}),
          };

          const updated = await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            id,
            safeData
          );

          // 5) Re-fetch expanded
          const expanded = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            updated.$id,
            [Query.select(["*", "projectLeaders.*", "teams.*"])]
          );

          return { data: toProject(expanded) };
        } catch (e: any) {
          // rollback docs created during update
          for (let i = created.length - 1; i >= 0; i--) {
            await safeDeleteDoc(APPWRITE_CONFIG.databaseId, created[i].collectionId, created[i].id);
          }
          return { error: toSerializableError(e) as any };
        }
      },
      invalidatesTags: (_res, _err, arg) => [
        { type: "Projects", id: arg.id },
        { type: "Projects", id: "LIST" },
        { type: "ProjectFilters", id: "COLLEGES" },
        { type: "ProjectFilters", id: "YEARS" },
      ],
    }),

    /**
     * ✅ DELETE
     */
    deleteProject: builder.mutation<{ success: true; id: string }, string>({
      async queryFn(id) {
      
        try {
          await databases.deleteDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            id
          );
          return { data: { success: true, id } };
        } catch (e: any) {
          return { error: toSerializableError(e) as any };
        }
      },
      invalidatesTags: (_res, _err, id) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
        { type: "ProjectFilters", id: "COLLEGES" },
        { type: "ProjectFilters", id: "YEARS" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectCollegesQuery,
  useGetProjectYearsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
