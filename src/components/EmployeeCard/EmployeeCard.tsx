"use client"

import { useState } from "react"
import { Mail, Briefcase, ExternalLink, Linkedin, Twitter } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface Employee {
  id: number
  name: string
  position: string
  contact: string
  department: string
  email: string
  image?: string
  images?: string[]
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const [isHovered, setIsHovered] = useState(false)

  const mainImage = employee.images?.[0] || employee.image || "/placeholder.svg"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-primary/30 flex flex-col">
        {/* Image Container */}
        <div className="relative h-80 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <motion.img
            src={mainImage.startsWith("/") ? mainImage : `/images/${mainImage}`}
            alt={employee.name}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />

          {/* Overlay mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Department badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-5 py-1.5 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl">
              {employee.department}
            </span>
          </div>

          {/* Social connections appearing on hover */}
          <div className="absolute inset-0 flex items-center justify-center gap-4 translate-y-20 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none group-hover:pointer-events-auto">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-primary transition-all">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/20 hover:bg-primary transition-all">
              <Twitter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1 flex flex-col">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none mb-2 group-hover:text-primary transition-colors">
              {employee.name}
            </h3>
            <div className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">
                {employee.position}
              </p>
            </div>
          </div>

          <div className="mt-auto space-y-3">
            <a
              href={`mailto:${employee.email}`}
              className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent group-hover:border-primary/10 transition-all hover:bg-primary/5 group/link"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover/link:bg-primary group-hover/link:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-muted-foreground truncate max-w-[150px]">
                  {employee.email}
                </span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
