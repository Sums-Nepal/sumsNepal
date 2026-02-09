"use client"

import React from "react"
import { motion } from "framer-motion"
import { Rocket, Sparkles } from "lucide-react"

const UltimateLaunchpad = () => {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-primary/20"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Venture Catalyst
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-8 leading-none"
          >
            THE ULTIMATE <span className="text-primary italic">LAUNCHPAD</span> FOR <br />
            YOUR STARTUP DREAMS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg lg:text-2xl text-muted-foreground leading-relaxed font-medium max-w-3xl"
          >
            Join our comprehensive acceleration program designed to transform your
            innovative ideas into successful, market-disrupting businesses. Get access
            to global mentorship, funding opportunities, and a thriving community.
          </motion.p>

          {/* Floating icon for visual interest */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-12 text-primary/20"
          >
            <Rocket className="w-16 h-16" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default UltimateLaunchpad
