"use client"

import { Brain, Target, Lightbulb, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

const problems = [
  {
    icon: Brain,
    title: "Brain Drain",
    description: "Elite local talent migrates abroad seeking superior innovation ecosystems and career growth.",
  },
  {
    icon: Target,
    title: "Skill Mismatch",
    description: "Deep misalignment between academic output and the rapidly evolving demands of global industry.",
  },
  {
    icon: Lightbulb,
    title: "Stagnant Innovation",
    description: "Cities lose critical economic momentum due to a lack of interconnected innovation hubs and resources.",
  },
]

export function ProblemsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden" id="city-need-sums">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <AlertTriangle className="w-3 h-3 mr-2" />
            Critical Civic Challenges
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-none"
          >
            WHY YOUR <span className="text-primary italic">CITY</span> <br /> NEEDS SUMS
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium">
            Identifying and addressing the systemic barriers that prevent
            cities from becoming global centers of excellence.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-red-500/30 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full -z-10 group-hover:bg-red-500/10 transition-colors" />

                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-500 transition-all duration-500 group-hover:rotate-6">
                  <problem.icon className="w-8 h-8 text-red-500 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter group-hover:text-red-500 transition-colors">
                  {problem.title}
                </h3>

                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
