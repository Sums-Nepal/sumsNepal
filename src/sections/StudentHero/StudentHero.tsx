import { useEffect, useState } from "react";
import { Button } from "../../components";

const StudentHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = (offset: number) => {
    window.scrollBy({ top: offset, behavior: "smooth" });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/student-hero.jpeg"
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
                🚀 Transforming Education
              </p>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span className="text-white">Launch Your </span>
              <span className="italic font-serif text-orange-500">
                Career Now
              </span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
              Each student gets personalized career guidance, real-world
              projects, and direct connections to top employers. Build your
              network, build your future with our comprehensive career platform.
            </p>

            <Button
              onClick={() => handleScroll(700)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              START YOUR JOURNEY 🚀
            </Button>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { number: "5000+", label: "Students Placed" },
                { number: "500+", label: "Partner Companies" },
              ].map((stat, idx) => (
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

          <div
            className={`transform transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Career Guidance", icon: "📚" },
                { title: "Job Placements", icon: "💼" },
                { title: "Networking", icon: "🤝" },
                { title: "Skill Development", icon: "🎯" },
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

export default StudentHero;
