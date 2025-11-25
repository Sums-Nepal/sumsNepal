
import { useState } from "react"
import { Phone, Mail, Briefcase } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  contact: string
  department: string
  email: string
  image: string
}

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-orange-500/30 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium gradient background accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600" />

      {/* Decorative blur element */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-orange-500/10" />

      {/* Image Section with overlay */}
      <div className="relative h-72 w-full overflow-hidden bg-slate-100">
        <img
          src={`./images/${employee.image}`}
          alt={employee.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Position badge - appears on hover */}
        <div
          className={`absolute top-3 right-3 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
        >
          {employee.department}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        {/* Name and Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {employee.name}
        </h3>

        <div className="flex items-start gap-2 mb-4">
          <Briefcase className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm font-semibold text-orange-500 leading-tight">{employee.position}</p>
        </div>

        {/* Contact Info Section */}
        <div
          className={`space-y-3 transition-all duration-300 ${
            isHovered ? "opacity-100 visible" : "opacity-0 invisible h-0"
          }`}
        >
          {/* Phone */}
          {/* <a
            href={`tel:${employee.contact}`}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all group/link"
          >
            <Phone className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm text-foreground truncate font-medium">{employee.contact}</span>
          </a> */}

          {/* Email */}
          <a
            href={`mailto:${employee.email}`}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-orange-50 hover:bg-orange-100 transition-all group/link"
          >
            <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
            <span className="text-sm text-foreground truncate font-medium">{employee.email}</span>
          </a>
        </div>

        {/* Mobile contact display */}
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
