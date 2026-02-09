"use client"

import { Building2, Globe, Handshake, Heart, Users, Sparkles, ArrowUpRight } from "lucide-react"
import React from "react"
import { motion } from "framer-motion"

const WhoCanJoin = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const organizations = [
    {
      icon: Building2,
      title: "Private",
      description: "Start-ups, SMEs, and large global enterprises seeking elite talent.",
    },
    {
      icon: Globe,
      title: "Public",
      description: "Government bodies and municipalities driving civic innovation.",
    },
    {
      icon: Heart,
      title: "NGOs",
      description: "Impact organizations scaling development initiatives across Nepal.",
    },
    {
      icon: Handshake,
      title: "Social Venture",
      description: "Purpose-driven businesses blending profit with profound impact.",
    },
    {
      icon: Users,
      title: "Associations",
      description: "Industry chambers and cooperatives fostering collective growth.",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid-slate-100/[0.05] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Global Inclusion
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            WHO <span className="text-primary italic">CAN</span> JOIN
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            We bridge the gap for every organized entity committed to
            driving progress through professional collaboration.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {organizations.map((org, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-12 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 flex flex-col overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-bl-full -z-10 group-hover:bg-primary/5 transition-colors" />

                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 group-hover:scale-110 shadow-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100" />
                  <org.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors relative z-10" />
                </div>

                <h3 className="text-3xl font-black text-foreground mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                  {org.title}
                </h3>

                <p className="text-muted-foreground text-base font-medium leading-relaxed uppercase tracking-tight text-pretty">
                  {org.description}
                </p>

                <div className="mt-12 pt-8 border-t border-border flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">Join Ecosystem</span>
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhoCanJoin
