import React from "react";
import { Button } from "../../components";
import { ArrowRight, Clock, Target, Users } from "lucide-react";

const Innovation = () => {
  return (
    <>
      {/* For Companies Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6  bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="flex justify-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            🇫🇮 Finnish <span className="text-orange-500">Innovation</span> at
            Our <span className="text-orange-500"> Core</span>
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <img
                src="./images/innovation.jpeg"
                alt="Team collaborating in office"
                className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 text-center lg:text-left">
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                Experience the power of Finnish education with our interactive
                learning ecosystem. Co-developed with Finnish experts, our
                platform merges renowned Finnish pedagogy and technology.
                Cogknit, our intuitive innovative platform and Learning
                Management System, offers:
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700 text-base sm:text-lg">
                    Engaging resources for training and content.
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700 text-base sm:text-lg">
                    Curriculum-aligned multidisciplinary projects.
                  </span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 flex-shrink-0" />
                  <span className="text-gray-700 text-base sm:text-lg">
                    A unique approach inspired by Finland's innovation.
                  </span>
                </div>
              </div>

              {/* Success Story */}
              {/* <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8">
                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="font-semibold text-green-600">eCommX:</span>{" "}
                  We empower learners to develop essential skills for career
                  advancement and entrepreneurship, equipping them for success
                  in today's dynamic world.
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Innovation;
