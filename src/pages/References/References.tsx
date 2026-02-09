"use client"

import {
  Download,
  ExternalLink,
  MapPin,
  FileText,
  Zap,
  Sparkles,
  Filter,
  Play,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { useState, useMemo } from "react"
import YouTube from "react-youtube"
import PdfViewer from "../../components/PDFViewer/PDFViewer"
import { Button } from "../../components"
import { useNavigate } from "react-router-dom"
import { refrencesData } from "./RefrencesData"
import { motion, AnimatePresence } from "framer-motion"

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function ReferencesPage() {
  const [selectedProjectForPdf, setSelectedProjectForPdf] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>("All")
  const navigate = useNavigate()

  const filteredProjects = useMemo(() => {
    if (filter === "All") return refrencesData
    if (filter === "International") return refrencesData.filter(p => p.filter === "In")
    return refrencesData.filter(p => p.filter === "Na")
  }, [filter])

  const navsFilters = ["All", "National", "International"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  }

  const currentProject = refrencesData.find(p => p.id === selectedProjectForPdf)

  return (
    <main className="min-h-screen bg-background transition-colors duration-500 py-24 px-6 lg:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Impact Chronicles
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            REFERENCES & <span className="text-primary italic">PORTFOLIO</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            A comprehensive showcase of our academic partnerships and professional
            ventures spanning national institutions and international innovation hubs.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
            <Filter className="w-3 h-3" />
            Filter Portfolio
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {navsFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${filter === f
                  ? "text-white shadow-xl shadow-primary/20"
                  : "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-border hover:border-primary/30"
                  }`}
              >
                <AnimatePresence>
                  {filter === f && (
                    <motion.div
                      layoutId="refFilter"
                      className="absolute inset-0 bg-primary -z-10"
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative"
              >
                <div
                  onClick={() => navigate(`/references/${project.title}`)}
                  className="relative bg-white dark:bg-slate-900 border border-border rounded-[3.5rem] overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 cursor-pointer"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors" />

                  <div className="flex flex-col lg:flex-row p-10 lg:p-14 gap-12">
                    {/* Left: Branding & Meta */}
                    <div className="lg:w-1/3 flex flex-col">
                      <div className="w-24 h-24 p-4 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center border border-border shadow-sm mb-10 group-hover:scale-110 transition-transform duration-700">
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={project.institution}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-primary" />
                          <span className="text-lg font-black text-primary uppercase tracking-tighter">{project.institution}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <MapPin className="w-5 h-5" />
                          <span className="text-sm font-bold uppercase tracking-widest">{project.location}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-10">
                        {project.link && (
                          <a
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(project.link, "_blank")
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary/10 text-primary rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Site
                          </a>
                        )}
                        {project.pdfUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedProjectForPdf(project.id)
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-sm"
                          >
                            <FileText className="w-4 h-4" />
                            PDF Docs
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right: Content & Media */}
                    <div className="lg:w-2/3 flex flex-col justify-center">
                      <div className="relative group/content">
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground uppercase tracking-tighter mb-6 leading-none group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-muted-foreground text-lg lg:text-xl font-medium leading-relaxed mb-10">
                          {project.description}
                        </p>

                        {/* Video Preview if available */}
                        {project.video && (
                          <div className="relative rounded-[2.5rem] overflow-hidden aspect-video bg-slate-200 dark:bg-slate-800 group/video shadow-2xl">
                            <YouTube
                              videoId={getYouTubeId(project.video)!}
                              opts={{ width: "100%", height: "100%", playerVars: { controls: 1 } }}
                              className="w-full h-full"
                            />
                          </div>
                        )}

                        {/* Highlights Tags */}
                        <div className="flex flex-wrap gap-3 mt-10">
                          {project.highlights.map((h: string) => (
                            <span key={h} className="px-5 py-2 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-border">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PDF Preview Modal */}
      <Dialog
        open={selectedProjectForPdf !== null}
        onOpenChange={(open) => !open && setSelectedProjectForPdf(null)}
      >
        <DialogContent className="max-w-5xl h-[90vh] bg-white dark:bg-slate-900 border-0 p-0 overflow-hidden rounded-[3rem]">
          <DialogHeader className="p-8 pb-4 border-b border-border bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-black text-foreground uppercase tracking-tighter">
                  {currentProject?.title}
                </DialogTitle>
                <DialogDescription className="text-xs font-bold text-primary uppercase tracking-widest mt-1">
                  Document for {currentProject?.institution}
                </DialogDescription>
              </div>
              <a
                href={currentProject?.pdfUrl}
                download
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              >
                <Download className="w-4 h-4" />
                Download Complete PDF
              </a>
            </div>
          </DialogHeader>

          <div className="h-full overflow-y-auto p-8 bg-slate-100 dark:bg-slate-950 flex flex-col items-center">
            {currentProject?.pdfUrl && currentProject.pdfUrl !== "#" ? (
              <div className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
                <PdfViewer pdfUrl={currentProject.pdfUrl} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-20">
                <div className="w-20 h-20 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mb-8">
                  <FileText className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-2xl font-black text-foreground uppercase tracking-tighter mb-4">No Preview Available</h4>
                <p className="text-muted-foreground font-medium max-w-sm">
                  The requested document is currently under review. Please contact info@sumsnepal.com for direct access.
                </p>
              </div>
            )}
            <div className="py-20" /> {/* Bottom spacer for scroll */}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
