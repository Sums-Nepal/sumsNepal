import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components";

import { useHowItWorks } from "../../context/HowItWorksContext";

const ITEMS_PER_PAGE = 4;

const Upskill = () => {
  const { currentStateNum } = useHowItWorks();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Current visible cards
  const currentItems = useMemo(() => {
    return upskillData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  }, [currentIndex]);

  // Navigation functions
  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex + ITEMS_PER_PAGE < upskillData.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Upskill — Learn. Grow. Lead.
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
          Empower yourself with the latest industry skills, from coding to leadership.
          Our Upskill programs help you stay ahead in your career journey.
        </p>

        {/* Navigation buttons */}
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
            disabled={currentIndex + ITEMS_PER_PAGE >= upskillData.length}
            className={`px-4 sm:px-6 py-2 flex items-center ${
              currentIndex + ITEMS_PER_PAGE >= upskillData.length
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Upskill cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {currentItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group hover:transform hover:scale-105 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-24 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Upskill;


import { BookOpen, Code, Briefcase, Brain } from "lucide-react";

export const upskillData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Master React, Node.js, and MongoDB to build powerful web apps.",
    image: "/images/webdev.jpg",
    alt: "Web Development",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Data Science Bootcamp",
    description: "Learn Python, Pandas, and ML to extract insights from data.",
    image: "/images/data-science.jpg",
    alt: "Data Science",
    icon: Brain,
  },
  {
    id: 3,
    title: "Business Communication",
    description: "Improve your presentation, writing, and negotiation skills.",
    image: "/images/communication.jpg",
    alt: "Communication Skills",
    icon: Briefcase,
  },
  {
    id: 4,
    title: "Programming Logic Mastery",
    description: "Build a solid foundation in programming logic and problem-solving.",
    image: "/images/programming.jpg",
    alt: "Programming",
    icon: Code,
  },
  {
    id: 5,
    title: "AI & Machine Learning",
    description: "Dive deep into AI concepts with hands-on ML projects.",
    image: "/images/ai-ml.jpg",
    alt: "AI and ML",
    icon: Brain,
  },
];
