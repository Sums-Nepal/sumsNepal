"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../../components"

const CTASection = () => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden transition-colors duration-500 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative bg-primary rounded-[4rem] p-12 lg:p-20 text-center overflow-hidden shadow-[0_32px_64px_-12px_rgba(var(--primary-rgb),0.3)]">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[80px] -z-0 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex px-4 py-1.5 bg-white/20 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/30 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Scale Your Impact
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-7xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]"
            >
              Ready to <span className="opacity-50 italic">Transform</span> <br />
              Your Organization?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg lg:text-xl font-medium mb-12 max-w-2xl leading-relaxed"
            >
              Join thousands of organizations already collaborating and
              co-creating innovative solutions for Nepal's future. Build your network,
              scale your vision, and lead the transformation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto"
            >
              <Button className="bg-white text-primary hover:bg-slate-100 px-12 py-7 text-lg rounded-3xl shadow-2xl flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:scale-95 group/btn font-black uppercase tracking-widest w-full sm:w-auto">
                Get Started Today
                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </Button>
              <Button
                className="px-12 py-7 text-lg rounded-3xl backdrop-blur-md border-white/30 text-white hover:bg-white/10 transition-all font-black uppercase tracking-widest w-full sm:w-auto bg-transparent border border-white/30"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
