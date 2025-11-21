"use client";
import { useEffect, useState } from "react";
import { Rocket } from "lucide-react";
import { Button, GeneralForm } from "../../components";

const EntrepreneurshipHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/enter-hero.jpeg"
          alt="Background"
        />
        {/* Optional dark overlay to further enhance text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
              <p className="text-orange-400 text-sm font-medium">
                🚀 Startup Acceleration
              </p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-white">Launch Your </span>
              <span className="block text-orange-500">Startup Journey</span>
              <span className="italic font-serif text-white">with SUMS</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Incubation program designed to turn startup dreams into thriving
              businesses. Get mentorship, funding, and connections to succeed.
            </p>

            <Button
              onClick={() => setIsOpenGeneralForm(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-2"
            >
              <Rocket size={20} />
              Start Your Journey
            </Button>

            <div className="mt-12 pt-8 border-t border-orange-500/20">
              <p className="text-2xl font-bold text-orange-500 mb-2">100+</p>
              <p className="text-gray-400">Startups Accelerated</p>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="space-y-4">
              {[
                {
                  title: "Mentorship",
                  desc: "Expert guidance from industry leaders",
                },
                {
                  title: "Funding",
                  desc: "Access to seed and venture capital",
                },
                {
                  title: "Network",
                  desc: "Connect with investors and partners",
                },
                {
                  title: "Resources",
                  desc: "Tools and infrastructure support",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border border-orange-500/20 bg-slate-800/30 hover:border-orange-500/50 hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer transform hover:scale-105`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <p className="text-orange-400 font-semibold group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GeneralForm
        visible={isOpenGeneralForm}
        onClose={() => setIsOpenGeneralForm(false)}
      />
    </section>
  );
};

export default EntrepreneurshipHero;
