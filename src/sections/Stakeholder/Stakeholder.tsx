"use client"

import { useCallback } from "react"
import { stakeholderData } from "./StakeHolderData"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const Stakeholder = () => {
  const navigate = useNavigate()

  const actOnClick = useCallback((redirectName: string) => {
    switch (redirectName) {
      case "Students":
        navigate("/student")
        break
      case "Colleges":
        navigate("/academia")
        break
      case "Companies":
        navigate("/business")
        break
      case "Cities":
        navigate("/city")
        break
      default:
        navigate("/")
    }
  }, [navigate])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stakeholderData.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                onClick={() => actOnClick(item.title)}
                className="group cursor-pointer relative"
              >
                {/* Decorative background blob */}
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-3xl p-8 shadow-sm group-hover:shadow-2xl group-hover:border-primary/50 transition-all duration-500 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors" />

                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 group-hover:rotate-6 shadow-sm">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-2xl font-black text-foreground mb-3 tracking-tighter uppercase group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-muted-foreground text-sm font-medium leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore <span className="block w-4 h-0.5 bg-primary" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Stakeholder
