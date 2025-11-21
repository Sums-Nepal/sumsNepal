import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components";

const MainHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      {/* Animated Background Grid */}
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/home-hero-section.jpeg"
          alt="Background"
        />
        {/* Optional dark overlay to further enhance text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content Container */}
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
                🚀 Transforming Education
              </p>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              <span className="text-white">Transforming</span>
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Education
              </span>
              <br />
              <span className="text-white italic font-serif">
                Through Innovation
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              SUMS bridges academia and industry to build future-ready learners
              through a digital ecosystem powered by Finnish innovation and
              global collaboration.
            </p>

            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-2">
              Get Started
              <ArrowRight size={20} />
            </Button>
          </div>

          {/* Right - Integration Grid */}
          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Academia", icon: "🎓" },
                { title: "Industry", icon: "🏢" },
                { title: "Innovation", icon: "💡" },
                { title: "Collaboration", icon: "🤝" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-orange-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:border-orange-500/50 hover:bg-gradient-to-br hover:from-slate-800 hover:to-slate-900 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group cursor-pointer"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="text-gray-200 font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainHero;
