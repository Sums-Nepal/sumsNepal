"use client"

import { useState } from "react"

const projects = [
  {
    title: "Smart Waste & Mobility",
    description:
      "Develop smart traffic infrastructure and intelligent traffic management applications for efficient urban navigation.",
    image: "images/modern-glass-office-buildings-urban-architecture.jpg",
  },
  {
    title: "Green Energy Initiative",
    description:
      "Implement renewable energy solutions and smart grid technology to create sustainable urban environments.",
    image: "images/solar-panels-green-energy-sustainable-city.jpg",
  },
  {
    title: "Digital Healthcare Hub",
    description: "Build connected healthcare infrastructure with telemedicine and AI-powered diagnostic systems.",
    image: "images/modern-hospital-healthcare-technology.jpg",
  },
]

export function FeaturedProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-64">
              <img
                src={projects[activeIndex].image || "images/placeholder.svg"}
                alt={projects[activeIndex].title}
                // fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-3">{projects[activeIndex].title}</h3>
              <p className="text-gray-600 leading-relaxed">{projects[activeIndex].description}</p>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-orange-500" : "bg-gray-300"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
