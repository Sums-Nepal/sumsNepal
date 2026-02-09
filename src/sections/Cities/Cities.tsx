"use client"

import { Link } from "react-router-dom"
import { Button } from "../../components"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const Cities = () => {
  const benefits = [
    "Culture of innovation & entrepreneurship",
    "Local talent for local jobs",
    "Increased employment & sustainable growth",
    "Skilled graduates for emerging industries",
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
                For Local Development
              </motion.div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6">
                SMARTER <span className="text-primary italic">SOLUTIONS</span> <br />
                FOR FUTURE CITIES
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                Harness the energy and creativity of Nepal's youth to solve
                urban challenges. Get innovative solutions at a fraction of
                traditional consulting costs.
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
              <Link to="/city">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  Build Your City
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Side - Order First on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative order-first lg:order-last"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800">
              <img
                src="/images/city.jpeg"
                alt="City development"
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            {/* Background elements */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-30 -z-10 translate-x-12 -translate-y-12" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Cities
