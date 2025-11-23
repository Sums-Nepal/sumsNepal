import { useEffect, useState } from "react";
import { Button } from "../../components";

export const CityHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = (id: string) => {
    if (id === "1") {
      const element = document.getElementById("city-need-sums");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth", // Smooth scroll
          block: "start", // Align to the top of the container
        });
      }
    } else if (id === "2") {
      const element = document.getElementById("city-contact-form");
      if (element) {
        element.scrollIntoView({
          behavior: "smooth", // Smooth scroll
          block: "start", // Align to the top of the container
        });
      }
    }
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/city-hero.jpeg"
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
                🌆 Empowering Cities
              </p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-orange-500">Transform Your City</span>
              <br />
              <span className="italic font-serif text-white">
                Into an Innovation Hub
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Retain talent, create jobs, and solve local challenges with
              innovation-driven initiatives powered by collaboration and smart
              solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => handleScroll("1")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
              >
                See How It Works
              </Button>
              <Button
                onClick={() => handleScroll("2")}
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 text-lg font-semibold rounded-lg border border-slate-700 hover:border-orange-500/30 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>

            {/* <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { number: "50+", label: "Cities Connected" },
                { number: "10K+", label: "Jobs Created" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`transform transition-all duration-1000 delay-${(idx + 1) * 200} ${isVisible ? "opacity-100" : "opacity-0"}`}
                >
                  <p className="text-3xl font-bold text-orange-500">{stat.number}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div> */}
          </div>

          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Infrastructure", icon: "🏗️" },
                { title: "Technology", icon: "💻" },
                { title: "Talent Pool", icon: "👥" },
                { title: "Investment", icon: "💰" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-orange-500/20 bg-slate-800/30 hover:border-orange-500/50 hover:bg-slate-800/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group cursor-pointer"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="text-gray-300 font-medium text-sm">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
