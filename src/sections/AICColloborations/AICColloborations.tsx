"use client"

import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, GraduationCap, Clock, Sparkles, Filter, Database, Code, Briefcase } from "lucide-react"
import {
  collaborations,
  type AICCollaborationsProps,
  type Collaboration,
} from "./coloborationData"

type StatusFilter = "upcoming" | "ongoing" | "completed" | "all"
type DomainFilter = "management" | "engineering" | "it"

function inferDomain(c: Collaboration): DomainFilter {
  const text = `${c.projectTitle} ${c.projectDescription} ${c.companyName} ${c.collegeName ?? ""}`.toLowerCase()

  const engineeringKeywords = [
    "engineering", "hydropower", "hydrological", "bim", "modelling", "modeling",
    "infrastructure", "drone", "river basin", "sediment", "power generation",
    "construction", "builders",
  ]

  const itKeywords = [
    "saas", "mvp", "platform", "application", "mobile", "system", "automating",
    "automation", "software", "data", "blockchain", "digital", "rental", "hostel",
  ]

  if (engineeringKeywords.some(k => text.includes(k))) return "engineering"
  if (itKeywords.some(k => text.includes(k))) return "it"
  return "management"
}

export function AICCollaborations({ data = collaborations }: AICCollaborationsProps) {
  const statusOrder: StatusFilter[] = ["all", "upcoming", "ongoing", "completed"]
  const domainOrder: { id: DomainFilter; icon: any }[] = [
    { id: "management", icon: Briefcase },
    { id: "engineering", icon: Database },
    { id: "it", icon: Code }
  ]

  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all")
  const [activeDomain, setActiveDomain] = useState<DomainFilter>("management")

  const filteredCollabs = useMemo(() => {
    let list = data
    if (activeStatus !== "all") {
      list = list.filter((c) => c.status === activeStatus)
    }
    list = list.filter((c) => inferDomain(c) === activeDomain)
    return list
  }, [data, activeStatus, activeDomain])

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ongoing": return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
      case "completed": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "upcoming": return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      default: return "bg-slate-500/10 text-slate-600 border-slate-500/20"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }
  }

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Strategic Synergy
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            ACADEMIA INDUSTRY <span className="text-primary italic">COLLABORATION</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Bridge the expertise gap through our AIC framework. We connect leading
            companies with prestigious academic institutions for high-impact innovation.
          </p>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-col items-center gap-10 mb-20">
          <div className="flex flex-col gap-6 w-full max-w-4xl">
            <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
              <Filter className="w-3 h-3" />
              Filter by Status
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {statusOrder.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStatus(s)}
                  className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${activeStatus === s
                    ? "text-white shadow-xl shadow-primary/20"
                    : "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-border hover:border-primary/30"
                    }`}
                >
                  <AnimatePresence>
                    {activeStatus === s && (
                      <motion.div
                        layoutId="activeStatus"
                        className="absolute inset-0 bg-primary -z-10"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 w-full max-w-4xl">
            <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
              <Database className="w-3 h-3" />
              Select Domain
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {domainOrder.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`px-10 py-5 rounded-[2rem] flex items-center gap-4 transition-all duration-500 overflow-hidden relative ${activeDomain === domain.id
                    ? "text-white shadow-2xl shadow-primary/30 scale-105"
                    : "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-border hover:border-primary/20"
                    }`}
                >
                  <AnimatePresence>
                    {activeDomain === domain.id && (
                      <motion.div
                        layoutId="activeDomain"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 -z-10"
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </AnimatePresence>
                  <domain.icon className={`w-5 h-5 ${activeDomain === domain.id ? "text-white" : "text-primary"}`} />
                  <span className="text-xs font-black uppercase tracking-widest">{domain.id}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Collaborations Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeStatus}-${activeDomain}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCollabs.map((collaboration) => (
              <motion.div
                key={collaboration.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 flex flex-col overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors" />

                  <div className="flex justify-between items-start mb-8 w-full">
                    <div className="w-32 h-32 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl flex items-center justify-center border border-border shadow-sm group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-500">
                      <img
                        src={collaboration.collegeLogoUrl || "/placeholder.svg"}
                        alt={collaboration.collegeName}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    {collaboration.status && (
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(collaboration.status)}`}>
                        {collaboration.status}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 space-y-6">
                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {collaboration.projectTitle}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-transparent group-hover:border-primary/10 transition-all">
                        <Building2 className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-[10px] font-black text-muted-foreground uppercase mb-0.5">Company Partner</p>
                          <p className="font-bold text-foreground text-sm uppercase">{collaboration.companyName}</p>
                        </div>
                      </div>

                      {collaboration.collegeName && (
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/30 p-4 rounded-2xl border border-transparent group-hover:border-primary/10 transition-all">
                          <GraduationCap className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-[10px] font-black text-muted-foreground uppercase mb-0.5">Academic Lead</p>
                            <p className="font-bold text-foreground text-sm uppercase">{collaboration.collegeName}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm font-medium leading-relaxed italic">
                      "{collaboration.projectDescription}"
                    </p>
                  </div>

                  {collaboration.duration && (
                    <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Timeframe</span>
                      </div>
                      <span className="text-primary font-black uppercase tracking-widest text-[11px] bg-primary/10 px-4 py-1 rounded-full">
                        {collaboration.duration}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
