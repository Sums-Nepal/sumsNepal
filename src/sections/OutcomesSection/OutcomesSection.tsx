"use client"

import { whatYouGetData } from "./WhatYouGetDatas"
import { motion } from "framer-motion"

const OutcomesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden transition-colors duration-500">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Our Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6"
          >
            WHAT YOU <span className="text-primary italic">GET</span>
          </motion.h2>
          <p className="text-2xl lg:text-3xl font-black text-primary uppercase tracking-tighter mb-4 italic">
            Make your progress
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whatYouGetData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2rem] p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-primary/50 overflow-hidden">
                {/* Gradient background hover effect */}
                <div className="absolute inset-x-0 -bottom-full group-hover:bottom-0 h-full bg-gradient-to-t from-primary/5 to-transparent transition-all duration-700 -z-10" />

                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:rotate-[10deg] transition-all duration-500 shadow-sm">
                  <div className="text-primary group-hover:text-white transition-colors scale-110">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <p className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-lg mb-4">
                    {item.subtitle}
                  </p>
                )}

                <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default OutcomesSection
