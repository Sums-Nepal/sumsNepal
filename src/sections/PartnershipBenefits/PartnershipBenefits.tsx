"use client"

import { Award, Building2, Lightbulb, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

const benefitsData = [
  {
    title: "Industry-Academia Linkages",
    icon: <Building2 className="w-8 h-8 text-primary" />,
    description: "Strengthen the bond between institutions and the job market.",
    bullets: [
      "Aligned Placement-Linked Curricula",
      "Faculty Exchange Programs",
      "Personalized PPMS Implementation",
      "Real-Time Placement Analytics",
    ],
  },
  {
    title: "Innovation & Research",
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    description: "Transform your institution into a leading hub of creativity.",
    bullets: [
      "Academic Innovation Hubs",
      "Student Startup Incubation",
      "Applied Research Opportunities",
      "Product Development Tracks",
    ],
  },
  {
    title: "Graduate Employability",
    icon: <Award className="w-8 h-8 text-primary" />,
    description: "Bridge the gap between education and high-value employment.",
    bullets: [
      "In-Demand Practical Skillsets",
      "Comprehensive Value Portfolios",
      "Matching Qualified Talent to Jobs",
      "Global Career Readiness",
    ],
  },
]

const PartnershipBenefits = () => {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 -skew-x-12 transform origin-top-right -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            Strategic Advantages
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6"
          >
            PARTNERSHIP <span className="text-primary italic">BENEFITS</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-3xl leading-relaxed">
            Discover how SUMS transforms academic institutions through strategic
            partnerships, global standards, and innovative integration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-full"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[2.5rem] p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/50 group-hover:-translate-y-2 overflow-hidden">
                {/* Decorative blob */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-colors" />

                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 group-hover:rotate-6 shadow-sm">
                  <div className="group-hover:text-white transition-colors">
                    {benefit.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">
                  {benefit.title}
                </h3>

                <p className="text-muted-foreground text-sm font-medium mb-8 leading-relaxed">
                  {benefit.description}
                </p>

                <ul className="space-y-4">
                  {benefit.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform" />
                      <span className="text-foreground text-sm font-semibold leading-tight">
                        {bullet}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnershipBenefits
