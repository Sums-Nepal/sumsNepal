"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, Building2, MapPin, Zap, ArrowRight, Home, Globe, Award } from "lucide-react"
import { Button } from "../../components"

export const CityHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = (id: string) => {
    const targetId = id === "1" ? "city-need-sums" : "city-contact-form"
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 lg:pt-0">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-background z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="object-cover w-full h-full"
          src="/images/city-hero.jpeg"
          alt="Civic Innovation"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-5" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 w-full py-24 sm:py-32 mt-12 sm:mt-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
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
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Empowering Modern Cities</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-6 sm:mb-8 text-white uppercase"
            >
              TRANSFORM <br />
              YOUR <span className="text-primary italic">CITY</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-medium">
              Retain talent, create jobs, and solve local challenges with
              innovation-driven initiatives powered by collaboration and smart civic solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={() => handleScroll("1")}
                className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                HOW IT WORKS
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </Button>
              <Button
                onClick={() => handleScroll("2")}
                className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl backdrop-blur-md transition-all w-full sm:w-auto"
              >
                CONTACT US
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Interactive Civic Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="grid grid-cols-2 gap-6 relative">
              {[
                { title: "Infrastructure", icon: Home, desc: "Smart urban planning." },
                { title: "Civic Tech", icon: Zap, desc: "Connected governance." },
                { title: "Talent Pool", icon: Globe, desc: "Retaining local genius." },
                { title: "Sustainable", icon: Award, desc: "Long-term city growth." },
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

            {/* Float badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -right-10 bg-primary p-6 rounded-3xl shadow-2xl shadow-primary/40 hidden lg:block"
            >
              <p className="text-white font-black text-2xl">#1</p>
              <p className="text-white/80 text-[10px] font-black uppercase tracking-tighter">Civic Innovation<br />Ecosystem</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
