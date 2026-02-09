"use client"

import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { stepsData } from "./StepsData"
import { useHowItWorks } from "../../context/HowItWorksContext"
import AssessAndAlignDetailed from "../AssessAndAlignDetailed/AssessAndAlignDetailed"
import Connext from "../Connect/Connext"
import Upskill from "../Upskill/Upskill"
import Place from "../Place/Place"

const HowItWorks = () => {
  const { one, two, three, four, currentStateNum } = useHowItWorks()

  const actOnClick = useCallback(
    (position: number) => {
      switch (position) {
        case 1: one(); break
        case 2: two(); break
        case 3: three(); break
        case 4: four(); break
        default: one(); break
      }
    },
    [one, two, three, four]
  )

  return (
    <section className="relative py-24 lg:py-32 px-6 bg-slate-950 dark:bg-black overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6"
          >
            Our Methodology
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter"
          >
            HOW IT <span className="text-primary italic">WORKS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Four strategic steps to transform careers and communities. Click
            each step to explore the journey!
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[50px] right-[50px] h-0.5 bg-slate-800 -z-10">
            <motion.div
              className="h-full bg-primary shadow-[0_0_15px_rgba(249,115,22,0.5)]"
              initial={{ width: "0%" }}
              whileInView={{ width: `${((currentStateNum - 1) / 3) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>

          {stepsData.map((step, index) => {
            const Icon = step.icon
            const isActive = index + 1 <= currentStateNum
            const isCurrent = index + 1 === currentStateNum

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => actOnClick(index + 1)}
                className="group cursor-pointer bg-black"
              >
                <div
                  className={`relative p-8 rounded-[2rem] border-2 transition-all duration-500 h-full flex flex-col items-center text-center ${isCurrent
                    ? "bg-slate-900 border-primary shadow-2xl shadow-primary/20 scale-[1.05]"
                    : isActive
                      ? "bg-slate-900/50 border-primary/30"
                      : "bg-slate-950/50 border-slate-800 hover:border-slate-700"
                    }`}
                >
                  {/* Step Number Badge */}
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isActive ? "bg-primary text-white" : "bg-slate-800 text-slate-500"}`}>
                    Step {index + 1}
                  </div>

                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${isActive ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-6" : "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-300"}`}>
                    <Icon className="w-10 h-10" />
                  </div>

                  <h3 className={`text-2xl font-black mb-4 tracking-tight uppercase ${isActive ? "text-white" : "text-slate-500"}`}>
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed font-medium">
                    {step.description}
                  </p>

                  {/* Active Indicator */}
                  <AnimatePresence>
                    {isCurrent && (
                      <motion.div
                        layoutId="active-dot"
                        className="absolute -bottom-2 w-4 h-4 bg-primary rounded-full border-4 border-slate-950"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Detailed Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStateNum}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-slate-950 dark:bg-black mt-20"
        >
          {currentStateNum === 1 && <AssessAndAlignDetailed />}
          {currentStateNum === 2 && <Connext />}
          {currentStateNum === 3 && <Upskill />}
          {currentStateNum === 4 && <Place />}
        </motion.div>
      </AnimatePresence>
    </section>
  )
}

export default HowItWorks
