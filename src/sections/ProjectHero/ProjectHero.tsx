import { ArrowRight } from "lucide-react";
import { Button } from "../../components";

const ProjectHero = () => {
  return (
    <>
      {/* Project Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 py-8 lg:py-0 ">
        {/* Left Content */}
        <div className="flex-1 lg:ml-8 max-w-2xl text-center lg:text-left mb-8 lg:mb-0">
          <div className="inline-block px-3 sm:px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            💡 Project Innovation Hub
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
            <span className="text-orange-500">Transforming</span> Ideas,
            <br />
            <span className="text-orange-500">Shaping</span> the Future,
            <br />
            <span className="text-orange-500">Building</span> Reality
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
            Explore our collection of groundbreaking project ideas ready for
            development. Each concept has been carefully researched and designed
            to solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
              Explore Projects
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* <Button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 sm:px-8 py-3 text-base sm:text-lg transition-all duration-200 bg-transparent w-full sm:w-auto">
              Learn More
            </Button> */}
          </div>
        </div>

        {/* Right Side Image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-[600px] mx-auto lg:mx-0">
          <div className="relative">
            <img
              src="/images/projects_hero.png"
              alt="Innovation projects workspace"
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute top-4 sm:top-8 right-4 sm:right-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
              <div className="text-lg sm:text-2xl font-bold text-orange-500">
                150+
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                Innovative Projects
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectHero;
