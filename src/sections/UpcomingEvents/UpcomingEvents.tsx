"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../../components"
import { eventsData } from "./EventsData"

const UpcomingEvents = () => {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Join the Movement
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-none"
          >
            UPCOMING <span className="text-primary italic">EVENTS</span>
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Experience the energy of Nepal's innovation ecosystem. Network with leaders,
            learn from experts, and discover new opportunities.
          </p>
        </div>

        {eventsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {eventsData.map((event, idx) => {
              const Icon = event.icon || Calendar
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className="relative h-full bg-white dark:bg-slate-900 border border-border rounded-[3rem] p-10 shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-primary/30 flex flex-col sm:flex-row gap-8 items-start overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] -z-10 group-hover:bg-primary/10 transition-colors" />

                    <div className="shrink-0 w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-6 shadow-sm border border-border/50">
                      <Icon className="w-10 h-10 text-primary group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] bg-primary/10 px-3 py-1 rounded-lg">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-tight text-[10px]">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>

                      <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter group-hover:text-primary transition-colors leading-none">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground text-md leading-relaxed font-medium">
                        {event.description}
                      </p>

                      <div className="pt-4">
                        <button className="text-primary font-black uppercase tracking-widest text-xs flex items-center gap-2 group/btn hover:translate-x-2 transition-transform">
                          Event Details
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-border"
          >
            <p className="text-muted-foreground text-xl font-medium">
              🚀 No upcoming events at the moment. Stay tuned!
            </p>
          </motion.div>
        )}

        <div className="flex justify-center mt-20">
          <Button className="bg-primary text-white hover:bg-primary/90 px-12 py-6 text-xl rounded-2xl shadow-2xl shadow-primary/25 transition-all hover:-translate-y-1 active:scale-95 font-black uppercase tracking-widest flex items-center gap-3">
            Explore All Events
            <ArrowRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
