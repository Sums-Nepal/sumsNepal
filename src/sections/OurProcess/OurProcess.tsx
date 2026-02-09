"use client"

import React from "react"
import { motion } from "framer-motion"
import { Building2, Handshake, UserCheck, Users, Sparkles, ChevronRight } from "lucide-react"

const OurProcess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const processes = [
    {
      step: "01",
      title: "Submit Context",
      description: "Define your organization's mission and specific talent requirements.",
      icon: Building2,
    },
    {
      step: "02",
      title: "Match Intelligence",
      description: "We algorithmically align your needs with our elite talent profiles.",
      icon: UserCheck,
    },
    {
      step: "03",
      title: "Seamless Onboard",
      description: "Direct integration into your organizational workflows with support.",
      icon: Handshake,
    },
    {
      step: "04",
      title: "Scale Support",
      description: "Continuous ecosystem partnership to drive long-term strategic success.",
      icon: Users,
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Operational Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            OUR <span className="text-primary italic">PROCESS</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A precision-driven methodology for connecting global organizations
            with local expertise and transformative talent.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative"
        >
          {/* Timeline Line */}
          <div className="absolute top-[4.5rem] left-0 w-full h-0.5 bg-border hidden lg:block z-0" />

          {processes.map((process, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative z-10"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-12 shadow-sm hover:shadow-2xl hover:border-primary/40 transition-all duration-500 group flex flex-col items-center text-center">
                <div className="relative mb-10">
                  <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center group-hover:bg-primary transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100" />
                    <process.icon className="w-10 h-10 text-primary group-hover:text-white transition-colors relative z-10" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-slate-800 text-primary border-4 border-slate-50 dark:border-slate-900 rounded-full flex items-center justify-center font-black text-sm shadow-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    {process.step}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-foreground mb-6 uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                  {process.title}
                </h3>

                <p className="text-muted-foreground text-base font-medium leading-relaxed">
                  {process.description}
                </p>

                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary translate-y-4 group-hover:translate-y-0">
                  Next Phase <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OurProcess