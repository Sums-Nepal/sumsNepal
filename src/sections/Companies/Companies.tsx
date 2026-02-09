"use client"

import { ArrowRight, Target, Users, Zap } from "lucide-react"
import { Button } from "../../components"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Companies = () => {
  return (
    <section className="py-24 sm:py-32 bg-secondary/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Image Side - Order First on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full relative group"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transform group-hover:scale-[1.02] transition-transform duration-700">
              <img
                src="/images/companies.jpeg"
                alt="Companies collaboration"
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-30 -z-10 translate-x-12 translate-y-12" />
          </motion.div>

          {/* Content Side */}
          <div className="flex-1 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                For Industry
              </div>
              <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-6 uppercase">
                HIRE <span className="text-primary italic">SMARTER</span>, <br />
                NOT HARDER
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Access pre-vetted talent who have already proven their skills on
                real projects. Reduce hiring time and costs while getting
                innovative solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: Target, title: "Risk-Free", desc: "Test talent on real work before you hire." },
                { icon: Users, title: "Top Talent", desc: "Connect with the most innovative young minds." },
                { icon: Zap, title: "Agile", desc: "Solve problems and innovate at production speed." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-3"
                >
                  <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border border-border">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground uppercase tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <Link to="/business">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 group">
                  Hire Elite Talent
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Companies
