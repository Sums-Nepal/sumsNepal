"use client"

import React from "react"
import { motion } from "framer-motion"
import { Target, Users, Clock, ArrowRight, ShieldCheck } from "lucide-react"

const Innovation = () => {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top-right -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left - Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 bg-primary/5 p-4">
              <img
                src="/images/innovation.jpeg"
                alt="Innovation and collaboration"
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl"
              />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-10 -right-10 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-border z-20 hidden sm:block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Quality Standard</p>
                  <p className="text-xl font-bold text-foreground">Finnish Pedagogy</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Content Side */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6">
                FINNISH <span className="text-primary italic">INNOVATION</span> <br />
                AT OUR CORE
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg sm:text-xl leading-relaxed">
                Experience the power of Finnish education with our interactive learning ecosystem.
                Co-developed with Finnish experts, our platform merges renowned Finnish pedagogy and technology.
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: "Strategic Learning",
                  desc: "Engaging resources for training and targeted content distribution."
                },
                {
                  icon: Users,
                  title: "Multidisciplinary",
                  desc: "Curriculum-aligned projects that break silos and encourage collaboration."
                },
                {
                  icon: Clock,
                  title: "Innovative Approach",
                  desc: "A unique approach inspired by Finland's global leadership in innovation."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-sm">
                Learn more about our methodology <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Innovation
