import { Link } from "react-router-dom";
import { Button } from "../../components";
import { ArrowRight, CheckCircle } from "lucide-react";

const Colleges = () => {
  const benefits = [
    "Industry-linked internships & live projects",
    "Future-ready flexible courses",
    "Faculty development & global exposure",
    "Enhanced student enrollment & institutional growth",
    "Prepare career-ready students for employment, entrepreneurship, and further studies.",
  ];

  return (
    <>
      {/* For Colleges Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 sm:px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                FOR COLLEGES
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                More Placements,{" "}
                <span className="text-orange-600">Stronger Reputation</span>
              </h2>

              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                Transform your institution into a powerhouse of industry-ready
                graduates with our comprehensive partnership program.
              </p>

              {/* Dynamic Benefits List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {benefits.map((benefit, index) => (
                  <div
                    className="flex items-center gap-3 justify-center lg:justify-start"
                    key={index}
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                    <span className="text-gray-700 text-base sm:text-lg">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Explore Button */}
              <Link to="/academia">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
                  Explore Now
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none order-first lg:order-last">
              <img
                src="./images/colleges.jpg"
                alt="Students in modern classroom"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Colleges;
