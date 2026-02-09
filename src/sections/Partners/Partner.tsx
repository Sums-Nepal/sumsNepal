"use client"

import { partners } from "./Partners"
import { motion } from "framer-motion"

const Partner = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Trust & Reliability
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter text-center uppercase"
          >
            GLOBAL <span className="text-primary italic">PARTNERSHIPS</span>
          </motion.h2>
        </div>

        <div className="relative w-full max-w-7xl mx-auto overflow-hidden mask-gradient">
          {/* Fading Edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-16 md:gap-24 items-center py-8 min-w-full"
              animate={{
                x: ["0%", "-50%"],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 group cursor-pointer"
                >
                  <img
                    src={`/images/logos/${partner}`}
                    alt="Partner Logo"
                    className="h-10 md:h-14 lg:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partner
