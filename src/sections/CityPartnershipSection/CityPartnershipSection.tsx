import { Search, GraduationCap, Briefcase, Rocket } from "lucide-react"
import { Button } from "../../components"
// import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Skill Gap Analysis",
    description: "Map your city's talent landscape. Identify skill gaps and growth opportunities.",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Project-Based Learning",
    description: "Connect students with real-world projects. Build practical skills through hands-on experience.",
  },
  {
    number: "03",
    icon: Briefcase,
    title: "Internships & Jobs",
    description: "Create direct pathways from education to employment. Match talent with local opportunities.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Startup Support",
    description: "Incubate innovative startups that address local challenges and create new opportunities.",
  },
]

export function CityPartnershipSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">How <span className="text-orange-500">We</span> Partner</h2>

        <div className="grid md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.number} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-4xl font-bold text-orange-500/30">{step.number}</span>
              </div>

              <h3 className="text-xl font-bold">{step.title}</h3>

              <p className="text-gray-300 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="text-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
            View Case Studies
          </Button>
        </div> */}
      </div>
    </section>
  )
}
