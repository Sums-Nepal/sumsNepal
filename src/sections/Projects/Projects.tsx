import { Calendar, DollarSign, Users } from 'lucide-react'
import React from 'react'
import { Button } from '../../components'

const Projects = () => {
  return (
    <>
     {/* Project Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "EcoTrack",
                category: "Sustainability",
                description:
                  "A comprehensive carbon footprint tracking app that helps individuals and businesses reduce their environmental impact.",
                image: "/green-sustainability-app-interface.png",
                founders: 4,
                months: 6,
                funding: "Seed",
                tags: ["Environment", "Mobile App"],
                status: "Active",
              },
              {
                title: "HeatSync",
                category: "Technology",
                description:
                  "An AI-powered thermal management system that provides real-time monitoring, smart tracking, and enhanced efficiency.",
                image: "/ai-thermal-management-dashboard.png",
                founders: 3,
                months: 8,
                funding: "Series A",
                tags: ["AI", "IoT", "Hardware"],
                status: "Scaling",
              },
              {
                title: "Bellscape",
                category: "Design",
                description:
                  "A next-gen learning platform that increases engagement through gamification and personalized learning paths.",
                image: "/modern-learning-platform.png",
                founders: 5,
                months: 4,
                funding: "Pre-seed",
                tags: ["EdTech", "Gamification"],
                status: "Development",
              },
              {
                title: "AgriTech",
                category: "Agriculture",
                description:
                  "Precision farming solutions that uses sensors, data analytics, and AI to optimize crop yields and reduce waste.",
                image: "/smart-farming-technology-dashboard.png",
                founders: 6,
                months: 12,
                funding: "Series B",
                tags: ["Agriculture", "IoT", "Analytics"],
                status: "Mature",
              },
              {
                title: "Clean Glow",
                category: "Energy",
                description:
                  "Innovative solar energy solutions that aggregates clean energy from multiple sources for residential use.",
                image: "/clean-energy-solar-panel-system.png",
                founders: 3,
                months: 10,
                funding: "Seed",
                tags: ["Clean Energy", "Solar"],
                status: "Growth",
              },
              {
                title: "Hardware Tech",
                category: "Hardware",
                description:
                  "Precision hardware learning platform that increases manufacturing efficiency through real-time monitoring.",
                image: "/precision-hardware.png",
                founders: 4,
                months: 14,
                funding: "Series A",
                tags: ["Hardware", "Manufacturing"],
                status: "Scaling",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{project.title}</h3>
                      <p className="text-sm text-accent font-medium">{project.category}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{project.founders} founders</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{project.months} months</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{project.funding}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 border-primary text-primary bg-transparent border">
                    Learn More →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}

export default Projects