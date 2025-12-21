// src/components/projects/CreateProjectForm.tsx
import React, { useMemo, useState } from "react";
import { useCreateProjectMutation } from "../../services/projects";
import type { Project, ProjectStage, Person } from "../../types/componentsType/projectTypes";

type FormState = Omit<Project, "id">;

const initialState: FormState = {
  title: "",
  description: "",
  stage: "idea",
  team: "",
  college: "",
  year: "", // will be sent as ISO string for datetime column
  image: "",
  report: "",
  teamLeader: { name: "", email: "" },
  teams: [],
};

export default function CreateProjectForm() {
  const [form, setForm] = useState<FormState>(initialState);

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const stageOptions = useMemo<ProjectStage[]>(
    () => ["idea", "research", "design", "build-mvp", "testing", "launched"],
    []
  );

  const onChange =
    (key: Exclude<keyof FormState, "teamLeader" | "teams" | "stage">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, stage: e.target.value as ProjectStage }));
  };

  const onTeamLeaderChange =
    (key: keyof Person) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        teamLeader: { ...prev.teamLeader, [key]: e.target.value },
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
    setForm((prev) => ({ ...prev, teams: prev.teams.filter((_, i) => i !== idx) }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Title is required";
    if (!form.stage) return "Stage is required";
    if (!form.college.trim()) return "College is required";
    if (!form.year.toString().trim()) return "Year/Date is required";
    if (!form.teamLeader.name.trim()) return "Team Leader name is required";
    if (!form.teamLeader.email.trim()) return "Team Leader email is required";
    return null;
  };

  // Convert YYYY-MM-DD -> ISO string for Appwrite datetime column
  const toIsoDate = (yyyyMmDd: string) => {
    if (!yyyyMmDd) return "";
    if (yyyyMmDd.includes("T")) return yyyyMmDd;
    return `${yyyyMmDd}T00:00:00.000Z`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (err) return alert(err);

    try {
      // ✅ IMPORTANT: send the REAL object structure (no JSON.stringify)
      // Your API mutation will create relationship docs and store IDs.
      await createProject({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        team: form.team.trim(),
        college: form.college.trim(),
        year: toIsoDate(form.year.toString().trim()),
        image: form.image.trim(),
        report: form.report.trim(),
        teamLeader: {
          name: form.teamLeader.name.trim(),
          email: form.teamLeader.email.trim(),
        },
        teams: form.teams.map((m) => ({
          name: m.name.trim(),
          email: m.email.trim(),
        })),
      }).unwrap();

      alert("Project created ✅");
      setForm(initialState);
      setMemberName("");
      setMemberEmail("");
    } catch (error: any) {
      alert(error?.message || "Failed to create project");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Add Project</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Title *
          <input
            value={form.title}
            onChange={onChange("title")}
            placeholder="Project title"
            style={inputStyle}
          />
        </label>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={onChange("description")}
            placeholder="Short description..."
            style={{ ...inputStyle, minHeight: 90 }}
          />
        </label>

        <div style={grid2}>
          <label>
            Stage *
            <select value={form.stage} onChange={onStageChange} style={inputStyle}>
              {stageOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label>
            Team
            <input
              value={form.team}
              onChange={onChange("team")}
              placeholder="e.g. Team A"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={grid2}>
          <label>
            College *
            <input
              value={form.college}
              onChange={onChange("college")}
              placeholder="College name"
              style={inputStyle}
            />
          </label>

          <label>
            Year / Date *
            <input
              value={form.year}
              onChange={onChange("year")}
              placeholder="YYYY-MM-DD"
              style={inputStyle}
              type="date"
            />
          </label>
        </div>

        <div style={grid2}>
          <label>
            Image URL
            <input
              value={form.image}
              onChange={onChange("image")}
              placeholder="https://..."
              style={inputStyle}
            />
          </label>

          <label>
            Report URL
            <input
              value={form.report}
              onChange={onChange("report")}
              placeholder="https://..."
              style={inputStyle}
            />
          </label>
        </div>

        {/* Team Leader */}
        <div style={grid2}>
          <label>
            Team Leader Name *
            <input
              value={form.teamLeader.name}
              onChange={onTeamLeaderChange("name")}
              placeholder="Leader name"
              style={inputStyle}
            />
          </label>

          <label>
            Team Leader Email *
            <input
              value={form.teamLeader.email}
              onChange={onTeamLeaderChange("email")}
              placeholder="leader@email.com"
              style={inputStyle}
              type="email"
            />
          </label>
        </div>

        {/* Team Members */}
        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Team Members</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
            <input
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Member name"
              style={inputStyle}
            />
            <input
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              placeholder="Member email"
              style={inputStyle}
              type="email"
            />
            <button
              type="button"
              onClick={addMember}
              style={btnStyle}
              disabled={isLoading || !memberName.trim() || !memberEmail.trim()}
            >
              Add
            </button>
          </div>

          {form.teams.length > 0 && (
            <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
              {form.teams.map((m, idx) => (
                <div key={`${m.email}-${idx}`} style={memberRowStyle}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.8 }}>{m.email}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeMember(idx)}
                    style={dangerBtnStyle}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" disabled={isLoading} style={primaryBtnStyle}>
          {isLoading ? "Saving..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

/** styles */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  marginTop: 6,
  border: "1px solid #ddd",
  borderRadius: 10,
  outline: "none",
  background: "white",
};

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const btnStyle: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
  marginTop: 6,
};

const primaryBtnStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  background: "black",
  color: "white",
  fontWeight: 600,
  marginTop: 6,
};

const memberRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #eee",
  borderRadius: 12,
  padding: "10px 12px",
};

const dangerBtnStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};
