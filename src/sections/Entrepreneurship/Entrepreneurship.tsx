"use client"

import { Link } from "react-router-dom"
import { Button } from "../../components"
import { entrepreneurshipData } from "./EntrepreneurshipData"
import { motion } from "framer-motion"

const Entrepreneurship = () => {
  return (
    <section className="py-24 sm:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <img
                src={entrepreneurshipData.image}
                alt={entrepreneurshipData.imageAlt}
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            {/* Background blur */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-30 -z-10 -translate-x-12 translate-y-12" />
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div>
              <div className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                {entrepreneurshipData.tag}
              </div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6 uppercase">
                {entrepreneurshipData.title}{" "}
                <span className="text-primary italic">
                  {entrepreneurshipData.highlight}
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {entrepreneurshipData.description}
              </p>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {entrepreneurshipData.benefits.map((benefit, idx) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-md border border-border group-hover:bg-primary transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-foreground font-semibold text-sm">
                      {benefit.text}
                    </span>
                  </motion.div>
                )
              })}
            </div>

            {/* Impact Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl p-6 border border-border shadow-lg"
            >
              <h4 className="text-primary font-black uppercase tracking-widest text-xs mb-3">
                {entrepreneurshipData.impact.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">
                {entrepreneurshipData.impact.description}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <Link to="/sip">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  {entrepreneurshipData.cta.text}
                  <entrepreneurshipData.cta.icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Entrepreneurship
