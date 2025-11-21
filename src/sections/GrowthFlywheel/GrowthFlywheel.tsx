import React from "react";

const flywheelNodes = [
  {
    title: "Better",
    subtitle: "Outcomes",
    position: { top: "top-4", left: "left-1/2", translateX: "-translate-x-1/2" },
  },
  {
    title: "Industry",
    subtitle: "Ties",
    position: { top: "top-16", right: "right-4" },
  },
  {
    title: "Enhanced",
    subtitle: "Reputation",
    position: { bottom: "bottom-16", right: "right-4" },
  },
  {
    title: "More",
    subtitle: "Resources",
    position: { bottom: "bottom-4", left: "left-1/2", translateX: "-translate-x-1/2" },
  },
  {
    title: "Continuous",
    subtitle: "Growth",
    position: { bottom: "bottom-16", left: "left-4" },
  },
  {
    title: "Student",
    subtitle: "Success",
    position: { top: "top-16", left: "left-4" },
  },
];

const GrowthFlywheel = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-green-50 via-white to-teal-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-green-200/30 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Academic <span className="text-orange-500">Institutional Growth</span> Flywheel
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Partnering with SUMS
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Initiates a powerful, self-reinforcing cycle of institutional growth.
            </p>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                Better academic outcomes for the modern workforce
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                Stronger industry ties and partnerships
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                Enhanced reputation and credibility
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                Increased talent and resources for continued development
              </li>
              <li className="flex items-start">
                <span className="text-orange-500 mr-3 mt-1">•</span>
                This creates a positive feedback loop that drives continuous improvement and sustainable growth
              </li>
            </ul>
          </div>

          {/* Right side - Flywheel diagram */}
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Central SUMS circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg z-10">
                <div className="text-center text-white font-bold text-sm">
                  SUMS
                  <div className="text-xs">NEPAL</div>
                </div>
              </div>

              {/* Flywheel elements */}
              {flywheelNodes.map((node, index) => (
                <div
                  key={index}
                  className={`absolute w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-orange-200 
                  ${node.position.top ?? ""} ${node.position.bottom ?? ""} 
                  ${node.position.left ?? ""} ${node.position.right ?? ""} 
                  ${node.position.translateX ?? ""}`}
                >
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-700">{node.title}</div>
                    <div className="text-xs font-semibold text-gray-700">{node.subtitle}</div>
                  </div>
                </div>
              ))}

              {/* Connecting circle */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <circle
                  cx="160"
                  cy="160"
                  r="120"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthFlywheel;
