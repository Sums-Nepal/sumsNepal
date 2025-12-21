"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Rocket,
  GraduationCap,
  Calendar,
  X,
  ChevronDown,
  Filter,
  ExternalLink,
  Users,
  Sparkles,
  Mail,
  UserCircle,
} from "lucide-react";

import { useGetProjectsQuery } from "../../services/projects";
import { projectsData, stages } from "./studentProjectStatic";
import type { Project } from "../../types/componentsType/projectTypes";

// ✅ helper: backend "year" is datetime string, static "year" is number
const toYearNumber = (value: any): number => {
  if (typeof value === "number") return value;
  const d = new Date(value);
  const y = d.getFullYear();
  return Number.isFinite(y) ? y : new Date().getFullYear();
};

// ✅ helper: backend -> same UI shape as your static list
const normalizeBackendProject = (p: any): Project => {
  const safeId =
    (p?.id ?? p?.$id ?? p?._id ?? "")?.toString?.() || crypto.randomUUID();

  return {
    id: safeId,
    title: p?.title ?? "",
    description: p?.description ?? "",
    stage: p?.stage ?? "idea",
    team: p?.team ?? "",
    college: p?.college ?? "",
    year: toYearNumber(p?.year),
    image: p?.image ?? "",
    report: p?.report ?? "",
    teamLeader: p?.teamLeader ?? { name: "", email: "" },
    // backend uses `teams` (Person[])
    teams: Array.isArray(p?.teams) ? p.teams : [],
  };
};

// ✅ merge + dedupe by id
const mergeUniqueById = (base: Project[], incoming: Project[]) => {
  const map = new Map<string, Project>();
  for (const p of base) map.set(String(p.id), p);
  for (const p of incoming) map.set(String(p.id), p);
  return Array.from(map.values());
};

export default function ProjectsPage() {
  // ✅ start with your static projects, then append backend projects
  const [allProjects, setAllProjects] = useState<Project[]>(projectsData);

  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const { data: backendProjects, isLoading } = useGetProjectsQuery();

  useEffect(() => {
    const backendNormalized = (backendProjects ?? []).map(normalizeBackendProject);
    setAllProjects((prev) => mergeUniqueById(prev, backendNormalized));
  }, [backendProjects]);

  // ✅ build filter options from ALL projects (static + backend)
  const colleges = useMemo(() => {
    return Array.from(new Set(allProjects.map((p) => p.college).filter(Boolean))).sort();
  }, [allProjects]);

  const years = useMemo(() => {
    return Array.from(new Set(allProjects.map((p) => toYearNumber(p.year))))
      .filter((y) => Number.isFinite(y))
      .sort((a, b) => b - a);
  }, [allProjects]);

  const teams = useMemo(() => {
    return Array.from(new Set(allProjects.map((p) => p.team).filter(Boolean))).sort();
  }, [allProjects]);

  // ✅ FILTERED PROJECTS FROM allProjects (NOT projectsData)
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchesStage = selectedStage ? project.stage === selectedStage : true;

      const matchesCollege =
        selectedColleges.length > 0
          ? selectedColleges.includes(project.college)
          : true;

      const matchesYear =
        selectedYears.length > 0
          ? selectedYears.includes(toYearNumber(project.year))
          : true;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = q
        ? (project.title ?? "").toLowerCase().includes(q) ||
          (project.description ?? "").toLowerCase().includes(q) ||
          (project.team ?? "").toLowerCase().includes(q) ||
          (project.college ?? "").toLowerCase().includes(q)
        : true;

      return matchesStage && matchesCollege && matchesYear && matchesSearch;
    });
  }, [allProjects, selectedStage, selectedColleges, selectedYears, searchQuery]);

  // ✅ stage counts from ALL projects
  const stageCounts = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      count: allProjects.filter((p) => p.stage === stage.id).length,
    }));
  }, [allProjects]);

  const toggleCollege = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college) ? prev.filter((c) => c !== college) : [...prev, college]
    );
  };

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const clearAllFilters = () => {
    setSelectedStage(null);
    setSelectedColleges([]);
    setSelectedYears([]);
    setSearchQuery("");
  };

  const hasActiveFilters =
    !!selectedStage ||
    selectedColleges.length > 0 ||
    selectedYears.length > 0 ||
    !!searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl z-20 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Student Innovation Hub
                </span>
              </div>

              <h1 className="text-5xl font-bold text-balance mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Student Ventures Incubated
              </h1>

              <p className="text-muted-foreground text-pretty text-lg">
                Explore{" "}
                <span className="font-semibold text-orange-500">
                  {allProjects.length} innovative projects
                </span>{" "}
                across all stages - from ideation to global expansion
              </p>

              {isLoading && (
                <p className="text-xs text-muted-foreground mt-2">
                  Loading more projects from server...
                </p>
              )}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide" : "Show"} Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        {showFilters && (
          <div className="mb-10 p-8 rounded-2xl border border-orange-500/20 bg-card/95 backdrop-blur-sm shadow-xl shadow-orange-500/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-3 mb-1">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Filter className="h-5 w-5 text-orange-500" />
                  </div>
                  Search & Filter Projects
                </h2>
                <p className="text-sm text-muted-foreground ml-12">
                  Find the perfect project using advanced filters
                </p>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              )}
            </div>

            <div className="mb-8">
              <label className="text-sm font-semibold mb-3 block text-muted-foreground uppercase tracking-wide">
                Search Projects
              </label>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500" />
                <Input
                  type="text"
                  placeholder="Search by project name, description, team, or college..."
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base border-orange-500/20 focus-visible:ring-orange-500/50 focus-visible:border-orange-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                  <div className="p-1.5 rounded bg-orange-500/10">
                    <GraduationCap className="h-4 w-4 text-orange-500" />
                  </div>
                  Filter by College
                  <Badge variant="secondary" className="ml-auto">
                    {selectedColleges.length > 0
                      ? `${selectedColleges.length} selected`
                      : "All"}
                  </Badge>
                </label>

                <div className="flex flex-wrap gap-2">
                  {colleges.map((college) => {
                    const count = allProjects.filter((p) => p.college === college).length;
                    const isSelected = selectedColleges.includes(college);

                    return (
                      <Button
                        key={college}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCollege(college)}
                        className={`font-medium transition-all ${
                          isSelected
                            ? "shadow-md shadow-orange-500/20"
                            : "hover:border-orange-500/50 hover:bg-orange-500/5"
                        }`}
                      >
                        {college}
                        <Badge
                          variant={isSelected ? "secondary" : "outline"}
                          className="ml-2 font-bold"
                        >
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                  <div className="p-1.5 rounded bg-orange-500/10">
                    <Calendar className="h-4 w-4 text-orange-500" />
                  </div>
                  Filter by Year
                  <Badge variant="secondary" className="ml-auto">
                    {selectedYears.length > 0
                      ? `${selectedYears.length} selected`
                      : "All"}
                  </Badge>
                </label>

                <div className="flex flex-wrap gap-2">
                  {years.map((year) => {
                    const count = allProjects.filter((p) => toYearNumber(p.year) === year).length;
                    const isSelected = selectedYears.includes(year);

                    return (
                      <Button
                        key={year}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleYear(year)}
                        className={`font-medium transition-all ${
                          isSelected
                            ? "shadow-md shadow-orange-500/20"
                            : "hover:border-orange-500/50 hover:bg-orange-500/5"
                        }`}
                      >
                        {year}
                        <Badge
                          variant={isSelected ? "secondary" : "outline"}
                          className="ml-2 font-bold"
                        >
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* teams is computed if you want it later */}
            {/* <pre className="text-xs text-muted-foreground mt-6">{JSON.stringify(teams, null, 2)}</pre> */}
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Filter by Development Stage</h2>
              <p className="text-muted-foreground">
                Select a stage to view related projects
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stageCounts.map((stage) => {
              const Icon = stage.icon;
              const isSelected = selectedStage === stage.id;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                  className={`
                    group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-5 text-left
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/10 shadow-2xl shadow-orange-500/25 scale-105 -translate-y-1"
                        : "border-border bg-card/80 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-0.5"
                    }
                  `}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stage.color} transition-opacity duration-300`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stage.color} shadow-lg`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>

                      <Badge
                        variant={isSelected ? "default" : "secondary"}
                        className="font-bold text-base px-3 py-1"
                      >
                        {stage.count}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-base mb-2">{stage.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-orange-500/20">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Showing{" "}
                <span className="font-bold text-orange-500 text-2xl">
                  {filteredProjects.length}
                </span>{" "}
                of{" "}
                <span className="font-bold text-foreground text-xl">
                  {allProjects.length}
                </span>{" "}
                projects
              </p>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-muted-foreground font-medium">
                    Active filters:
                  </span>

                  {selectedStage && (
                    <Badge variant="default" className="gap-1.5 pl-2 shadow-sm">
                      Stage: {stages.find((s) => s.id === selectedStage)?.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStage(null);
                        }}
                        className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {selectedColleges.map((college) => (
                    <Badge key={college} variant="default" className="gap-1.5 pl-2 shadow-sm">
                      {college}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCollege(college);
                        }}
                        className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {selectedYears.map((year) => (
                    <Badge key={year} variant="default" className="gap-1.5 pl-2 shadow-sm">
                      Year: {year}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleYear(year);
                        }}
                        className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/10 mb-6">
              <Search className="h-10 w-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No projects found</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Try adjusting your filters or search query to find more projects.
            </p>
            <Button onClick={clearAllFilters} variant="default" size="lg" className="shadow-lg">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const stage = stages.find((s) => s.id === project.stage);
              const StageIcon = stage?.icon || Rocket;

              return (
                <Card
                  key={project.id}
                  className="group card relative overflow-hidden border-2 border-border hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
                >
                  <div className="relative h-48 bg-gradient-to-br from-orange-500/5 to-orange-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-4 right-4 z-20">
                      <Badge
                        variant="secondary"
                        className="backdrop-blur-sm bg-white/90 text-foreground shadow-lg"
                      >
                        {toYearNumber(project.year)}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20">
                      <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${stage?.color} shadow-lg`}
                      >
                        <StageIcon className="h-4 w-4 text-white" />
                        <span className="text-xs font-bold text-white">
                          {stage?.name ?? "Stage"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-balance line-clamp-1 group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-1.5 rounded bg-orange-500/10">
                          <Users className="h-4 w-4 text-orange-500" />
                        </div>
                        <span className="font-medium text-muted-foreground">Team:</span>
                        <span className="font-semibold">{project.team}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div className="p-1.5 rounded bg-orange-500/10">
                          <GraduationCap className="h-4 w-4 text-orange-500" />
                        </div>
                        <span className="font-medium text-muted-foreground">College:</span>
                        <span className="font-semibold line-clamp-1">{project.college}</span>
                      </div>

                      <div className="pt-2 border-t border-border/50">
                        <div className="flex items-start gap-2 text-sm mb-2">
                          <div className="p-1.5 rounded bg-orange-500/10 shrink-0">
                            <UserCircle className="h-4 w-4 text-orange-500" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-muted-foreground block mb-1">
                              Team Leader:
                            </span>
                            <p className="font-semibold text-foreground">
                              {project.teamLeader?.name ?? ""}
                            </p>
                            {project.teamLeader?.email ? (
                              <a
                                href={`mailto:${project.teamLeader.email}`}
                                className="text-xs text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1 mt-1"
                              >
                                <Mail className="h-3 w-3" />
                                {project.teamLeader.email}
                              </a>
                            ) : null}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="font-medium text-muted-foreground text-xs block mb-2">
                            Team Members:
                          </span>

                          <div className="space-y-2">
                            {(project.teams ?? []).map((member: any, idx: number) => (
                              <div key={idx} className="text-xs bg-muted/50 rounded-lg p-2">
                                <p className="font-semibold text-foreground mb-0.5">
                                  {member?.name ?? ""}
                                </p>
                                {member?.email ? (
                                  <a
                                    href={`mailto:${member.email}`}
                                    className="text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1"
                                  >
                                    <Mail className="h-3 w-3" />
                                    {member.email}
                                  </a>
                                ) : null}
                              </div>
                            ))}

                            {(project.teams ?? []).length === 0 && (
                              <p className="text-xs text-muted-foreground">
                                No team members listed.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full shadow-md group/btn hover:shadow-lg hover:shadow-orange-500/20"
                      disabled={!project.report}
                    >
                      <a
                        href={project.report || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!project.report) e.preventDefault();
                        }}
                      >
                        View Project Report
                        <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
