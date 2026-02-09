"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EmployeeCard, { type Employee } from "../../components/EmployeeCard/EmployeeCard"
import { Users, Search, Sparkles, Filter } from "lucide-react"

const employees: Employee[] = [
  {
    id: 2,
    name: "Manish Jang Khadka",
    position: "Co-Founder & Chief Executive Officer",
    contact: "No details",
    department: "Executive",
    email: "manish.khadka@sumsnepal.com",
    image: "manish-jang.jpg",
  },
  {
    id: 4,
    name: "Rajkumar Shrestha",
    position: "Co-Founder & Chief Technology Officer",
    contact: "+977 9800000003",
    department: "Executive",
    email: "rajkumar.shrestha@sumsnepal.com",
    image: "rajkumar.jpg",
  },
  {
    id: 3,
    name: "Ujwal Dahal",
    position: "Co-Founder & Chief Operating Officer",
    contact: "+977 9800000002",
    department: "Executive",
    email: "ujwal.dahal@sumsnepal.com",
    image: "ujwal.jpg",
  },
  {
    id: 6,
    name: "Biswash Giri",
    position: "DevOps Engineer",
    contact: "+977 9800000005",
    department: "Engineering",
    email: "biswash.giri@sumsnepal.com",
    image: "biswash.jpg",
  },
  {
    id: 7,
    name: "Aayush Basnet",
    position: "Backend Engineer",
    contact: "+977 9800000005",
    department: "Engineering",
    email: "aayush.basnet@sumsnepal.com",
    image: "aayush.jpg",
  },
  {
    id: 5,
    name: "Nabin Paudyal",
    position: "Frontend Developer",
    contact: "No details",
    department: "Engineering",
    email: "nabin.paudyal@sumsnepal.com",
    image: "nabin.jpg",
  },
  {
    id: 1,
    name: "Saarock",
    position: "Full-Stack Developer",
    contact: "+977 9800000000",
    department: "Engineering",
    email: "aayush.basnetjr@sumsnepal.com",
    image: "saarock1.webp",
  },
]

export default function EmployeeDirectory() {
  const [selectedDept, setSelectedDept] = useState<string>("All")
  const departments = ["All", ...new Set(employees.map((emp) => emp.department))]

  const filteredEmployees = selectedDept === "All"
    ? employees
    : employees.filter((emp) => emp.department === selectedDept)

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 py-24 sm:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            Human capital
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-8xl font-black text-foreground tracking-tighter uppercase mb-6 leading-[0.9]"
          >
            MEET OUR <span className="text-primary italic">EXCEPTIONAL</span> TEAM
          </motion.h1>
          <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            The visionary minds and technical wizards driving innovation across Nepal.
            Bridging academia and industry through collective excellence.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col items-center gap-6 mb-20">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">
            <Filter className="w-3 h-3" />
            Filter by Department
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 relative overflow-hidden ${selectedDept === dept
                  ? "text-white shadow-xl shadow-primary/20"
                  : "text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-border hover:border-primary/30"
                  }`}
              >
                <AnimatePresence>
                  {selectedDept === dept && (
                    <motion.div
                      layoutId="deptFilter"
                      className="absolute inset-0 bg-primary -z-10"
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </AnimatePresence>
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Employee Grid */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDept}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
            >
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Section - Premium Redesign */}
        <div className="max-w-4xl mx-auto mt-32 p-12 bg-white dark:bg-slate-900 rounded-[3rem] border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 relative z-10">
            <div className="text-center">
              <div className="text-5xl font-black text-primary tracking-tighter mb-2">{employees.length}</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visionaries</p>
            </div>
            <div className="text-center border-l md:border-x border-border">
              <div className="text-5xl font-black text-primary tracking-tighter mb-2">{departments.length - 1}</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Expert Domains</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1 border-t md:border-t-0 border-border pt-8 md:pt-0">
              <div className="text-5xl font-black text-primary tracking-tighter mb-2">100%</div>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Impact Driven</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
