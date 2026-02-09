"use client"

import React from "react"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const flywheelNodes = [
  { title: "Better", subtitle: "Outcomes", angle: 0 },
  { title: "Industry", subtitle: "Ties", angle: 60 },
  { title: "Enhanced", subtitle: "Reputation", angle: 120 },
  { title: "More", subtitle: "Resources", angle: 180 },
  { title: "Continuous", subtitle: "Growth", angle: 240 },
  { title: "Student", subtitle: "Success", angle: 300 },
]

const GrowthFlywheel = () => {
  const radius = 160 // Distance from center

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Sustainable Ecosystem
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-none"
          >
            ACADEMIC <span className="text-primary italic">INSTITUTIONAL GROWTH</span> <br /> FLYWHEEL
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h3 className="text-3xl lg:text-4xl font-black text-foreground uppercase tracking-tight">
                PARTNERING WITH <span className="text-primary">SUMS</span>
              </h3>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                Initiates a powerful, self-reinforcing cycle of institutional growth through technological excellence.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Better academic outcomes for the modern workforce",
                "Stronger industry ties and global partnerships",
                "Enhanced reputation and institutional credibility",
                "Increased talent and resources for continued development",
                "Sustainable growth through positive feedback loops"
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-lg text-foreground/80 font-medium leading-tight">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Interactive Flywheel */}
          <div className="relative h-[500px] flex items-center justify-center">
            {/* Spinning background circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] rounded-full border-2 border-dashed border-primary/20"
            />

            {/* Central SUMS node */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 w-32 h-32 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 group"
            >
              <div className="text-center text-white">
                <div className="text-2xl font-black leading-none">SUMS</div>
                <div className="text-[10px] font-black tracking-widest uppercase opacity-80">NEPAL</div>
              </div>
              <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </motion.div>

            {/* Orbiting nodes */}
            {flywheelNodes.map((node, index) => {
              const x = Math.cos((node.angle * Math.PI) / 180) * radius
              const y = Math.sin((node.angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute z-30"
                  style={{ x, y }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    className="w-24 h-24 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-border flex flex-col items-center justify-center p-4 text-center group cursor-pointer"
                  >
                    <div className="text-[10px] font-black text-primary uppercase leading-tight mb-1">{node.title}</div>
                    <div className="text-xs font-black text-foreground uppercase leading-tight">{node.subtitle}</div>
                    <div className="mt-2 w-4 h-0.5 bg-primary/20 group-hover:w-full transition-all duration-300" />
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthFlywheel
