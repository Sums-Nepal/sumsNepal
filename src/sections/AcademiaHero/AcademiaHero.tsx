"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Sparkles, GraduationCap, MapPin } from "lucide-react"
import { Button, GeneralForm } from "../../components"

const AcademiaHero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Dynamic Background with Overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/90 to-background z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="object-cover w-full h-full"
          src="/images/ac-hero.jpeg"
          alt="Academia Background"
        />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full mt-10 sm:mt-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content - Focus on text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 text-center lg:text-left relative z-30"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6 sm:mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Empowering Institutional Excellence</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl lg:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-6 sm:mb-8"
            >
              <span className="text-white">SUMS:</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-orange-400 to-orange-600 bg-clip-text text-transparent italic font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-7xl block mt-2">
                Powering Education
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="space-y-6 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0">
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed">
                An integrated technology ecosystem designed to power the next generation of higher education.
                We bring essential academic and administrative tools together in one seamless platform.
              </p>
            </motion.div>

            {/* Premium Info Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-4 p-4 lg:p-6 rounded-2xl sm:rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 mb-8 sm:mb-10 shadow-2xl text-left"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
                <MapPin className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-white text-sm sm:text-base font-bold leading-none mb-1 tracking-tight uppercase">Nepal-Focused Design</p>
                <p className="text-slate-400 text-[10px] sm:text-sm font-medium">Built for operational & accreditation realities.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setIsOpenGeneralForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:col-span-4 hidden lg:block relative z-10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]" />
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full" />
                <GraduationCap className="w-20 h-20 text-primary mb-6" />
                <h3 className="text-white text-3xl font-black tracking-tight mb-4">ACADEMIA PORTAL</h3>
                <p className="text-slate-400 font-medium">Streamlined administration, enhanced learning, global standards.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpenGeneralForm && (
          <GeneralForm
            visible={isOpenGeneralForm}
            onClose={() => setIsOpenGeneralForm(false)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default AcademiaHero
