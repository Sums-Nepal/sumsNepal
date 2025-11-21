import React from 'react'
import { Button } from '../../components'
import { Briefcase, UserCheck, Zap } from 'lucide-react'

const HowWeSupport = () => {
  return (
<>
  {/* How We Support Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
              How <span className='text-orange-500'>We</span> Support
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive support services designed to help your organization
              thrive and make a lasting impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: UserCheck,
                title: "Hire Talent",
                description: "Skilled graduates, interns.",
                details:
                  "Access our pool of trained professionals ready to contribute to your organization.",
              },
              {
                icon: Briefcase,
                title: "Flexible Roles",
                description: "Freelancers, projects.",
                details:
                  "Choose from various engagement models that suit your organizational needs.",
              },
              {
                icon: Zap,
                title: "Co-create Training",
                description: "Upskill teams.",
                details:
                  "Work with us to design custom training programs for your workforce.",
              },
            ].map((support, index) => (
              <div
                key={index}
                className="group card"
              >
                <div className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <support.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    {support.title}
                  </h3>
                  <p className="text-sm font-medium text-orange-600">
                    {support.description}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-6 text-sm">
                    {support.details}
                  </p>
                  {/* <Button className="w-full group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 border-orange-200 text-orange-600 bg-transparent border">
                    Try Method
                  </Button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
</>
)
}

export default HowWeSupport