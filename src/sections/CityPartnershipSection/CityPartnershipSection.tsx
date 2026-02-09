"use client"

import { Search, GraduationCap, Briefcase, Rocket, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Skill Gap Analysis",
    description: "Map your city's talent landscape. Identify critical skill gaps and growth opportunities.",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Project-Based Learning",
    description: "Connect students with real-world projects. Build practical skills through hands-on experience.",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Internships & Jobs",
    description: "Create direct pathways from education to employment. Match talent with local opportunities.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Startup Support",
    description: "Incubate innovative startups that address local challenges and create global opportunities.",
  },
]

export function CityPartnershipSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Cityscape Silhouette / Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/10 to-transparent z-0 opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/20 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/30"
          >
            Strategic Collaboration
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black tracking-tighter uppercase mb-6"
          >
            HOW <span className="text-primary italic">WE</span> PARTNER
          </motion.h2>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            A precise, results-oriented framework for transforming city dynamics
            through technology, talent, and shared vision.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative group lg:pt-10"
            >
              {/* Step counter backdrop */}
              <div className="absolute top-0 left-0 text-9xl font-black text-white/5 select-none pointer-events-none -z-10 group-hover:text-primary/5 transition-colors">
                {step.number}
              </div>

              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-6">
                  <step.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center gap-2 text-primary font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all">
                  Phase {step.number} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
