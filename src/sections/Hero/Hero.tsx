"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, GraduationCap, Building2, Lightbulb, Users } from "lucide-react"
import { Button } from "../../components"
import { useNavigate } from "react-router-dom"

const Hero = () => {
  const navigate = useNavigate()

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
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/90 to-background dark:to-background z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          className="object-cover w-full h-full"
          src="/images/home-hero-section.jpeg"
          alt="Hero Background"
        />
        {/* Animated Particles/Blur Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left relative z-30"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Next-Gen Education Ecosystem</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
            >
              <span className="text-white">TRANSFORMING</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-orange-400 to-orange-600 bg-clip-text text-transparent">
                EDUCATION
              </span>
              <br />
              <span className="text-white/90 italic font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 block">
                Through Innovation
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              SUMS bridges academia and industry to build future-ready learners
              through a digital ecosystem powered by Finnish innovation and
              global collaboration.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Button
                onClick={() => navigate("/academia")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-primary/20 flex items-center gap-3 transition-transform hover:-translate-y-1 w-full sm:w-auto justify-center"
              >
                Join Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/sip")}
                className="px-8 py-6 text-lg rounded-2xl backdrop-blur-md border-white/10 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Explore SIP
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Advanced Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block lg:col-span-5 relative z-10"
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { title: "Academia", icon: GraduationCap, delay: 0 },
                { title: "Industry", icon: Building2, delay: 0.1 },
                { title: "Innovation", icon: Lightbulb, delay: 0.2 },
                { title: "Collaboration", icon: Users, delay: 0.3 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-lg hover:bg-white/10 hover:border-primary/30 transition-all duration-500 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-white font-bold text-xl">{item.title}</h3>
                  <div className="w-0 group-hover:w-full h-0.5 bg-primary mt-2 transition-all duration-500" />
                </motion.div>
              ))}

              {/* Decorative elements for the grid */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
