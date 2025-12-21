import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { account, databases, ID } from "../lib/appwrite";
import type { Project, Person } from "../types/componentsType/projectTypes";
import { APPWRITE_CONFIG } from "../constant";
import { Query, Permission, Role } from "appwrite";

/**
 * Convert Appwrite document -> Project
 * NOTE: Relationship fields may come as:
 * - expanded object(s) if you Query.select(["relation.*"])
 * - OR only IDs if not expanded
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
  id: doc.$id, // ✅ your Project.id should be string
  title: doc.title ?? "",
  description: doc.description ?? "",
  stage: doc.stage ?? "idea",
  team: doc.team ?? "",
  college: doc.college ?? "",
  year: doc.year ?? "",
  image: doc.image ?? "",
  report: doc.report ?? "",

  // Relationship fields in your DB:
  teamLeader: toPerson(doc["project-leader"]),
  teams: toPersonsArray(doc.teams),
});

export const projectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    // ✅ GET ALL (expand relations)
    getProjects: builder.query<Project[], void>({
      async queryFn() {
        try {
          const res = await databases.listDocuments(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            [
              // Expand relationship documents
              Query.select(["*", "project-leader.*", "teams.*"]),
            ]
          );

          const projects = res.documents.map(toProject);
          return { data: projects };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: "Projects" as const, id: p.id })),
              { type: "Projects" as const, id: "LIST" },
            ]
          : [{ type: "Projects" as const, id: "LIST" }],
    }),

    // ✅ GET BY ID (expand relations)
    getProjectById: builder.query<Project, string>({
      async queryFn(projectId) {
        try {
          const doc = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            projectId,
            [Query.select(["*", "project-leader.*", "teams.*"])]
          );
          return { data: toProject(doc) };
        } catch (error: any) {
          return { error };
        }
      },
      providesTags: (_res, _err, id) => [{ type: "Projects", id }],
    }),

    // ✅ CREATE (correct relationship writing)
createProject: builder.mutation<Project, Omit<Project, "id">>({
  async queryFn(project) {
    try {
      const user = await account.get();
      if (!user) throw new Error("You are not authorized to add a project");

      if (!project.teamLeader?.name?.trim() || !project.teamLeader?.email?.trim()) {
        throw new Error("Team leader name/email is required");
      }

      // ✅ Create leader document in the SAME collection your `project-leader` relationship points to
      // Based on your naming, this should likely be "project_leaders"
      const leaderDoc = await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        "project_leaders",
        ID.unique(),
        {
          name: project.teamLeader.name.trim(),
          email: project.teamLeader.email.trim(),
        }
      );

      // ✅ Create team member docs in the collection your `teams` relationship points to
      // Based on your naming, this should likely be "project_teams"
      const memberIds: string[] = [];
      const members = Array.isArray(project.teams) ? project.teams : [];

      for (const m of members) {
        if (!m?.name?.trim() || !m?.email?.trim()) continue;

        const memberDoc = await databases.createDocument(
          APPWRITE_CONFIG.databaseId,
          "project_teams",
          ID.unique(),
          {
            name: m.name.trim(),
            email: m.email.trim(),
          }
        );

        memberIds.push(memberDoc.$id);
      }

      // ✅ Create project and set RELATIONSHIP columns with IDs (NOT JSON)
      const doc = await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.projectsCollectionId,
        ID.unique(),
        {
          title: project.title.trim(),
          description: project.description.trim(),
          stage: project.stage,
          team: project.team.trim(),
          college: project.college.trim(),
          year: project.year, // ensure valid datetime string if column is datetime
          image: project.image.trim(),
          report: project.report.trim(),

          // relationship fields
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

      // Re-fetch expanded relations so UI gets names/emails
      const expanded = await databases.getDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.projectsCollectionId,
        doc.$id,
        [Query.select(["*", "project-leader.*", "teams.*"])]
      );

      return { data: toProject(expanded) };
    } catch (error: any) {
      return { error };
    }
  },
  invalidatesTags: [{ type: "Projects", id: "LIST" }],
}),

    // ✅ UPDATE (careful: don’t send teamLeader/teams objects directly)
    updateProject: builder.mutation<
      Project,
      { id: string; data: Partial<Omit<Project, "id">> }
    >({
      async queryFn({ id, data }) {
        try {
          // If you want to update leader/teams, you should update the related docs separately.
          // Here we only update primitive columns safely:
          const safeData: any = {
            title: data.title,
            description: data.description,
            stage: data.stage,
            team: data.team,
            college: data.college,
            year: data.year,
            image: data.image,
            report: data.report,
          };

          const doc = await databases.updateDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            id,
            safeData
          );

          const expanded = await databases.getDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            doc.$id,
            [Query.select(["*", "project-leader.*", "teams.*"])]
          );

          return { data: toProject(expanded) };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: (_res, _err, arg) => [{ type: "Projects", id: arg.id }],
    }),

    // ✅ DELETE
    deleteProject: builder.mutation<{ success: true; id: string }, string>({
      async queryFn(id) {
        try {
          await databases.deleteDocument(
            APPWRITE_CONFIG.databaseId,
            APPWRITE_CONFIG.projectsCollectionId,
            id
          );
          return { data: { success: true, id } };
        } catch (error: any) {
          return { error };
        }
      },
      invalidatesTags: (_res, _err, id) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectApi;
