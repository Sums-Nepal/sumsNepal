"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  ExternalLink,
  FileText,
} from "lucide-react"

import {
  useGetProjectCollegesQuery,
  useGetProjectsQuery,
  useGetProjectYearsQuery,
  useDeleteProjectMutation,
} from "../../services/projects"
import { projectsData, stages } from "./studentProjectStatic"
import type { Project, Person } from "../../types/componentsType/projectTypes"
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
  const safeId = (p?.id ?? p?.$id ?? p?._id ?? "")?.toString?.() || crypto.randomUUID()
  return {
    id: safeId,
    title: p?.title ?? "",
    description: p?.description ?? "",
    stage: p?.stage.toLowerCase() ?? "idea",
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
  const [showFilters, setShowFilters] = useState(false)
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
  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation()
  const { user } = useCurrentUser()

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
  }, [])

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
      await deleteProject(projectId).unwrap()
      setAllProjects((prev) => prev.filter((p) => p.id !== projectId))
      toast.success("Project deleted successfully")
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to delete project")
    }
  }, [deleteProject])

  const hasActiveFilters = !!selectedStage || selectedColleges.length > 0 || selectedYears.length > 0 || !!searchQuery

  const [selectedProjectDetails, setSelectedProjectDetails] = useState<Project | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden border-b border-border bg-slate-50 dark:bg-slate-900/40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
              >
                Innovation showcase
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-[6.5rem] font-black tracking-tighter uppercase leading-[0.85] mb-8"
              >
                STUDENT <br />
                <span className="text-primary italic">VENTURES</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg lg:text-xl font-medium max-w-xl leading-relaxed"
              >
                Explore <span className="text-foreground font-black">{allProjects.length} innovative projects</span>
                incubated through our global standard growth cycles.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto"
            >
              <div className="relative flex-1 sm:min-w-[300px]">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 bg-white dark:bg-slate-900 border border-border focus:border-primary rounded-2xl pl-12 pr-6 text-sm font-semibold transition-all outline-none"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-16 px-8 rounded-2xl border-border hover:border-primary/50 text-xs font-black uppercase tracking-widest flex items-center gap-3 bg-white dark:bg-slate-900"
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-50 dark:bg-slate-900 border-b border-border"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* College Filter */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">Filter by College</h3>
                    {selectedColleges.length > 0 && <Badge className="bg-primary">{selectedColleges.length}</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {colleges.map((college) => (
                      <button
                        key={college}
                        onClick={() => toggleCollege(college)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedColleges.includes(college)
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-800 border border-border text-foreground hover:border-primary/50"
                          }`}
                      >
                        {college}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Year & Actions */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-widest text-foreground/60">Filter by Year</h3>
                    {selectedYears.length > 0 && <Badge className="bg-primary">{selectedYears.length}</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => toggleYear(year)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedYears.includes(year)
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-slate-800 border border-border text-foreground hover:border-primary/50"
                          }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  {hasActiveFilters && (
                    <div className="pt-6">
                      <Button
                        variant="ghost"
                        onClick={clearAllFilters}
                        className="text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 gap-2"
                      >
                        <X className="w-4 h-4" />
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Stage Selector Chips */}
        <div className="mb-16">
          <h3 className="text-xs font-black text-foreground/40 uppercase tracking-[0.2em] mb-8 text-center">Development Stages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {stageCounts.map((stage) => {
              const Icon = stage.icon
              const isSelected = selectedStage?.trim().toLowerCase() === stage.id?.trim().toLowerCase()

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(isSelected ? null : stage.id)}
                  className={`group relative px-6 py-8 rounded-[2rem] border transition-all duration-500 text-center min-w-[150px] ${isSelected
                    ? "bg-primary/5 border-primary shadow-xl shadow-primary/10"
                    : "bg-white dark:bg-slate-900 border-border hover:border-primary/50"
                    }`}
                >
                  <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${isSelected ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-primary group-hover:rotate-6"
                    }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-tighter mb-1">{stage.name}</div>
                  <div className={`text-[10px] font-bold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>{stage.count} Projects</div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: any) => {
              const stage = stages.find((s) => s.id.trim().toLowerCase() === project.stage.trim().toLowerCase())
              const StageIcon = stage?.icon || Rocket

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/50 flex flex-col">
                    {/* Admin Actions */}
                    {user && (
                      <div className="absolute top-6 right-6 z-30 flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="h-10 w-10 bg-white dark:bg-slate-800 text-primary hover:bg-primary hover:text-white rounded-xl shadow-lg border border-border transition-all"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="!fixed !inset-0 !max-w-none !m-0 !p-0 rounded-none overflow-hidden">
                            <div className="h-full flex flex-col">
                              <div className="p-6 border-b flex justify-between items-center bg-white dark:bg-slate-950">
                                <h2 className="text-xl font-black uppercase tracking-tighter">Edit Project</h2>
                                <DialogClose asChild><Button variant="ghost"><X className="w-5 h-5" /></Button></DialogClose>
                              </div>
                              <div className="flex-1 overflow-auto"><EditProjectForm projectId={project.id} /></div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          onClick={() => { if (confirm("Confirm deletion?")) handleDelete(project.id) }}
                          className="h-10 w-10 bg-white dark:bg-slate-800 text-red-500 hover:bg-red-500 hover:text-white rounded-xl shadow-lg border border-border transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Project Header/Image */}
                    <div className="relative h-64 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center p-8 overflow-hidden">
                      <div className="absolute text-[120px] font-black text-black/5 dark:text-white/5 whitespace-nowrap -rotate-12 translate-x-12 select-none group-hover:scale-110 transition-transform duration-1000">PROJECT</div>
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="relative z-10 w-2/3 h-2/3 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <Badge className={`bg-gradient-to-r ${stage?.color} text-white border-0 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                          <StageIcon className="w-3 h-3 mr-2" />
                          {stage?.name}
                        </Badge>
                        <Badge className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-foreground border border-border px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {project.year}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-8 space-y-6 flex-1 flex flex-col">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-primary transition-colors line-clamp-1">{project.title}</h3>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-3">{project.description}</p>
                      </div>

                      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><GraduationCap className="w-4 h-4" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-foreground/40 shrink-0">College</span>
                          <span className="text-xs font-bold text-foreground truncate">{project.college}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Users className="w-4 h-4" /></div>
                          <span className="text-xs font-black uppercase tracking-widest text-foreground/40 shrink-0">Team</span>
                          <span className="text-xs font-bold text-foreground truncate">{project.team}</span>
                        </div>
                      </div>

                      <div className="pt-auto mt-6">
                        <button
                          onClick={() => setSelectedProjectDetails(project)}
                          className="w-full h-14 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary transition-all group/btn"
                        >
                          VIEW DETAILS
                          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Project Details Dialog */}
        <Dialog open={!!selectedProjectDetails} onOpenChange={(open) => !open && setSelectedProjectDetails(null)}>
          <DialogContent className="!z-[9999] max-w-4xl max-h-[95vh] lg:max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2rem] lg:rounded-[3rem] p-0 border-none shadow-2xl mx-4">
            <div className="relative">
              {/* Header Image/Background */}
              <div className="h-48 sm:h-64 bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20">
                  <button onClick={() => setSelectedProjectDetails(null)} className="w-10 h-10 bg-white/20 dark:bg-slate-900/40 backdrop-blur-md rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent z-10" />
                <img
                  src={selectedProjectDetails?.image || "/placeholder.svg"}
                  alt={selectedProjectDetails?.title}
                  className="h-1/2 sm:h-2/3 object-contain z-0 relative drop-shadow-2xl px-8"
                />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-10 lg:p-16 relative z-10 -mt-12 sm:-mt-20">
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                  <Badge className="bg-primary text-white border-0 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg">
                    {selectedProjectDetails?.stage}
                  </Badge>
                  <Badge className="bg-slate-100 dark:bg-slate-800 text-foreground border-border px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow-sm">
                    Class of {selectedProjectDetails?.year}
                  </Badge>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-foreground uppercase tracking-tighter mb-6 sm:mb-8 leading-snug break-words">
                  {selectedProjectDetails?.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
                  <div className="space-y-1">
                    <div className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Institution</div>
                    <div className="text-sm sm:text-base font-bold text-foreground">{selectedProjectDetails?.college}</div>
                  </div>
                  <div className="space-y-1 sm:border-l border-border sm:pl-8">
                    <div className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Team Lead</div>
                    <div className="text-sm sm:text-base font-black text-foreground uppercase">{selectedProjectDetails?.projectLeaders?.name}</div>
                  </div>
                  <div className="space-y-1 sm:border-l border-border sm:pl-8">
                    <div className="text-[9px] sm:text-[10px] font-black text-muted-foreground uppercase tracking-widest">Connect</div>
                    <a href={`mailto:${selectedProjectDetails?.projectLeaders?.email}`} className="text-sm sm:text-base font-bold text-primary hover:text-primary/80 transition-colors break-all">
                      {selectedProjectDetails?.projectLeaders?.email}
                    </a>
                  </div>
                </div>

                <div className="space-y-8 lg:space-y-12">
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 border border-border">
                    <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tighter mb-4 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-primary" /> Project Vision
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-lg font-medium leading-relaxed whitespace-pre-wrap">
                      {selectedProjectDetails?.description}
                    </p>
                  </div>

                  {selectedProjectDetails?.teams && selectedProjectDetails.teams.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tighter flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" /> Venture Team
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedProjectDetails.teams.map((member: Person, i: number) => (
                          <div key={i} className="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-border rounded-2xl sm:rounded-3xl shadow-sm group/member hover:border-primary/30 transition-colors">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 sm:mb-2 flex items-center gap-2">
                              <UserCircle className="w-3 h-3" /> Team Member
                            </div>
                            <div className="text-xs sm:text-sm font-black text-foreground uppercase tracking-tight mb-1 group-hover/member:text-primary transition-colors">
                              {member.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3 text-primary/40 shrink-0" />
                              <a href={`mailto:${member.email}`} className="text-[10px] sm:text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors break-all">
                                {member.email}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}


                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Loading & More */}
        {(isLoading || isFetching) && (
          <div className="flex justify-center items-center py-20">
            <LoadingBar />
          </div>
        )}

        {hasMore && !isLoading && (
          <div className="flex justify-center items-center py-20">
            <LoadMorePagination
              onClick={loadMore}
              disabled={isFetching}
              text={isFetching ? "Loading..." : "LOAD MORE VENTURES"}
            />
          </div>
        )}
      </main>
    </div>
  )
}
