import React from 'react'
import { Button } from '../../components'
import { Building2, Handshake, UserCheck, Users } from 'lucide-react'

const OurProcess = () => {
  return (
    <>
    {/* Our Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
              Our <span className='text-orange-500'>Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A streamlined approach to connecting your organization with the
              right talent and collaboration opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Submit Offer",
                description:
                  "Tell us about your organization and what kind of talent or collaboration you need.",
                icon: Building2,
              },
              {
                step: "02",
                title: "Match Talent",
                description:
                  "Our team carefully matches your requirements with the most suitable candidates.",
                icon: UserCheck,
              },
              {
                step: "03",
                title: "Onboard",
                description:
                  "We facilitate smooth onboarding and integration of talent into your organization.",
                icon: Handshake,
              },
              {
                step: "04",
                title: "Support",
                description:
                  "Continuous support to ensure successful collaboration and achievement of goals.",
                icon: Users,
              },
            ].map((process, index) => (
              <div
                key={index}
                className="group card"
              >
                <div className="text-center pb-4">
                  <div className="absolute -top-4 left-6 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {process.step}
                  </div>
                  <div className="w-12 h-12 mx-auto rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mb-4 mt-4 group-hover:scale-105 transition-transform duration-300">
                    <process.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    {process.title}
                  </h3>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{process.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="text-center mt-12 flex justify-center item-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full">
              Start Now
            </Button>
          </div> */}
        </div>
      </section>

    </>
  )
}

export default OurProcess