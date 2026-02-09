"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, Zap, Globe, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "../../components"

const BusinessHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  }

  const scrollToForm = () => {
    const element = document.getElementById("business-page-form")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with advanced overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-background z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="object-cover w-full h-full"
          src="/images/business-hero.jpeg"
          alt="Business Ecosystem"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-5" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full mt-12 sm:mt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6 sm:mb-8 backdrop-blur-md"
            >
              <Briefcase className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Building Global Workforce Innovation</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-[8rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 text-white uppercase"
            >
              CONNECT. <br />
              COLLABORATE. <br />
              <span className="text-primary italic">CO-CREATE.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
              We invite organizations, private companies, NGOs, and social enterprises
              to partner and build a future-ready workforce together.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={scrollToForm}
                className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                JOIN ECOSYSTEM
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </Button>
            </motion.div>

            {/* Organizations Stat */}
            <motion.div variants={itemVariants} className="mt-12 sm:mt-16 border-l-2 border-primary/30 pl-6 sm:pl-8 text-left max-w-xs mx-auto lg:mx-0">
              <p className="text-4xl sm:text-5xl font-black text-white leading-none mb-2">70+</p>
              <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">Global Partners In Ecosystem</p>
            </motion.div>
          </motion.div>

          {/* Right - Glassmorphic Integration Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="grid grid-cols-2 gap-6 relative">
              {[
                { title: "Talent Feed", icon: Globe, desc: "Global talent pipeline." },
                { title: "Smart Operations", icon: Zap, desc: "Seamless integration." },
                { title: "HR Systems", icon: Briefcase, desc: "Modern human capital." },
                { title: "Predictive Analytics", icon: BarChart3, desc: "Data-driven growth." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1 }}
                  className="p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl group cursor-pointer"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-500">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-white text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Central Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/10 backdrop-blur-3xl border border-primary/20 rounded-full flex items-center justify-center shadow-inner">
              <div className="text-primary font-black text-xs tracking-widest">ECOSYSTEM</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BusinessHero
