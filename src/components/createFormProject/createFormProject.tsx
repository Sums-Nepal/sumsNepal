"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
  useCreateProjectMutation,
} from "../../services/projects";
import type {
  Project,
  ProjectStage,
  Person,
} from "../../types/componentsType/projectTypes";
import { databases } from "../../lib/appwrite";
import { APPWRITE_CONFIG } from "../../constant";

type FormState = Omit<Project, "id">;

type ProjectFormProps = {
  projectId?: string; // ✅ optional
  onSaved?: () => void;
};

const emptyState: FormState = {
  title: "",
  description: "",
  stage: "Pre-Incubation",
  team: "",
  college: "",
  year: "",
  image: "",
  report: "",
  projectLeaders: { name: "", email: "" },
  teams: [],
};

const toDateInputValue = (isoOrDate: any) => {
  if (!isoOrDate) return "";
  const s = String(isoOrDate);
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
};

const toIsoDate = (yyyyMmDd: string) => {
  if (!yyyyMmDd) return "";
  if (yyyyMmDd.includes("T")) return yyyyMmDd;
  return `${yyyyMmDd}T00:00:00.000Z`;
};

const getRelId = (rel: any) => {
  if (!rel) return "";
  if (typeof rel === "string") return rel;
  return rel.$id ?? rel.id ?? "";
};

const getRelIds = (rels: any) => {
  if (!Array.isArray(rels)) return [];
  return rels.map(getRelId).filter(Boolean);
};

export default function ProjectForm({ projectId, onSaved }: ProjectFormProps) {
  // ✅ only fetch when editing
  const {
    data: project,
    isLoading: isLoadingProject,
    isFetching,
  } = useGetProjectByIdQuery(projectId as string, {
    skip: !projectId,
  });

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isSaving = isCreating || isUpdating;

  const [form, setForm] = useState<FormState>(emptyState);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [leaderDocId, setLeaderDocId] = useState<string>("");
  const [teamDocIds, setTeamDocIds] = useState<string[]>([]);

  const stageOptions = useMemo<ProjectStage[]>(
    () => ["Accelerate", "Build MVP", "Test", "Relocate", "Incubate", "Pre-Incubation"],
    []
  );

  // ✅ Prefill ONLY in edit mode
  useEffect(() => {
    if (!projectId) {
      // create mode -> clear form
      setForm(emptyState);
      setMemberName("");
      setMemberEmail("");
      setLeaderDocId("");
      setTeamDocIds([]);
      return;
    }

    if (!project) return;

    const yearDate = toDateInputValue(project.year);

    setForm({
      title: project.title ?? "",
      description: project.description ?? "",
      stage: (project.stage ?? "idea") as ProjectStage,
      team: project.team ?? "",
      college: project.college ?? "",
      year: yearDate,
      image: project.image ?? "",
      report: project.report ?? "",
      projectLeaders: {
        name: (project.projectLeaders as any)?.name ?? "",
        email: (project.projectLeaders as any)?.email ?? "",
      },
      teams: Array.isArray(project.teams)
        ? project.teams.map((t: any) => ({
            name: t?.name ?? "",
            email: t?.email ?? "",
          }))
        : [],
    });

    setLeaderDocId(getRelId(project.projectLeaders));
    setTeamDocIds(getRelIds(project.teams));
  }, [projectId, project]);

  const onChange =
    (key: Exclude<keyof FormState, "projectLeaders" | "teams" | "stage">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, stage: e.target.value as ProjectStage }));
  };

  const onProjectLeaderChange =
    (key: keyof Person) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        projectLeaders: { ...prev.projectLeaders, [key]: e.target.value },
      }));
    };

  const addMember = () => {
    const name = memberName.trim();
    const email = memberEmail.trim();

    if (!name) return alert("Member name is required");
    if (!email) return alert("Member email is required");

    const exists = form.teams.some(
      (m) => m.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) return alert("This member email is already added.");

    setForm((prev) => ({ ...prev, teams: [...prev.teams, { name, email }] }));
    setMemberName("");
    setMemberEmail("");
  };

  const removeMember = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      teams: prev.teams.filter((_, i) => i !== idx),
    }));
    setTeamDocIds((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.stage) return "Stage is required";
    if (!form.college.trim()) return "College is required";
    if (!form.year.toString().trim()) return "Year/Date is required";
    if (!form.projectLeaders.name.trim()) return "Team Leader name is required";
    if (!form.projectLeaders.email.trim())
      return "Team Leader email is required";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    try {
      if (!projectId) {
        // ✅ CREATE
        await createProject({
          ...form,
          title: form.title.trim(),
          description: form.description.trim(),
          team: form.team.trim(),
          college: form.college.trim(),
          year: toIsoDate(String(form.year).trim()),
          image: form.image.trim(),
          projectLeaders: {
            name: form.projectLeaders.name.trim(),
            email: form.projectLeaders.email.trim(),
          },
          teams: form.teams.map((m) => ({
            name: m.name.trim(),
            email: m.email.trim(),
          })),
        }).unwrap();

        alert("Project created ✅");
        setForm(emptyState);
        setMemberName("");
        setMemberEmail("");
        onSaved?.();
        return;
      }

      // ✅ UPDATE (project primitive fields)
      await updateProject({
        id: projectId,
        data: {
          title: form.title.trim(),
          description: form.description.trim(),
          stage: form.stage,
          team: form.team.trim(),
          college: form.college.trim(),
          year: toIsoDate(String(form.year).trim()),
          image: form.image.trim(),
          report: form.report ?? "",

          projectLeaders: {
            name: form.projectLeaders.name.trim(),
            email: form.projectLeaders.email.trim(),
          },

          // ✅ IMPORTANT: send $id for existing members
          teams: form.teams.map((m) => ({
            $id: (m as any).$id,
            name: m.name.trim(),
            email: m.email.trim(),
          })),
        },
      }).unwrap();

      // ✅ update leader doc
      if (leaderDocId) {
        await databases.updateDocument(
          APPWRITE_CONFIG.databaseId,
          "project_leaders",
          leaderDocId,
          {
            name: form.projectLeaders.name.trim(),
            email: form.projectLeaders.email.trim(),
          }
        );
      }

      // ✅ update team docs (existing only)
      for (let i = 0; i < form.teams.length; i++) {
        const teamDocId = teamDocIds[i];
        const m = form.teams[i];
        if (!teamDocId) continue;
        await databases.updateDocument(
          APPWRITE_CONFIG.databaseId,
          "project_teams",
          teamDocId,
          { name: m.name.trim(), email: m.email.trim() }
        );
      }

      alert("Project updated ✅");
      onSaved?.();
    } catch (error: any) {
      alert(error?.message || "Failed to save project");
      console.error(error);
    }
  };

  // ✅ Only show loading screen in EDIT mode
  if (projectId && isLoadingProject) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  // ============================
  // ✅ BELOW IS YOUR SAME UI
  // ============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          {projectId ? (
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 text-balance">
                Edit Project
              </h1>
              <p className="text-gray-600">
                Update your project details and team information
              </p>
            </div>
          ) : (
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 text-balance">
                Create a Project
              </h1>
              <p className="text-gray-600">
                Fill out the form below to create a new project
              </p>
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 transition-all hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Basic Information
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Title <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={onChange("title")}
                  placeholder="Enter an engaging project title"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={onChange("description")}
                  placeholder="Provide a detailed description of your project..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none resize-none bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Stage <span className="text-orange-500">*</span>
                  </label>
                  <select
                    value={form.stage}
                    onChange={onStageChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white appearance-none cursor-pointer"
                  >
                    {stageOptions.map((s) => (
                      <option key={s} value={s}>
                        {s
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    value={form.team}
                    onChange={onChange("team")}
                    placeholder="e.g., Team Innovation"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.college}
                    onChange={onChange("college")}
                    placeholder="College or institution name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Date <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={String(form.year)}
                    onChange={onChange("year")}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={onChange("image")}
                  placeholder="https://example.com/project-image.jpg"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* Team Leader Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 transition-all hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Team Leader</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Leader Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.projectLeaders.name}
                  onChange={onProjectLeaderChange("name")}
                  placeholder="Full name"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Leader Email <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.projectLeaders.email}
                  onChange={onProjectLeaderChange("email")}
                  placeholder="leader@example.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
              </div>
            </div>
          </div>

          {/* Team Members Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 transition-all hover:shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-3">
                <input
                  type="text"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="Member name"
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
                <input
                  type="email"
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none bg-white"
                />
                <button
                  type="button"
                  onClick={addMember}
                  disabled={
                    isSaving || !memberName.trim() || !memberEmail.trim()
                  }
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Member
                </button>
              </div>

              {form.teams.length > 0 && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-semibold text-gray-600 mb-3">
                    Added Members ({form.teams.length})
                  </p>
                  <div className="space-y-2">
                    {form.teams.map((m, idx) => (
                      <div
                        key={`${m.email}-${idx}`}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-50/30 rounded-xl border border-orange-100 group hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-sm">
                              {m.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-gray-900 truncate">
                              {m.name}
                            </div>
                            <div className="text-sm text-gray-600 truncate">
                              {m.email}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeMember(idx)}
                          disabled={isSaving}
                          className="ml-3 px-4 py-2 bg-white hover:bg-red-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-red-600 font-medium rounded-lg transition-all duration-200 border border-red-200 hover:border-red-300 flex-shrink-0"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {form.teams.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500 font-medium">
                    No team members added yet
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Add team members using the form above
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving || isFetching}
              className="relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center gap-3 text-lg"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
