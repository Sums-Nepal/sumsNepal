"use client"

import { companiesTrustUs } from "./BusinessCompaniesTrustList"
import { motion } from "framer-motion"

const BusinessCompaniesTrust = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Network of Excellence
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-foreground tracking-tighter uppercase"
          >
            THEY <span className="text-primary italic">TRUST</span> US
          </motion.h2>
          <p className="text-muted-foreground text-lg mt-4 font-medium">Leading organizations driving global innovation with our platform.</p>
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
              {[...companiesTrustUs, ...companiesTrustUs, ...companiesTrustUs, ...companiesTrustUs].map((partner, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 group cursor-pointer"
                >
                  <img
                    src={`/images/${partner}`}
                    alt="Partner Logo"
                    className="h-12 lg:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300"
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

export default BusinessCompaniesTrust