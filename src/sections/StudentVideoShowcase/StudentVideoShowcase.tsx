"use client"

import React, { useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Lightbulb,
  Search,
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button, GeneralForm } from "../../components"

type Feature = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  highlights: { title: string; subtitle?: string; icon?: React.ReactNode }[]
  buttonText: string
  comingSoon?: boolean
}

const features: Feature[] = [
  {
    id: "live-projects",
    title: "Live Projects",
    description:
      "Work on real challenges from top companies. Build your portfolio while solving problems that matter.",
    icon: <Target className="w-8 h-8" />,
    highlights: [
      { title: "Real-World Experience", subtitle: "Actual business challenges" },
      { title: "Expert Mentorship", subtitle: "Guidance from professionals" },
      { title: "Portfolio Building", subtitle: "Impressive project showcases" },
    ],
    buttonText: "Apply Now",
  },
  {
    id: "startup-spark",
    title: "Startup Spark",
    description:
      "Turn your ideas into reality. Get funding, mentorship, and support to launch your startup journey.",
    icon: <Lightbulb className="w-8 h-8" />,
    highlights: [
      { title: "Idea Validation", subtitle: "Test your business concept" },
      { title: "Elite Mentors", subtitle: "Connect with entrepreneurs" },
      { title: "Funding Support", subtitle: "Access to investors" },
    ],
    buttonText: "Start Your Startup",
  },
  {
    id: "internships",
    title: "Internships",
    description:
      "Get placed with top industry companies. From tech startups to major corporations.",
    icon: <Briefcase className="w-8 h-8" />,
    highlights: [
      { title: "Top Tier Companies", icon: <Building2 className="w-4 h-4" /> },
      { title: "Mentorship Programs", icon: <Users className="w-4 h-4" /> },
      { title: "Career Growth", icon: <TrendingUp className="w-4 h-4" /> },
    ],
    buttonText: "Coming Soon",
    comingSoon: true,
  },
  {
    id: "skill-scanner",
    title: "Skill Scanner",
    description:
      "Discover your career path with AI-powered assessments and personalized roadmaps.",
    icon: <Search className="w-8 h-8" />,
    highlights: [
      { title: "AI Skill Profiling" },
      { title: "Career Pathing" },
      { title: "Market Trends" },
    ],
    buttonText: "Coming Soon",
    comingSoon: true,
  },
]

const StudentMainFeatures = () => {
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleAction = useCallback((feature: Feature) => {
    if (feature.comingSoon) return
    if (feature.id === "startup-spark") {
      navigate("/entrepreneurship")
    } else if (feature.id === "live-projects") {
      setIsOpenGeneralForm(true)
    }
  }, [navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/2 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Core Opportunities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            ELEVATE YOUR <span className="text-primary italic">POTENTIAL</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Tailored pathways designed to bridge the gap between academia and industry.
            Choose your track and start building your future today.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3.5rem] p-10 lg:p-12 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10 group-hover:from-primary/10 transition-colors" />

                <div className="flex flex-col gap-10 h-full">
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 group-hover:rotate-[15deg] shadow-inner">
                      <div className="text-primary group-hover:text-white transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    {feature.comingSoon && (
                      <span className="px-5 py-2 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-border">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-4xl font-black text-foreground mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                      {feature.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-border group-hover:border-primary/20 transition-all">
                        <div className="text-primary shrink-0">
                          {highlight.icon || <CheckCircle2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-xs font-black text-foreground uppercase tracking-tight">{highlight.title}</p>
                          {highlight.subtitle && (
                            <p className="text-[10px] text-muted-foreground font-bold uppercase mt-1">{highlight.subtitle}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 mt-auto">
                    <Button
                      onClick={() => handleAction(feature)}
                      disabled={feature.comingSoon}
                      className={`px-10 py-6 rounded-2xl text-md font-black uppercase tracking-widest flex items-center gap-3 group/btn transition-all ${feature.comingSoon
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed opacity-50"
                        : "bg-primary text-white hover:bg-primary/90 shadow-2xl shadow-primary/20 hover:-translate-y-1 active:scale-95"
                        }`}
                    >
                      {feature.buttonText}
                      {!feature.comingSoon && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpenGeneralForm && (
          <GeneralForm
            visible={isOpenGeneralForm}
            onClose={() => setIsOpenGeneralForm(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default StudentMainFeatures
