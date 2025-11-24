import { ArrowRight, Rocket, Star } from "lucide-react";
import { Button, GeneralForm } from "../../components";
import { useState } from "react";

type StudentStory = {
  name: string;
  role: string;
  message: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  bgColor: string;
  rating: number;
  footer: string;
};

const stories: StudentStory[] = [
  {
    name: "Biku Shrestha",
    role: "Software Engineer",
    message:
      "SUMS helped me as a Software Engineering student to land my first job at a top tech company. The real projects and mentorship made all the difference.",

    image: "./images/hero_right.png",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-100",
    bgColor: "bg-blue-200",
    rating: 5,
    footer: "Graduated 2023",
  },
  {
    name: "Samriddhi Prajuli",
    role: "Data Analyst",
    message:
      "SUMS Academia-Industry Collaboration (AIC) helped me discover my passion for data analysis. Now I'm working with international companies analyzing market trends.",
    image: "./images/hero_right.png",
    gradientFrom: "from-green-50",
    gradientTo: "to-green-100",
    bgColor: "bg-green-200",
    rating: 4,
    footer: "Career Transition 2023",
  },
  {
    name: "Rajiv Shrestha",
    role: "Marketing Manager",
    message:
      "The startup incubator program helped me launch my own marketing agency. From student entrepreneur to successful business owner!",
    image: "./images/hero_right.png",
    gradientFrom: "from-purple-50",
    gradientTo: "to-purple-100",
    bgColor: "bg-purple-200",
    rating: 5,
    footer: "Startup Founder 2024",
  },
];

const StudentSuccessStories = () => {
  const [showtheGeneralForm, setShowtheGeneralForm] = useState(false);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Student <span className="text-orange-500">Success</span> Stories
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
          Real students, real achievements, real career transformations through
          our platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((student, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${student.gradientFrom} ${student.gradientTo} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <div className="flex flex-col items-center text-center">
                {/* <div
                  className={`w-20 h-20 ${student.bgColor} rounded-full mb-4 overflow-hidden`}
                >
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                </div> */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {student.name}
                </h3>
                <div
                  className={`font-semibold mb-4`}
                  style={{ color: student.gradientFrom.replace("from-", "") }}
                >
                  {student.role}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {student.message}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(student.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {student.footer}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-primary rounded-2xl p-8 text-center text-primary-foreground">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Rocket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Join Our Success Stories</h3>
            <p className="mb-6 opacity-90">
              Ready to be the next startup success? Join our acceleration
              program today.
            </p>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 w-full"
              onClick={() => setShowtheGeneralForm(true)}
            >
              Apply Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <GeneralForm
        visible={showtheGeneralForm}
        onClose={() => setShowtheGeneralForm(false)}
      />
    </section>
  );
};

export default StudentSuccessStories;
