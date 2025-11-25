"use client";
import { useEffect, useState } from "react";
import { Button, GeneralForm } from "../../components";

const BusinessHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      {/* Animated background */}
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/business-hero.jpeg"
          alt="Background"
        />
        {/* Optional dark overlay to further enhance text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
              <p className="text-orange-400 text-sm font-medium">
                🤝 Building Business Ecosystem
              </p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="block text-orange-500 mb-2">Connect.</span>
              <span className="block text-orange-500 mb-2">Collaborate.</span>
              <span className="italic font-serif text-white">Co-create.</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              SUMS invites organizations, private companies, NGOs, and social
              enterprises to collaborate and build workforce innovation
              together.
            </p>

            <Button
              onClick={() => {
                const element = document.getElementById("business-page-form");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth", // Smooth scroll
                    block: "start", // Align to the top of the container
                  });
                }
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              Join Ecosystem
            </Button>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-6">
              {[{ number: "70+", label: "Organizations" }].map((stat, idx) => (
                <div
                  key={idx}
                  className={`transform transition-all duration-1000 delay-${
                    (idx + 1) * 200
                  } ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  <p className="text-3xl font-bold text-orange-500">
                    {stat.number}
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Integration Grid */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              {["HR Systems", "Finance", "Operations", "Analytics"].map(
                (item, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border border-orange-500/20 bg-slate-800/30 hover:border-orange-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 animate-fadeIn`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <p className="text-gray-300 text-sm font-medium text-center">
                      {item}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* <GeneralForm visible={isOpenGeneralForm} onClose={() => setIsOpenGeneralForm(false)}/> */}
    </section>
  );
};

export default BusinessHero;
