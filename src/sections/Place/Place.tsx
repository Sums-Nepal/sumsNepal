import { useCallback, useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components";
import { placeData } from "./placeData"; // You should have a 'PlaceData' similar to other data files
import { useHowItWorks } from "../../context/HowItWorksContext";

const ITEMS_PER_PAGE = 4; // number of cards per page

const Place = () => {
  const { currentStateNum } = useHowItWorks();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current slice of data for the cards
  const currentItems = useMemo(() => {
    return placeData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex + ITEMS_PER_PAGE < placeData.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Place - Jobs via CareerSync
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
          Empowering students to find career opportunities through CareerSync, connecting talent to employers.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mb-8 sm:mb-12">
          <Button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 sm:px-6 py-2 flex items-center ${
              currentIndex === 0
                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentIndex + ITEMS_PER_PAGE >= placeData.length}
            className={`px-4 sm:px-6 py-2 flex items-center ${
              currentIndex + ITEMS_PER_PAGE >= placeData.length
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
           
          {currentItems.map((job:any) => {
            const Icon = job.icon;
            return (
              <div
                key={job.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <img
                  src={job.image}
                  alt={job.alt}
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 text-sm">{job.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Place;
