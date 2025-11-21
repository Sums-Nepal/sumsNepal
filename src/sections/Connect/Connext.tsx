import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components";

import { useHowItWorks } from "../../context/HowItWorksContext";

const ITEMS_PER_PAGE = 4;

const Connect = () => {
  const { currentStateNum } = useHowItWorks();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItems = useMemo(() => {
    return connectData.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
  }, [currentIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex + ITEMS_PER_PAGE < connectData.length) {
      setCurrentIndex(currentIndex + ITEMS_PER_PAGE);
    }
  }, [currentIndex]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Connect — Mentors, Projects & Opportunities
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
          Bridge the gap between learning and the real world. Connect with mentors,
          explore projects, and grow through collaboration.
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
            disabled={currentIndex + ITEMS_PER_PAGE >= connectData.length}
            className={`px-4 sm:px-6 py-2 flex items-center ${
              currentIndex + ITEMS_PER_PAGE >= connectData.length
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Cards Grid */}
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

export default Connect;

import { Users, Briefcase, Network, Handshake } from "lucide-react";

export const connectData = [
  {
    id: 1,
    title: "Find Your Mentor",
    description:
      "Connect with industry experts who guide you through real-world learning experiences.",
    image: "/images/mentor.jpg",
    alt: "Mentor",
    icon: Users,
  },
  {
    id: 2,
    title: "Collaborate on Projects",
    description:
      "Work with like-minded peers on projects that simulate real industry challenges.",
    image: "/images/projects.jpg",
    alt: "Projects",
    icon: Network,
  },
  {
    id: 3,
    title: "Internship Pathway",
    description:
      "Gain practical experience by joining internship programs via our platform.",
    image: "/images/internship.jpg",
    alt: "Internship",
    icon: Briefcase,
  },
  {
    id: 4,
    title: "Networking Events",
    description:
      "Join live sessions and online meetups to build your professional network.",
    image: "/images/networking.jpg",
    alt: "Networking",
    icon: Handshake,
  },
  {
    id: 5,
    title: "Startup Collaboration",
    description:
      "Pitch your ideas or join startups looking for tech talent and innovation.",
    image: "/images/startup.jpg",
    alt: "Startup Collaboration",
    icon: Briefcase,
  },
];
