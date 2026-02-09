"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Globe, Users, BookOpen, Code, Briefcase, Brain, Sparkles } from "lucide-react"
import { Button } from "../../components/ui/button"

const ITEMS_PER_PAGE = 4

export const upskillData = [
  {
    id: 1,
    title: "Digital & Tech Skills",
    description: "AI, Data, Cloud, Cyber, Digital Marketing.",
    image: "/images/up-skills-1.png",
    alt: "Digital & Tech Skills",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Cognitive Skills",
    description: "Critical thinking, Design Thinking, Systems thinking.",
    image: "/images/up-skills-2.jpg",
    alt: "Cognitive & Problem-Solving Skills",
    icon: Brain,
  },
  {
    id: 3,
    title: "Business Leadership",
    description: "Project management, Sales, Strategy, Financial literacy.",
    image: "/images/up-skills-3.jpg",
    alt: "Business & Leadership Skills",
    icon: Briefcase,
  },
  {
    id: 4,
    title: "Human Skills",
    description: "Communication, EI, Adaptability, Collaboration.",
    image: "/images/up-skills-4.jpg",
    alt: "Human Skills",
    icon: Users,
  },
  {
    id: 5,
    title: "Future-Focused",
    description: "Sustainability, Innovation, Global & Green skills.",
    image: "/images/up-skills-5.jpg",
    alt: "Sustainability, Innovation, Global & Green skills",
    icon: Globe,
  },
]

const Upskill = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentItems = useMemo(() => {
    return upskillData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE)
  }, [currentIndex])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE)
    }
  }, [currentIndex])

  const handleNext = useCallback(() => {
    if (currentIndex + ITEMS_PER_PAGE < upskillData.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE)
    }
  }, [currentIndex])

  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Skill Mastery
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-8"
          >
            Upskill — Learn. <span className="text-primary italic">Grow.</span> Lead.
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Empower yourself with the latest industry skills, from coding to leadership.
            Our programs are designed for immediate impact and long-term career resilience.
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-4">
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="ghost"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center p-0 border border-border bg-background text-foreground hover:border-primary hover:text-primary transition-all ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : ""
                }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIndex + ITEMS_PER_PAGE >= upskillData.length}
              variant="ghost"
              className={`w-12 h-12 rounded-2xl flex items-center justify-center p-0 border border-border bg-background text-foreground hover:border-primary hover:text-primary transition-all ${currentIndex + ITEMS_PER_PAGE >= upskillData.length ? "opacity-30 cursor-not-allowed" : ""
                }`}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="hidden sm:block">
            <div className="h-1 w-32 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                animate={{ width: `${((currentIndex + ITEMS_PER_PAGE) / upskillData.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Improved Cards Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {currentItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 group-hover:rotate-6">
                      <Icon className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>

                    <div className="mb-6 rounded-2xl overflow-hidden aspect-video">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = "/images/student-hero.jpeg"
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-black text-foreground mb-3 uppercase tracking-tighter group-hover:text-primary transition-colors" title={item.title}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Upskill
