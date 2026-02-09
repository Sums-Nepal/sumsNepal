"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Rocket, Zap, Globe, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "../../components"

const EntrepreneurshipHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-background z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="object-cover w-full h-full"
          src="/images/startup-hero.jpeg" // Assuming this image exists or using a generic one
          alt="Entrepreneurship Ecosystem"
          onError={(e) => {
            // Fallback to student hero if specific one missing
            e.currentTarget.src = "/images/student-hero.jpeg"
          }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-5" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full mt-10 sm:mt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left relative z-30"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary mb-6 sm:mb-8 backdrop-blur-md"
            >
              <Rocket className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Igniting the Next Generation of Startups</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-7xl xl:text-[7rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 text-white uppercase"
            >
              FUEL YOUR <br />
              <span className="text-primary italic">STARTUP SPARK</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
              Transform your boldest ideas into market-ready ventures.
              Access global mentorship, funding networks, and elite incubation resources.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                LAUNCH YOUR IDEA
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Graphical Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10" />

            {[
              { title: "Incubation", icon: Zap, desc: "Rapid growth cycles." },
              { title: "Mentorship", icon: Sparkles, desc: "Global industry leads." },
              { title: "Investors", icon: Globe, desc: "Seamless funding access." },
              { title: "Resources", icon: Rocket, desc: "Tools for success." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1 }}
                className="p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl group cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary transition-all duration-500">
                  <item.icon className="w-6 h-6 sm:w-7 h-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-white text-base sm:text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-slate-400 text-[10px] sm:text-xs font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EntrepreneurshipHero
