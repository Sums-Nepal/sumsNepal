"use client"

import { ArrowRight, Rocket, Star, Quote, UserCircle, Sparkles } from "lucide-react"
import { Button, GeneralForm } from "../../components"
import { useState } from "react"
import { motion } from "framer-motion"

type StudentStory = {
  name: string
  role: string
  message: string
  image: string
  gradientFrom: string
  gradientTo: string
  bgColor: string
  rating: number
  footer: string
}

const stories: StudentStory[] = [
  {
    name: "Biku Shrestha",
    role: "Software Engineer",
    message:
      "SUMS helped me as a Software Engineering student to land my first job at a top tech company. The real projects and mentorship made all the difference.",
    image: "/images/hero_right.png",
    gradientFrom: "from-blue-500/20",
    gradientTo: "to-blue-600/10",
    bgColor: "bg-blue-500/10",
    rating: 5,
    footer: "Graduated 2023",
  },
  {
    name: "Samriddhi Prajuli",
    role: "Data Analyst",
    message:
      "SUMS Academia-Industry Collaboration (AIC) helped me discover my passion for data analysis. Now I'm working with international companies analyzing market trends.",
    image: "/images/hero_right.png",
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-emerald-600/10",
    bgColor: "bg-emerald-500/10",
    rating: 5,
    footer: "Career Transition 2023",
  },
  {
    name: "Rajiv Shrestha",
    role: "Marketing Manager",
    message:
      "The startup incubator program helped me launch my own marketing agency. From student entrepreneur to successful business owner!",
    image: "/images/hero_right.png",
    gradientFrom: "from-amber-500/20",
    gradientTo: "to-amber-600/10",
    bgColor: "bg-amber-500/10",
    rating: 5,
    footer: "Startup Founder 2024",
  },
]

const StudentSuccessStories = () => {
  const [showtheGeneralForm, setShowtheGeneralForm] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    },
  }

  return (
    <section className="py-24 sm:py-32 bg-background transition-colors duration-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            LUMinary Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-none"
          >
            STUDENT <span className="text-primary italic">SUCCESS</span> STORIES
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Real achievements and career transformations powered by our
            innovation ecosystem and industry partnerships.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {stories.map((student, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group"
            >
              <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-10 shadow-sm transition-all duration-500 hover:shadow-2xl flex flex-col items-center text-center overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${student.gradientFrom} ${student.gradientTo} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 group-hover:scale-110 shadow-sm border border-border">
                  <UserCircle className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                </div>

                <div className="relative w-full">
                  <Quote className="absolute -top-6 -left-2 w-12 h-12 text-primary/5 -z-10" />
                  <p className="text-foreground/90 dark:text-slate-300 text-lg font-medium leading-relaxed mb-10 italic relative z-10">
                    "{student.message}"
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-border w-full">
                  <h3 className="text-2xl font-black text-foreground mb-1 uppercase tracking-tighter group-hover:text-primary transition-colors">
                    {student.name}
                  </h3>
                  <div className="flex flex-col items-center gap-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {student.role}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(student.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Improved CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-primary rounded-[4rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-[0_32px_64px_-12px_rgba(var(--primary-rgb),0.3)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -z-0 -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-10 backdrop-blur-xl border border-white/30">
                <Rocket className="w-10 h-10" />
              </div>

              <h3 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
                WRITE YOUR OWN <br />
                <span className="opacity-50 italic">SUCCESS STORY</span>
              </h3>

              <p className="text-white/80 text-lg lg:text-xl font-medium mb-12 max-w-2xl leading-relaxed">
                Join thousands of students who have transformed their careers through our ecosystem.
                The next success story could be yours.
              </p>

              <Button
                className="bg-white text-slate-900 hover:bg-slate-50 px-14 py-8 text-xl rounded-3xl shadow-2xl flex items-center gap-4 transition-all hover:-translate-y-1 active:scale-95 group/btn font-black uppercase tracking-widest"
                onClick={() => setShowtheGeneralForm(true)}
              >
                APPLY FOR SIP
                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <GeneralForm
        visible={showtheGeneralForm}
        onClose={() => setShowtheGeneralForm(false)}
      />
    </section>
  )
}

export default StudentSuccessStories
