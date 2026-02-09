"use client"

import React, { useState } from "react"
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../../components"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    city: "",
    email: "",
    partnerInterest: "",
    message: "",
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.role) newErrors.role = "Role is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.partnerInterest)
      newErrors.partnerInterest = "Project type is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const subject = encodeURIComponent(`New City Contact: ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Role: ${formData.role}\n` +
      `City: ${formData.city}\n` +
      `Email: ${formData.email}\n` +
      `Project Type: ${formData.partnerInterest}\n` +
      `Message: ${formData.message}`
    )
    window.location.href = `mailto:connect@sumsnepal.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden" id="city-contact-form">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Connect with us
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-7xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            LET'S BUILD <span className="text-primary italic">YOUR CITY'S</span> FUTURE
          </motion.h2>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Share your vision, and we'll help make it reality. Our team of experts
            is ready to support your city's innovation journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] shadow-sm border border-border group transition-all duration-500 hover:shadow-2xl"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all ${errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                      }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all ${errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all appearance-none cursor-pointer ${errors.role
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                      }`}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="city-leader">City Leader</option>
                    <option value="innovator">Innovator</option>
                    <option value="citizen">Citizen</option>
                    <option value="business">Business Owner</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.role}</p>
                  )}
                </div>
                <div>
                  <input
                    name="city"
                    type="text"
                    placeholder="City Name"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all ${errors.city
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                      }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.city}</p>
                  )}
                </div>
              </div>

              <div>
                <select
                  name="partnerInterest"
                  value={formData.partnerInterest}
                  onChange={handleChange}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all appearance-none cursor-pointer ${errors.partnerInterest
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                    }`}
                >
                  <option value="" disabled>Select Project Type</option>
                  <option value="smart-mobility">Smart Mobility</option>
                  <option value="green-energy">Green Energy</option>
                  <option value="digital-health">Digital Healthcare</option>
                  <option value="education">Education & Skills</option>
                </select>
                {errors.partnerInterest && (
                  <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.partnerInterest}</p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Tell us about your city's vision..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-5 py-4 focus:ring-2 outline-none transition-all resize-none ${errors.message
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary focus:bg-white dark:focus:bg-slate-900"
                    }`}
                />
                {errors.message && (
                  <p className="text-red-500 text-[10px] font-bold uppercase mt-2 ml-2 tracking-widest">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 py-6 text-md font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:-translate-y-1 active:scale-95 group/btn"
              >
                Send Message
                <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-3xl font-black text-foreground uppercase tracking-tighter mb-8 italic">
                Get in <span className="text-primary italic">Touch</span>
              </h3>
              <div className="grid gap-6">
                {[
                  { icon: Mail, label: "Email Us", value: "info@sumsnepal.com" },
                  { icon: MapPin, label: "Location", value: "Lalitpur, Nepal" },
                  { icon: Phone, label: "Phone", value: "+977 9810446594" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 p-6 bg-white dark:bg-slate-900 border border-border rounded-3xl hover:border-primary/30 transition-all group">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-500 group-hover:rotate-6">
                      <item.icon className="w-7 h-7 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] overflow-hidden border border-border h-80 shadow-inner group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.748721759609!2d85.31295337536968!3d27.678734976199478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cd63bca247%3A0xc6df732958348d48!2sLalitpur%2C%20Nepal!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
