import { useState } from "react";
import { Button, GeneralForm } from "../../components";

const images = [
  {
    src: "./images/make-you-grow.jpeg",
    alt: "Professional working",
  },
  {
    src: "./images/hero_right.png",
    alt: "Student learning",
    extraClass: "sm:mt-9", // optional extra class for spacing
  },
];

const content = {
  title: [
    { text: "Make you grow,", gradient: "from-gray-900 to-gray-700" },
    { text: "together", gradient: "from-orange-500 to-red-500" },
  ],
  paragraphs: [
    "Our service is learning & social cognitive education is a collaborative process where individuals learn from each other through observation, discussion, and shared experiences.",
    "Some key principles of social cognitive learning include observing and modeling the behavior of others, learning through social interaction and collaboration.",
    "Receiving feedback and reinforcement from peers and instructors, and developing critical thinking and problem-solving skills through group activities and discussions.",
    "With a team of 50+ Social Cognitive Experts from Nepal and academia's foremost authorities, we bring the best of both worlds to our students.",
  ],
  buttonText: "Stay in touch",
};

const AcademiaGrow = () => {

    const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false);
  
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-orange-50 via-white to-red-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-200/30 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {images.map((img, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 
                    ${
                  img.extraClass ?? ""
                }`}
              >
                <div className="aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full h-full object-cover`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {content.title.map((line, idx) => (
                <span
                  key={idx}
                  className={`bg-gradient-to-r ${line.gradient} bg-clip-text text-transparent block`}
                >
                  {line.text}
                </span>
              ))}
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              {content.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <Button onClick={() => setIsOpenGeneralForm(true)} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto">
              <span className="relative z-10">{content.buttonText}</span>
              {/* <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 z-" /> */}
            </Button>
          </div>
        </div>
      </div>

      <GeneralForm visible={isOpenGeneralForm} onClose={() => setIsOpenGeneralForm(false)}/>
    </section>
  );
};

export default AcademiaGrow;
