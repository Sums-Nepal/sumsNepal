"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Building2, Briefcase, Mail, Phone, Users2, MapPin, DollarSign, Clock, FileText, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "../../components"

const PostYourOffer = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    orgType: "",
    contactName: "",
    email: "",
    phone: "",
    opportunityType: "",
    studentsWanted: "",
    background: "",
    duration: "",
    compensation: "",
    location: "",
    notes: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.orgName.trim()) newErrors.orgName = "Required"
    if (!formData.orgType) newErrors.orgType = "Required"
    if (!formData.contactName.trim()) newErrors.contactName = "Required"
    if (!formData.email.trim()) newErrors.email = "Required"
    if (!formData.phone.trim()) newErrors.phone = "Required"
    if (!formData.opportunityType) newErrors.opportunityType = "Required"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    // Simulate slight delay for premium feel
    await new Promise(r => setTimeout(r, 1500))

    const subject = encodeURIComponent(`New Offer Submission: ${formData.orgName}`)
    const body = encodeURIComponent(
      `Organization Name: ${formData.orgName}\nType: ${formData.orgType}\nContact: ${formData.contactName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nOpportunity: ${formData.opportunityType}\nQty: ${formData.studentsWanted}\nNotes: ${formData.notes}`
    )

    window.location.href = `mailto:Info@sumsnepal.com?subject=${subject}&body=${body}`

    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden transition-colors duration-500" id="business-page-form">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Partnership Portal
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            POST <span className="text-primary italic">YOUR</span> OFFER
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Architect a strategic collaboration by defining your organizational needs.
            Connect with pre-vetted elite talent across Nepal.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative bg-white dark:bg-slate-900 border border-border rounded-[4rem] p-10 lg:p-20 shadow-2xl overflow-hidden glassmorphism">
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-orange-500 to-primary" />

            <form onSubmit={handleSubmit} className="space-y-16">
              {/* Part 1: Identity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none">Identity</h3>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Define the organizational infrastructure and category for this collaboration.
                  </p>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Organization Name</label>
                    <input
                      name="orgName"
                      type="text"
                      value={formData.orgName}
                      onChange={handleChange}
                      placeholder="e.g. SUMS International"
                      className={`w-full bg-slate-50 dark:bg-slate-800/50 border-2 ${errors.orgName ? "border-red-500/50" : "border-transparent"} focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none shadow-sm`}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Sector Category</label>
                    <select
                      name="orgType"
                      value={formData.orgType}
                      onChange={handleChange}
                      className={`w-full bg-slate-50 dark:bg-slate-800/50 border-2 ${errors.orgType ? "border-red-500/50" : "border-transparent"} focus:border-primary/30 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none appearance-none shadow-sm`}
                    >
                      <option value="">Select Category</option>
                      <option value="private">Private Sector</option>
                      <option value="public">Public / Government</option>
                      <option value="ngo">NGO / Social Org</option>
                      <option value="social-enterprise">Social Enterprise</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Part 2: Contact */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start border-t border-border pt-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users2 className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none">Point of Contact</h3>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Communication details for the designated project lead or representative.
                  </p>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Lead Name</label>
                    <input
                      name="contactName"
                      type="text"
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Official Email</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none shadow-sm"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Secure Phone</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Part 3: Requirement */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start border-t border-border pt-16">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter leading-none">Context</h3>
                  </div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">
                    Detailed specifications of the opportunity and expert requirements.
                  </p>
                </div>

                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Opportunity Type</label>
                      <select
                        name="opportunityType"
                        value={formData.opportunityType}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none appearance-none shadow-sm"
                      >
                        <option value="">Select Type</option>
                        <option value="internship">Internship</option>
                        <option value="full-time">Full-time Carrier</option>
                        <option value="project">Project Collaboration</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Resources Required</label>
                      <input
                        name="studentsWanted"
                        type="number"
                        value={formData.studentsWanted}
                        onChange={handleChange}
                        className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl px-8 py-5 text-sm font-bold transition-all outline-none shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.2em] ml-2">Technical Context / Requirements</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Elaborate on the project mission and expected deliverables..."
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-3xl px-8 py-6 text-sm font-bold transition-all outline-none resize-none shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center border-t border-border mt-16">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-emerald-500/10 text-emerald-600 px-10 py-5 rounded-2xl flex items-center gap-3 border border-emerald-500/20 shadow-xl shadow-emerald-500/10"
                    >
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-sm font-black uppercase tracking-widest">Submission Initialized</span>
                    </motion.div>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary hover:bg-primary/90 text-white px-20 py-10 text-2xl rounded-3xl shadow-2xl shadow-primary/30 flex items-center gap-4 transition-all hover:-translate-y-2 active:scale-95 group/btn relative overflow-hidden"
                    >
                      {isSubmitting ? (
                        <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                          <span className="font-black uppercase tracking-tighter">INITIALIZE PARTNERSHIP</span>
                          <Send className="w-6 h-6 group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                        </>
                      )}
                    </Button>
                  )}
                </AnimatePresence>
                <p className="mt-10 text-[10px] font-black uppercase text-muted-foreground/60 tracking-[0.3em]">
                  Secure Data Transmission Protocol Active
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PostYourOffer
