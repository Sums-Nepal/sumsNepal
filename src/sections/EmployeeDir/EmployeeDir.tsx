import { useState } from "react"
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard"
import { Users, Search } from "lucide-react"

interface Employee {
  id: number
  name: string
  position: string
  contact: string
  department: string
  email: string
  image: string
}

const employees: Employee[] = [

  {
    id: 2,
    name: "Manish Jang Khadka",
    position: "Co-Founder & Chief Executive Officer",
    contact: "No details",
    department: "Executive",
    email: "manish.khadka@sumsnepal.com",
    image: "/manish-jang.jpg",
  },

  {
    id: 4,
    name: "Rajkumar Shrestha",
    position: "Co-Founder & Chief Technology Officer",
    contact: "+977 9800000003",
    department: "Executive",
    email: "rajkumar.shrestha@sumsnepal.com",
    image: "/rajkumar.jpg",
  },
  {
    id: 3,
    name: "Ujwal Dahal",
    position: "Co-Founder & Chief Operating Officer",
    contact: "+977 9800000002",
    department: "Executive",
    email: "ujwal.dahal@sumsnepal.com",
    image: "/ujwal.jpg",
  },
  {
    id: 6,
    name: "Biswash Giri",
    position: "DevOps Engineer",
    contact: "+977 9800000005",
    department: "Engineering",
    email: "biswash.giri@sumsnepal.com",
    image: "/biswash.jpg",
  },
    {
    id: 7,
    name: "Aayush Basnet",
    position: "Backend Engineer",
    contact: "+977 9800000005",
    department: "Engineering",
    email: "aayush.basnet@sumsnepal.com",
    image: "/aayush.jpg",
  },

  {
    id: 5,
    name: "Nabin Paudyal",
    position: "Frontend Developer",
    contact: "No details",
    department: "Engineering",
    email: "nabin.paudyal@sumsnepal.com",
    image: "/nabin.jpg",
  },

    {
    id: 1,
    name: "Saarock",
    position: "Junior Full-Stack Developer",
    contact: "+977 9800000000",
    department: "Engineering",
    email: "aayush.basnetjr@sumsnepal.com",
    image: "/saarock3.webp",
  },
]

export default function EmployeeDirectory() {
  const [selectedDept, setSelectedDept] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const departments = ["", ...new Set(employees.map((emp) => emp.department))]

  let filteredEmployees = selectedDept
    ? employees.filter((emp) => emp.department === selectedDept)
    : employees

  if (searchQuery) {
    filteredEmployees = filteredEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 px-4 py-16 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6">
            <Users className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-balance text-5xl sm:text-6xl font-bold text-foreground mb-4 leading-tight">
            Meet <span className="text-orange-500">Our Exceptional Team</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the talented professionals behind our company's success. Explore team members by department or search by name.
          </p>
        </div>

        {/* Search Bar */}
        {/* <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div> */}

        {/* Department Filter Pills */}
        {/* <div className="flex flex-wrap gap-3 justify-center">
          {departments.map((dept) => (
            <button
              key={dept || "all"}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedDept === dept
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 scale-105"
                  : "bg-white text-foreground border-2 border-border hover:border-orange-500/50 hover:text-orange-600"
              }`}
            >
              {dept || "All"}
            </button>
          ))}
        </div> */}
      </div>

      {/* Employee Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredEmployees.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
              <Search className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-lg text-muted-foreground">No team members found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">{employees.length}</div>
            <p className="text-sm text-muted-foreground">Team Members</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-500 mb-2">{departments.length - 1}</div>
            <p className="text-sm text-muted-foreground">Departments</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-4xl font-bold text-orange-500 mb-2">100%</div>
            <p className="text-sm text-muted-foreground">Passionate</p>
          </div>
        </div>
      </div>
    </div>
  )
}
