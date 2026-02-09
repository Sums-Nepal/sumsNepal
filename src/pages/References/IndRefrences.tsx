"use client"

import React, { useMemo } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Link2,
  Share2,
  Copy,
  ExternalLink,
  ChevronLeft,
  Sparkles,
  Zap,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  Globe
} from "lucide-react"
import { refrencesData } from "./RefrencesData"
import { motion, AnimatePresence } from "framer-motion"
import YouTube from "react-youtube"
import { toast } from "react-toastify"

function getYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const IndRefrences = () => {
  const { id } = useParams() // Id is the title
  const navigate = useNavigate()

  const item = useMemo(() => {
    return refrencesData.find(
      (ref) => ref.title.toString().trim().toLowerCase() === id?.toString().trim().toLowerCase()
    )
  }, [id])

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-background">
        <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center mb-8">
          <Zap className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-4xl font-black text-foreground uppercase tracking-tighter mb-4">Reference Not Found</h1>
        <p className="text-muted-foreground font-medium mb-12">The requested portfolio entry could not be located in our archives.</p>
        <button
          onClick={() => navigate("/references")}
          className="px-10 py-4 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all"
        >
          Return to Portfolio
        </button>
      </div>
    )
  }

  const pageUrl = window.location.href

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl)
    toast.success("Portfolio link copied to clipboard")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-500 py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Navigation & Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white dark:bg-slate-900 border border-border rounded-2xl flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-all shadow-sm group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => navigate("/references")}>Portfolio</span>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <span className="text-primary truncate max-w-[200px]">{item.title}</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-16 lg:gap-24"
        >
          {/* Top/Left: Content */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div variants={itemVariants}>
              <div className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 mr-2" />
                Case Study Detail
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-8 leading-[0.9]">
                {item.title}
              </h1>
              <p className="text-muted-foreground text-xl lg:text-2xl font-medium leading-relaxed italic">
                {item.description}
              </p>
            </motion.div>

            {/* Meta Stats Panel */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-8 bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] shadow-sm">
                <Zap className="w-6 h-6 text-primary mb-4" />
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Institution</div>
                <div className="text-sm font-bold text-foreground uppercase tracking-tight">{item.institution}</div>
              </div>
              <div className="p-8 bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] shadow-sm">
                <MapPin className="w-6 h-6 text-primary mb-4" />
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Location</div>
                <div className="text-sm font-bold text-foreground uppercase tracking-tight">{item.location}</div>
              </div>
              <div className="p-8 bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] shadow-sm col-span-2 md:col-span-1">
                <Globe className="w-6 h-6 text-primary mb-4" />
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Scope</div>
                <div className="text-sm font-bold text-foreground uppercase tracking-tight">
                  {item.filter === "In" ? "International" : "National"}
                </div>
              </div>
            </motion.div>

            {/* Highlights Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-black text-foreground uppercase tracking-tighter flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary" /> Key Contributions
              </h2>
              <div className="flex flex-wrap gap-3">
                {item.highlights.map((h, index) => (
                  <span key={index} className="px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-tight rounded-2xl border border-border shadow-sm">
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom/Right: Media & Actions */}
          <div className="lg:col-span-5 space-y-12">
            {/* Logo / Branding Card */}
            <motion.div variants={itemVariants} className="relative aspect-square bg-white dark:bg-slate-900 border border-border rounded-[4rem] p-16 shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/2 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors" />
              <img
                src={item.logo || "/placeholder.svg"}
                alt={item.institution}
                className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            {/* Video Player */}
            {item.video && (
              <motion.div variants={itemVariants} className="relative rounded-[3rem] overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800 shadow-2xl border border-border">
                <YouTube
                  videoId={getYouTubeId(item.video)!}
                  opts={{ width: "100%", height: "100%", playerVars: { controls: 1 } }}
                  className="w-full h-full"
                />
              </motion.div>
            )}

            {/* Action Sidebar */}
            <motion.div variants={itemVariants} className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-10 space-y-4 shadow-2xl">
              <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-6 px-2">Project Resources</div>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <Link2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Visit Platform</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                </a>
              )}

              {item.pdfUrl && (
                <a
                  href={item.pdfUrl}
                  download
                  className="w-full flex items-center justify-between p-5 bg-primary rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white uppercase tracking-tight">Archive Documentation</span>
                  </div>
                  <Download className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </a>
              )}

              <button
                onClick={copyLink}
                className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all group mt-8"
              >
                <div className="flex items-center gap-4">
                  <Share2 className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-bold text-white uppercase tracking-tight">Share Experience</span>
                </div>
                <Copy className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default IndRefrences
