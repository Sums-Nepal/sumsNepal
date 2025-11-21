import { useState } from "react"

const interests = [
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "lms", label: "LMS - Learning Management System" },
  { id: "local-project", label: "Local Project" },
  { id: "international-project", label: "International Project" },
]

interface GeneralFormProps {
  visible: boolean
  onClose: () => void
}

export default function GeneralForm({ visible, onClose }: GeneralFormProps) {
  const [formData, setFormData] = useState({
    instituteName: "",
    email: "",
    message: "",
    interests: [] as string[],
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleInterestChange = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.interests.length === 0) {
      setError("Please select at least one area of interest.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const subject = encodeURIComponent(`Inquiry from ${formData.instituteName}`)
      const body = encodeURIComponent(
        `Institute Name: ${formData.instituteName}\nEmail: ${formData.email}\nInterests: ${formData.interests
          .map((i) => interests.find((x) => x.id === i)?.label)
          .join(", ")}\n\nMessage:\n${formData.message}`
      )

      window.location.href = `mailto:Info@sumsnepal.com?subject=${subject}&body=${body}`

      setSubmitted(true)
      setFormData({
        instituteName: "",
        email: "",
        message: "",
        interests: [],
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError("Failed to open mail client. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null // Controlled by parent

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-orange-500/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-orange-500 transition-colors"
        >
          ×
        </button>

        {/* Success/Error Messages */}
        {submitted && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 animate-in fade-in duration-300">
            <span className="font-semibold">✓ Success!</span> Your mail client opened. Please send your email.
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 animate-in fade-in duration-300">
            <span className="font-semibold">✕ Error:</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Institute Name *</label>
            <input
              type="text"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              required
              placeholder="Enter your institute name"
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-500/60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-500/60"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-4">
              Areas of Interest * <span className="text-xs text-gray-400">(Select at least one)</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interests.map((interest) => (
                <label
                  key={interest.id}
                  className="flex items-center p-3 bg-slate-700/30 border border-orange-500/20 rounded-lg cursor-pointer hover:bg-slate-700/50 hover:border-orange-500/40 transition-all duration-300 group"
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest.id)}
                    onChange={() => handleInterestChange(interest.id)}
                    className="w-4 h-4 rounded border-orange-500 bg-slate-600 accent-orange-500 cursor-pointer"
                  />
                  <span className="ml-3 text-white text-sm group-hover:text-orange-400 transition-colors">
                    {interest.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Tell us about your project, initiative, or inquiry..."
              rows={5}
              className="w-full px-4 py-3 bg-slate-700/50 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all duration-300 hover:border-orange-500/60"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || formData.interests.length === 0}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-400 mt-4 text-center">
          All fields marked with * are required
        </p>
      </div>
    </div>
  )
}
