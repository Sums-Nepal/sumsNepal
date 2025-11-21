import { Button } from "../../components";
import MockInterface from "./MockInterface";
import { showcaseData } from "./ShowCaseData";



export const PlatformShowcase = () => {
  return (
    <>
      {/* Platform Showcase Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {showcaseData.map((item) => (
              <div key={item.id} className="group">
                <div
                  className={`bg-gradient-to-br ${item.gradient} rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.label}
                    </span>
                  </div>

                  {/* Mock Interface */}
                  <MockInterface />

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-white/20 text-white px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    className={`bg-white ${item.buttonColor} hover:bg-gray-100 px-6 py-2 text-sm font-semibold w-full transition-all duration-200`}
                  >
                    {item.buttonText}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
