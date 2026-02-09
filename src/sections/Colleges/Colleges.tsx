"use client"

import { Link } from "react-router-dom"
import { Button } from "../../components"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const Colleges = () => {
  const benefits = [
    "Industry-linked internships & live projects",
    "Future-ready flexible courses",
    "Faculty development & global exposure",
    "Enhanced student enrollment & growth",
    "Career-ready graduates for global success",
  ]

  return (
    <section className="py-24 sm:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6"
              >
                For Institutions
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6">
                MORE PLACEMENTS, <br />
                <span className="text-primary italic">STRONGER REPUTATION</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                Transform your institution into a powerhouse of industry-ready
                graduates with our comprehensive partnership program built on global standards.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <Link to="/academia">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  Explore Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            {/* Fancy Image Frame */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <img
                src="/images/placement.jpg"
                alt="Placement success"
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            {/* Background blobs */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600/10 rounded-full blur-3xl -z-10 animate-pulse delay-500" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Colleges
