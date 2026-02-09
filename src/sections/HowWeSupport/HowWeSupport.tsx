"use client"

import React from "react"
import { motion } from "framer-motion"
import { Briefcase, UserCheck, Zap, ArrowRight, Sparkles } from "lucide-react"

const HowWeSupport = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const supports = [
    {
      icon: UserCheck,
      title: "Hire Elite Talent",
      description: "Pre-vetted professionals",
      details: "Access our exclusive pool of trained graduates and interns ready to deliver immediate value to your organization.",
    },
    {
      icon: Briefcase,
      title: "Flexible Engagement",
      description: "Project-based agility",
      details: "Leverage flexible engagement models including freelancing and targeted projects to meet your evolving business needs.",
    },
    {
      icon: Zap,
      title: "Custom Upskilling",
      description: "Workforce transformation",
      details: "Co-create high-impact training programs tailored to your specific industry requirements and global quality standards.",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-background/50 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Empowerment Framework
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            HOW <span className="text-primary italic">WE</span> SUPPORT
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Elevating organizational performance through strategic talent
            alignment and collaborative innovation models.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        >
          {supports.map((support, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-12 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors" />

                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-sm">
                  <support.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                  {support.title}
                </h3>

                <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-8 italic bg-primary/5 px-4 py-1.5 rounded-full w-fit">
                  {support.description}
                </p>

                <p className="text-muted-foreground text-base font-medium leading-relaxed mb-10 flex-1">
                  {support.details}
                </p>

                <div className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  Execute Strategy <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowWeSupport