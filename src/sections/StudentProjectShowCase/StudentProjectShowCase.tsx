"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { Button } from "../../components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { Input } from "../../components/ui/input"
import {
  Search,
  Rocket,
  GraduationCap,
  Calendar,
  X,
  ChevronDown,
  Filter,
  Users,
  Sparkles,
  Mail,
  UserCircle,
  Edit,
  Trash2,
} from "lucide-react"

import {
  useGetProjectCollegesQuery,
  useGetProjectsQuery,
  useGetProjectYearsQuery,
  useDeleteProjectMutation,
} from "../../services/projects"
import { projectsData, stages } from "./studentProjectStatic"
import type { Project } from "../../types/componentsType/projectTypes"
import { LoadingBar, LoadMorePagination } from "../../components"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import EditProjectForm from "../../components/createFormProject/createFormProject"
import { useCurrentUser } from "../../hooks"
import { toast } from "react-toastify"

const toYearNumber = (value: any): number => {
  if (typeof value === "number") return value
  const d = new Date(value)
  const y = d.getFullYear()
  return Number.isFinite(y) ? y : new Date().getFullYear()
}

const normalizeBackendProject = (p: any): Project => {
  console.log(p.projectLeaders)

  const safeId = (p?.id ?? p?.$id ?? p?._id ?? "")?.toString?.() || crypto.randomUUID()

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
    projectLeaders: p?.projectLeaders ?? { name: "", email: "" },
    teams: Array.isArray(p?.teams) ? p.teams : [],
  }
}

const mergeUniqueById = (base: Project[], incoming: Project[]) => {
  const map = new Map<string, Project>()
  for (const p of base) map.set(String(p.id), p)
  for (const p of incoming) map.set(String(p.id), p)
  return Array.from(map.values())
}

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>(projectsData)

  const [selectedStage, setSelectedStage] = useState<string | null>(null)
  const [selectedColleges, setSelectedColleges] = useState<string[]>([])
  const [selectedYears, setSelectedYears] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    data: backendProjects,
    isLoading,
    isFetching,
  } = useGetProjectsQuery({
    page: currentPage,
    stage: selectedStage,
    colleges: selectedColleges,
    years: selectedYears,
    q: searchQuery,
  })

  const { data: backendyears = [] } = useGetProjectYearsQuery()

  const { data: backendColleges = [] } = useGetProjectCollegesQuery()

  const [deleteProject, { isLoading: isDeleting , error: isErrorWhenDeleting  }] = useDeleteProjectMutation()
  const {user} = useCurrentUser();



  useEffect(() => {
    const backendNormalized = (backendProjects?.projects ?? []).map(normalizeBackendProject)
    setAllProjects((prev) => mergeUniqueById(prev, backendNormalized))
  }, [backendProjects])

  const colleges = useMemo(() => {
    return Array.from(new Set([...allProjects.map((p) => p.college).filter(Boolean), ...backendColleges])).sort()
  }, [allProjects, backendColleges])

  const years = useMemo(() => {
    return Array.from(new Set([...allProjects.map((p) => toYearNumber(p.year)), ...backendyears]))
      .filter((y) => Number.isFinite(y))
      .sort((a, b) => b - a)
  }, [allProjects, backendyears])

  const hasMore = useMemo(() => backendProjects?.hasMore, [backendProjects]) || false

  const teams = useMemo(() => {
    return Array.from(new Set(allProjects.map((p) => p.team).filter(Boolean))).sort()
  }, [allProjects])

  const filteredProjects = useMemo(() => {
    
    return allProjects.filter((project) => {
      const matchesStage = selectedStage ? project.stage.trim().toLowerCase() === selectedStage.toLowerCase() : true

      const matchesCollege = selectedColleges.length > 0 ? selectedColleges.includes(project.college) : true

      const matchesYear = selectedYears.length > 0 ? selectedYears.includes(toYearNumber(project.year)) : true

      const q = searchQuery.trim().toLowerCase()
      const matchesSearch = q
        ? (project.title ?? "").toLowerCase().includes(q) ||
          (project.description ?? "").toLowerCase().includes(q) ||
          (project.team ?? "").toLowerCase().includes(q) ||
          (project.college ?? "").toLowerCase().includes(q)
        : true

      return matchesStage && matchesCollege && matchesYear && matchesSearch
    })
  }, [allProjects, selectedStage, selectedColleges, selectedYears, searchQuery])

  const stageCounts = useMemo(() => {
    return stages.map((stage) => ({
      ...stage,
      count: allProjects.filter((p) => p.stage.toLowerCase() === stage.id.toLowerCase()).length,
    }))
  }, [allProjects])

  const loadMore = useCallback(() => {
    setCurrentPage((prev) => prev + 1)
  }, [setCurrentPage])

  const toggleCollege = (college: string) => {
    setSelectedColleges((prev) => (prev.includes(college) ? prev.filter((c) => c !== college) : [...prev, college]))
  }

  const toggleYear = (year: number) => {
    setSelectedYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const clearAllFilters = () => {
    setSelectedStage(null)
    setSelectedColleges([])
    setSelectedYears([])
    setSearchQuery("")
  }

  const handleDelete = useCallback(async (projectId: string) => {
     try {
       await deleteProject(projectId).unwrap();
         setAllProjects((prev) => prev.filter((p) => p.id !== projectId))
    } catch (err:any) {
      toast.error(err?.message ?? "Failed to delete project");
    }
  }, [isErrorWhenDeleting])

  const hasActiveFilters = !!selectedStage || selectedColleges.length > 0 || selectedYears.length > 0 || !!searchQuery

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-orange-500/5">
      <header className="border-b border-border/40 bg-card/80 backdrop-blur-xl sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-3">
                <Sparkles className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400">
                  Student Innovation Hub
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Student Ventures Incubated
              </h1>

              <p className="text-muted-foreground text-pretty text-sm sm:text-base lg:text-lg">
                Explore <span className="font-semibold text-orange-500">{allProjects.length} innovative projects</span>{" "}
                across all stages
              </p>

              {(isLoading || isFetching) && (
                <p className="text-xs text-muted-foreground mt-2">Loading more projects...</p>
              )}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500 transition-all shadow-sm"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide" : "Show"} Filters
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-10">
        {showFilters && (
          <div className="mb-8 sm:mb-10 p-4 sm:p-6 lg:p-8 rounded-2xl border border-orange-500/20 bg-card/95 backdrop-blur-sm shadow-xl shadow-orange-500/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2 sm:gap-3 mb-1">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-orange-500/10">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  </div>
                  Search & Filter Projects
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground sm:ml-10 lg:ml-12">
                  Find the perfect project using advanced filters
                </p>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-orange-500 hover:text-orange-600 hover:bg-orange-500/10 self-start sm:self-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="mb-6 sm:mb-8">
              <label className="text-xs sm:text-sm font-semibold mb-3 block text-muted-foreground uppercase tracking-wide">
                Search Projects
              </label>

              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                <Input
                  type="text"
                  placeholder="Search by name, description, team, or college..."
                  value={searchQuery}
                  onChange={(e: any) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base border-orange-500/20 focus-visible:ring-orange-500/50 focus-visible:border-orange-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-4">
                <label className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                  <div className="p-1 sm:p-1.5 rounded bg-orange-500/10">
                    <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                  </div>
                  Filter by College
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {selectedColleges.length > 0 ? `${selectedColleges.length} selected` : "All"}
                  </Badge>
                </label>

                <div className="flex flex-wrap gap-2">
                  {colleges.map((college) => {
                    const count = allProjects.filter((p) => p.college === college).length
                    const isSelected = selectedColleges.includes(college)

                    return (
                      <Button
                        key={college}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCollege(college)}
                        className={`font-medium transition-all text-xs sm:text-sm ${
                          isSelected
                            ? "shadow-md shadow-orange-500/20 bg-orange-500 hover:bg-orange-600"
                            : "hover:border-orange-500/50 hover:bg-orange-500/5"
                        }`}
                      >
                        {college}
                        {isSelected && (
                          <Badge variant="secondary" className="ml-2 font-bold text-xs">
                            {count}
                          </Badge>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs sm:text-sm font-semibold flex items-center gap-2 text-muted-foreground uppercase tracking-wide">
                  <div className="p-1 sm:p-1.5 rounded bg-orange-500/10">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                  </div>
                  Filter by Year
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {selectedYears.length > 0 ? `${selectedYears.length} selected` : "All"}
                  </Badge>
                </label>

                <div className="flex flex-wrap gap-2">
                  {years.map((year) => {
                    const count = allProjects.filter((p) => toYearNumber(p.year) === year).length
                    const isSelected = selectedYears.includes(year)

                    return (
                      <Button
                        key={year}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleYear(year)}
                        className={`font-medium transition-all text-xs sm:text-sm ${
                          isSelected
                            ? "shadow-md shadow-orange-500/20 bg-orange-500 hover:bg-orange-600"
                            : "hover:border-orange-500/50 hover:bg-orange-500/5"
                        }`}
                      >
                        {year}
                        {isSelected && (
                          <Badge variant="secondary" className="ml-2 font-bold text-xs">
                            {count}
                          </Badge>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-1">Filter by Development Stage</h2>
              <p className="text-sm sm:text-base text-muted-foreground">Select a stage to view related projects</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {stageCounts.map((stage) => {
              const Icon = stage.icon
              const isSelected = selectedStage?.trim().toLowerCase() === stage.id?.trim().toLowerCase()

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                  className={`
                    group relative overflow-hidden rounded-xl sm:rounded-2xl border-2 transition-all duration-300 p-3 sm:p-5 text-left
                    ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/10 shadow-xl sm:shadow-2xl shadow-orange-500/25 scale-105 -translate-y-1"
                        : "border-border bg-card/80 backdrop-blur-sm hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-0.5"
                    }
                  `}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${stage.color} transition-opacity duration-300`}
                  />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div
                        className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${stage.color} shadow-lg`}
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>

                      <Badge
                        variant={isSelected ? "default" : "secondary"}
                        className="font-bold text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                      >
                        {stage.count}
                      </Badge>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">{stage.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed hidden sm:block">
                      {stage.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-orange-500/20">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Showing <span className="font-bold text-orange-500 text-xl sm:text-2xl">{filteredProjects.length}</span>{" "}
                of <span className="font-bold text-foreground text-lg sm:text-xl">{allProjects.length}</span> projects
              </p>

              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-muted-foreground font-medium">Active filters:</span>

                  {selectedStage && (
                    <Badge variant="default" className="gap-1.5 pl-2 shadow-sm text-xs">
                      Stage: {stages.find((s) => s.id === selectedStage)?.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedStage(null)
                        }}
                        className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {selectedColleges.map((college) => (
                    <Badge key={college} variant="default" className="gap-1.5 pl-2 shadow-sm text-xs">
                      {college}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCollege(college)
                        }}
                        className="ml-1 hover:bg-orange-600 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}

                  {selectedYears.map((year) => (
                    <Badge key={year} variant="default" className="gap-1.5 pl-2 shadow-sm text-xs">
                      Year: {year}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleYear(year)
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
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/10 mb-4 sm:mb-6">
              <Search className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">No projects found</h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md mx-auto px-4">
              Try adjusting your filters or search query to find more projects.
            </p>
            <Button
              onClick={clearAllFilters}
              variant="default"
              size="lg"
              className="shadow-lg bg-orange-500 hover:bg-orange-600"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProjects.map((project:any) => {
                const stage = stages.find((s) => s.id.trim().toLowerCase() === project.stage.trim().toLowerCase())
                const StageIcon = stage?.icon || Rocket

                return (
                  <Card
                    key={project.id}
                    className="group relative overflow-hidden border-2 border-border hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
                  >
                    {    (user) && 
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-50 flex gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                    
                 
                        <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 sm:h-9 sm:w-9 p-0 bg-card/80 backdrop-blur-sm hover:bg-orange-500/10 border border-orange-500/20"
                          >
                            <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                          </Button>
                        </DialogTrigger>

                        <DialogContent className="!fixed !inset-0 !w-screen !h-screen !max-w-none !m-0 !p-0 !left-0 !top-0 !translate-x-0 !translate-y-0 rounded-none overflow-hidden">
                          <DialogHeader className="sticky top-0 z-20 bg-white dark:bg-gray-950 border-b px-4 sm:px-6 py-4 flex flex-row items-center justify-between">
                            <div>
                              <DialogTitle className="text-base sm:text-lg lg:text-xl font-semibold">
                                Edit Project
                              </DialogTitle>
                              <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                                Update project details, leader, and team members
                              </DialogDescription>
                            </div>

                            <DialogClose asChild className="fixed right-10 top-10 bg-white">
                              <Button variant="ghost" size="icon">
                                <X className="h-5 w-5" />
                              </Button>
                            </DialogClose>
                          </DialogHeader>

                          <div className="h-[calc(100vh-80px)] overflow-y-auto">
                            <div className="w-full p-0">
                              <EditProjectForm projectId={project.id} />
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    

                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={isDeleting}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm("Are you sure you want to delete this project?")) {
                            handleDelete(project.id)
                          }
                        }}
                        className="h-8 w-8 sm:h-9 sm:w-9 p-0 text-red-600 hover:text-red-700 hover:bg-red-500/10 bg-card/80 backdrop-blur-sm border border-red-500/20"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
              }

                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-orange-500/5 to-orange-500/20 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-contain p-6 sm:p-8 group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                        <Badge
                          variant="secondary"
                          className="backdrop-blur-sm bg-white/90 dark:bg-white-900/90 text-foreground shadow-lg text-xs sm:text-sm text-orange-500"
                        >
                          {toYearNumber(project.year)}
                        </Badge>
                      </div>

                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 z-20">
                        <div
                          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${stage?.color} shadow-lg`}
                        >
                          <StageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />

                          <span className="text-xs font-bold text-white">{stage?.name ?? "Stage"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-balance line-clamp-1 group-hover:text-orange-500 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="p-1 sm:p-1.5 rounded bg-orange-500/10 shrink-0">
                            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                          </div>
                          <span className="font-medium text-muted-foreground">Team:</span>
                          <span className="font-semibold truncate">{project.team}</span>
                        </div>

                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <div className="p-1 sm:p-1.5 rounded bg-orange-500/10 shrink-0">
                            <GraduationCap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                          </div>
                          <span className="font-medium text-muted-foreground">College:</span>
                          <span className="font-semibold line-clamp-1">{project.college}</span>
                        </div>

                        <div className="pt-2 border-t border-border/50">
                          <div className="flex items-start gap-2 text-xs sm:text-sm mb-2">
                            <div className="p-1 sm:p-1.5 rounded bg-orange-500/10 shrink-0">
                              <UserCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-500" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-muted-foreground block mb-1">Team Leader:</span>
                              <p className="font-semibold text-foreground truncate">
                                {project.projectLeaders?.name ?? ""}
                              </p>
                              {project.projectLeaders?.email ? (
                                <a
                                  href={`mailto:${project.projectLeaders.email}`}
                                  className="text-xs text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1 mt-1"
                                >
                                  <Mail className="h-3 w-3 shrink-0" />
                                  <span className="truncate">{project.projectLeaders.email}</span>
                                </a>
                              ) : null}
                            </div>
                          </div>

                          <div className="mt-3">
                            <span className="font-medium text-muted-foreground text-xs block mb-2">Team Members:</span>

                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {(project.teams ?? []).map((member: any, idx: number) => (
                                <div key={idx} className="text-xs bg-muted/50 rounded-lg p-2">
                                  <p className="font-semibold text-foreground mb-0.5 truncate">{member?.name ?? ""}</p>
                                  {member?.email ? (
                                    <a
                                      href={`mailto:${member.email}`}
                                      className="text-orange-500 hover:text-orange-600 hover:underline flex items-center gap-1"
                                    >
                                      <Mail className="h-3 w-3 shrink-0" />
                                      <span className="truncate">{member.email}</span>
                                    </a>
                                  ) : null}
                                </div>
                              ))}

                              {(project.teams ?? []).length === 0 && (
                                <p className="text-xs text-muted-foreground italic">No team members listed.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
                {(isFetching || isLoading) && (
              <div className="flex justify-center items-center mt-6 sm:mt-8">
                <LoadingBar />
              </div>
            )}

            {hasMore && (
          <div className="flex justify-center items-center mt-8 sm:mt-10">
            <LoadMorePagination
              onClick={loadMore}
              disabled={!hasMore || isFetching || isLoading}
              text={isFetching || isLoading ? "Loading projects..." : "Load More"}
            />
          </div>
        )}
            </div>

          
          </>
        )}

        
      </div>
    </div>
  )
}
