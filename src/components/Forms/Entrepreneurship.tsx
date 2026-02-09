"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Rocket, Mail, Phone, User, Lightbulb, Activity, Globe, CheckCircle2, Sparkles } from "lucide-react"
import Button from "../Button/Button"

const Entrepreneurship = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startupName: "",
    ideaDescription: "",
    stage: "",
    industry: "",
    terms: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "Full Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required"
    if (!formData.startupName.trim()) newErrors.startupName = "Startup Name is required"
    if (!formData.ideaDescription.trim()) newErrors.ideaDescription = "Idea Description is required"
    if (!formData.stage) newErrors.stage = "Current Stage is required"
    if (!formData.industry) newErrors.industry = "Industry/Sector is required"
    if (!formData.terms) newErrors.terms = "You must agree to the terms"
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const subject = encodeURIComponent(`New Startup Submission from ${formData.name}`)
    const body = encodeURIComponent(
      `Full Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Startup Name: ${formData.startupName}
Idea Description: ${formData.ideaDescription}
Current Stage: ${formData.stage}
Industry/Sector: ${formData.industry}
Agreement: ${formData.terms ? "I have agreed to the SUMS Nepal terms" : "Not agreed"}`
    )

    window.location.href = `mailto:connect@sumsnepal.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-900/30 relative overflow-hidden" id="en-form">
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12 sm:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20"
          >
            Venture Catalyst Portal
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-none"
          >
            SUBMIT YOUR <span className="text-primary italic">STARTUP</span> IDEA
          </motion.h2>
          <p className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-medium px-4">
            Share your vision and connect with SUMS Nepal for elite mentorship,
            funding networks, and global incubation support.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-emerald-500 to-primary" />

            <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
              {/* Personal Information */}
              <div>
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">Founder Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Full Name *</label>
                    <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.name ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all`} />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.name}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Email *</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@startup.com" className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.email ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all`} />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Phone *</label>
                    <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+977 123 4567" className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.phone ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all`} />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Startup Information */}
              <div className="pt-8 border-t border-border">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-foreground uppercase tracking-tight">Venture Bio</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Startup Name *</label>
                    <input name="startupName" type="text" value={formData.startupName} onChange={handleChange} placeholder="e.g. InnovateX" className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.startupName ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all`} />
                    {errors.startupName && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.startupName}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Current Stage *</label>
                    <select name="stage" value={formData.stage} onChange={handleChange} className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.stage ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all appearance-none cursor-pointer`}>
                      <option value="">Select Stage</option>
                      <option value="idea">Conceptual / Idea</option>
                      <option value="mvp">MVP Developed</option>
                      <option value="early">Early Revenue</option>
                      <option value="growth">Scaling / Growth</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 mb-6 sm:mb-8">
                  <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Industry Sector *</label>
                  <select name="industry" value={formData.industry} onChange={handleChange} className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.industry ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all appearance-none cursor-pointer`}>
                    <option value="">Select Industry</option>
                    <option value="tech">Hardware & AI</option>
                    <option value="fintech">FinTech / Blockchain</option>
                    <option value="edu">EdTech</option>
                    <option value="agri">Agriculture</option>
                    <option value="social">Social Impact</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-foreground/60 uppercase tracking-widest ml-1">Idea Description *</label>
                  <textarea name="ideaDescription" rows={5} value={formData.ideaDescription} onChange={handleChange} placeholder="Tell us about the problem you are solving and your unique solution..." className={`w-full bg-slate-50 dark:bg-slate-800/50 border ${errors.ideaDescription ? "border-red-500" : "border-border"} focus:border-primary rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3 sm:py-4 text-sm font-semibold outline-none transition-all resize-none font-medium leading-relaxed`} />
                </div>
              </div>

              <div className="pt-8 flex flex-col items-center">
                <div className="flex items-start gap-3 mb-8 text-left group cursor-pointer">
                  <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} className="mt-1 w-5 h-5 accent-primary cursor-pointer border-border rounded" />
                  <label htmlFor="terms" className="text-[10px] sm:text-xs font-medium text-muted-foreground leading-relaxed cursor-pointer select-none">
                    I agree to the SUMS Nepal terms and conditions and privacy policy. I understand that my data will be handled according to global data standards.
                  </label>
                </div>

                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-12 py-5 sm:py-6 text-lg sm:text-xl rounded-xl sm:rounded-2xl shadow-2xl shadow-primary/30 flex items-center gap-3 transition-transform hover:-translate-y-1 active:scale-95 group/btn w-full sm:w-auto justify-center uppercase font-black tracking-tighter">
                  SUBMIT YOUR VISION
                  <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Entrepreneurship
