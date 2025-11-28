import { useState, useRef } from "react"
import { Phone, Mail, Briefcase, ChevronLeft, ChevronRight } from "lucide-react"

export interface Employee {
  id: number
  name: string
  position: string
  contact: string
  department: string
  email: string
  image?: string
  images?: string[]   // multiple images
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const hasMultiple = employee.images && employee.images.length > 1
  const images = employee.images ?? (employee.image ? [employee.image] : [])

  const startX = useRef(0)

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX
    const diff = startX.current - endX

    if (diff > 50) {
      nextImage()
    } else if (diff < -50) {
      prevImage()
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-orange-500/30 transform hover:-translate-y-2 bg-gradient-to-r from-gray-50 to-orange-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium gradient bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      {/* Decorative blur */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-orange-500/10" />

      {/* IMAGE SECTION */}
      <div
        className="relative h-72 w-full overflow-hidden bg-slate-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image slider */}
        <div
          className="flex h-full w-full transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={`./images/${img}`}
              alt={employee.name}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Position badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
        >
          {employee.department}
        </div>

        {/* ARROWS — only if multiple images */}
        {hasMultiple && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Small dots indicator */}
        {hasMultiple && (
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentIndex ? "bg-orange-500" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {employee.name}
        </h3>

        <div className="flex items-start gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-semibold text-orange-500 leading-tight">
            {employee.position}
          </p>
        </div>

        <div
          className={`space-y-3 transition-all duration-300 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible h-0"
          }`}
        >
          <a
            href={`mailto:${employee.email}`}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all"
          >
            <Mail className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-foreground truncate font-medium">
              {employee.email}
            </span>
          </a>
        </div>

        {/* Mobile contact */}
        <div className="md:hidden mt-4 pt-4 border-t border-border space-y-2">
          <a
            href={`tel:${employee.contact}`}
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-semibold"
          >
            <Phone className="w-4 h-4" />
            {employee.contact}
          </a>
          <a
            href={`mailto:${employee.email}`}
            className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600 font-semibold truncate"
          >
            <Mail className="w-4 h-4" />
            {employee.email}
          </a>
        </div>
      </div>
    </div>
  )
}
