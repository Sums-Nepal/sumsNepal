"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users2, Target, Globe, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../../components"

const solutions = [
  {
    id: "talent",
    label: "Talent Retention",
    title: "Strategic Talent Retention",
    description: "Keep your brightest minds home by creating meaningful opportunities. Our programs connect local talent with innovation projects that matter to your community.",
    icon: Globe,
  },
  {
    id: "education",
    label: "Industry Alignment",
    title: "Education-Industry Alignment",
    description: "Bridge the gap between education and industry needs. We help align curriculum with real-world demands, ensuring students graduate with relevant, in-demand skills.",
    icon: Target,
  },
  {
    id: "ecosystem",
    label: "Innovation Ecosystem",
    title: "Thriving Innovation Ecosystem",
    description: "Build a thriving innovation ecosystem that attracts talent and investment. Create the infrastructure and support systems that enable startups and innovation to flourish.",
    icon: Sparkles,
  },
]

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("talent")

  const activeSolution = solutions.find((s) => s.id === activeTab)

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Resolution Framework
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6"
          >
            OUR <span className="text-primary italic">SOLUTIONS</span>
          </motion.h2>
        </div>

        {/* Tabs - Modern Minimalist */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
          {solutions.map((solution) => (
            <button
              key={solution.id}
              onClick={() => setActiveTab(solution.id)}
              className={`relative px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === solution.id
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800"
                }`}
            >
              <AnimatePresence>
                {activeTab === solution.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-2xl -z-10 shadow-xl shadow-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </AnimatePresence>
              {solution.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-10 lg:p-16 shadow-2xl relative overflow-hidden group">
                {/* Background Accent */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-3 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {activeSolution && <activeSolution.icon className="w-12 h-12 text-primary" />}
                    </div>
                  </div>

                  <div className="lg:col-span-9 space-y-6">
                    <h3 className="text-3xl lg:text-4xl font-black text-foreground uppercase tracking-tighter leading-none">
                      {activeSolution?.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                      {activeSolution?.description}
                    </p>
                    <div className="pt-4">
                      <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 group/btn">
                        Explore Solution
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
