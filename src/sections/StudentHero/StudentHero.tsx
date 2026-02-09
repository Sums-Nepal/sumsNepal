"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, GraduationCap, Briefcase, Users, Target, ArrowRight } from "lucide-react"
import { Button } from "../../components"

const StudentHero = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = (offset: number) => {
    window.scrollBy({ top: offset, behavior: "smooth" })
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-background z-10" />
        <motion.img
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="object-cover w-full h-full"
          src="/images/student-hero.jpeg"
          alt="Student Success"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-5" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full mt-12 sm:mt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
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
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Transforming Your Future</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8 text-white uppercase"
            >
              LAUNCH YOUR <br />
              <span className="text-primary italic">CAREER NOW</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
              Personalized career guidance, real-world projects, and direct connections to top employers.
              Build your network, build your future with our unified ecosystem.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={() => handleScroll(800)}
                className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                START YOUR JOURNEY
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-8 border-l-2 border-primary/30 pl-6 sm:pl-8 text-left max-w-xs mx-auto lg:mx-0">
              {[
                { number: "100+", label: "Placed" },
                { number: "70+", label: "Partners" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl sm:text-4xl font-black text-white leading-none mb-1 sm:mb-2">{stat.number}</p>
                  <p className="text-slate-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Graphical Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Career Guidance", icon: GraduationCap, desc: "Personalized mentorship." },
                { title: "Job Placements", icon: Briefcase, desc: "Direct industry routes." },
                { title: "Global Networks", icon: Users, desc: "Connect with leaders." },
                { title: "Skill Mastery", icon: Target, desc: "Learn by doing." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + (idx * 0.1), duration: 0.5 }}
                  whileHover={{ y: -10, rotate: idx % 2 === 0 ? 1 : -1, transition: { duration: 0.2 } }}
                  className="p-8 rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl group cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 border border-primary/30 group-hover:bg-primary transition-all duration-500">
                    <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-white text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default StudentHero
