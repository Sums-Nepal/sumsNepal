import { ArrowRight, Clock, Target, Users } from "lucide-react";
import { Button } from "../../components";
import { Link } from "react-router-dom";

const Companies = () => {
  return (
    <>
      {/* For Companies Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <img
                src="./images/companies.jpg"
                alt="Team collaborating in office"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block px-3 sm:px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                FOR COMPANIES
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                <span className="text-orange-600">Hire Smart</span>
              </h2>

              <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                Access pre-vetted talent who have already proven their skills on
                real projects. Reduce hiring time and costs while getting
                innovative solutions that drive business growth.
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-800 text-base sm:text-lg">
                    Test talent on real work
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-800 text-base sm:text-lg">
                    Solve problems, innovate
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-800 text-base sm:text-lg">
                    Faster hiring, lower cost
                  </span>
                </div>
              </div>

              {/* Call to Action Button */}
              <Link to={'/business'}>
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
                Hire Talent
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Companies;
