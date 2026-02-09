"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Users2, Sparkles } from "lucide-react"
import { Button, GeneralForm } from "../../components"

const AcademiaGrow = () => {
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Visual Composition */}
          <div className="grid grid-cols-2 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800"
            >
              <img
                src="/images/make-you-grow.jpeg"
                alt="Growth and progress"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 mt-12"
            >
              <img
                src="/images/hero_right.png"
                alt="Student success"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </motion.div>

            {/* Overlay badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-border z-10 hidden sm:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Users2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xl font-black text-foreground">50+</p>
                <p className="text-xs font-bold text-muted-foreground uppercase">Global Experts</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Content Breakdown */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3" />
                Collaborative Excellence
              </div>
              <h2 className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase leading-none mb-6">
                MAKE YOU <span className="text-primary italic">GROW</span>, <br />
                TOGETHER
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6 text-muted-foreground text-lg leading-relaxed font-medium">
              <p>
                Social cognitive education is a collaborative process where individuals learn from each other through observation, discussion, and shared experiences.
              </p>
              <p>
                Our team of 50+ Social Cognitive Experts from Nepal and academia's foremost authorities bring the best of both worlds to our students.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => setIsOpenGeneralForm(true)}
                className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 group transition-all"
              >
                STAY IN TOUCH
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
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

export default AcademiaGrow
