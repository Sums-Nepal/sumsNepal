import { Building2, Globe, Handshake, Heart, Users } from "lucide-react";
import React from "react";

const WhoCanJoin = () => {
  return (
    <>
      {/* Who Can Join Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
              Who <span className="text-orange-500">can</span> Join
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              SUMS welcomes diverse organizations to create a thriving ecosystem
              of collaboration and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Building2,
                title: "Private",
                description: "Start-ups, SMEs, enterprises.",
                bgColor: "bg-orange-0",
                iconColor: "bg-orange-200 text-orange-700",
              },
              {
                icon: Globe,
                title: "Public",
                description: "Government, municipalities.",
                bgColor: "bg-orange-0",
                iconColor: "bg-orange-200 text-orange-700",
              },
              {
                icon: Heart,
                title: "NGOs",
                description: "Local, global development.",
                bgColor: "bg-orange-0",
                iconColor: "bg-orange-200 text-orange-700",
              },
              {
                icon: Handshake,
                title: "Social Enterprises",
                description: "Purpose-driven.",
                bgColor: "bg-orange-0",
                iconColor: "bg-orange-200 text-orange-700",
              },
              {
                icon: Users,
                title: "Associations",
                description: "Chambers, cooperatives.",
                bgColor: "bg-orange-0",
                iconColor: "bg-orange-200 text-orange-700",
              },
            ].map((org, index) => (
              <div
                key={index}
                className={`group card`}
              >
                <div className="text-center pb-4">
                  <div
                    className={`w-12 h-12 mx-auto rounded-lg ${org.iconColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                  >
                    <org.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-black">{org.title}</h3>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">{org.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoCanJoin;
