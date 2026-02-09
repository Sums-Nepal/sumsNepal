"use client"

import { motion } from "framer-motion"

const Hub = () => {
  return (
    <section className="py-24 sm:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tighter leading-tight mb-8">
            HUB FOR <span className="text-primary italic">CAREERS</span> <br />
            AND <span className="text-primary">INNOVATION</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
            Empowering learners, academia, and industry with real-world innovation
            through a unified digital ecosystem.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Hub
