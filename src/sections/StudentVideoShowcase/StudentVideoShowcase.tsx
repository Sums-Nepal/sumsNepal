import React, { useCallback, useState } from "react";
import { Button, GeneralForm } from "../../components";
import {
  Briefcase,
  Building2,
  CheckCircle,
  Lightbulb,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlights: { title: string; subtitle: string; icon?: React.ReactNode }[];
  buttonText: string;
};

const features: Feature[] = [
  {
    id: "live-projects",
    title: "Live Projects",
    description:
      "Work on real challenges from top companies. Build your portfolio while solving problems that matter.",
    icon: <Target className="w-8 h-8 text-white" />,
    highlights: [
      {
        title: "Real-World Experience",
        subtitle: "Work on actual business challenges",
        icon: (
          <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        ),
      },
      {
        title: "Expert Mentorship",
        subtitle: "Get guidance from industry professionals",
        icon: (
          <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        ),
      },
      {
        title: "Portfolio Building",
        subtitle: "Create impressive project showcases",
        icon: (
          <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        ),
      },
    ],
    buttonText: "Apply",
  },
  {
    id: "startup-spark",
    title: "Startup Spark",
    description:
      "Turn your ideas into reality. Get funding, mentorship, and support to launch your startup journey.",
    icon: <Lightbulb className="w-8 h-8 text-white" />,
    highlights: [
      {
        title: "Idea Validation",
        subtitle: "Test and refine your business concept",
        icon: (
          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
            1
          </span>
        ),
      },
      {
        title: "Expert Mentors",
        subtitle: "Connect with successful entrepreneurs",
        icon: (
          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
            2
          </span>
        ),
      },
      {
        title: "Funding Support",
        subtitle: "Access to investors and funding opportunities",
        icon: (
          <span className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
            3
          </span>
        ),
      },
    ],
    buttonText: "Start Your Startup",
  },
  {
    id: "internships",
    title: "Internships",
    description:
      "Get placed with top industry companies. From tech startups to major corporations, finding perfect internships.",
    icon: <Briefcase className="w-8 h-8 text-white" />,
    highlights: [
      {
        title: "Top Companies",
        subtitle: "",
        icon: <Building2 className="w-5 h-5 text-orange-500 flex-shrink-0" />,
      },
      {
        title: "Mentorship Programs",
        subtitle: "",
        icon: <Users className="w-5 h-5 text-orange-500 flex-shrink-0" />,
      },
      {
        title: "Skill Development",
        subtitle: "",
        icon: <Target className="w-5 h-5 text-orange-500 flex-shrink-0" />,
      },
      {
        title: "Career Growth",
        subtitle: "",
        icon: <TrendingUp className="w-5 h-5 text-orange-500 flex-shrink-0" />,
      },
    ],
    buttonText: "Comming soon...",
  },
  {
    id: "skill-scanner",
    title: "Skill Scanner",
    description:
      "Discover your career path with AI-powered assessments. Get personalized roadmaps and skill recommendations.",
    icon: <Search className="w-8 h-8 text-white" />,
    highlights: [
      { title: "Personal skill profile", subtitle: "" },
      { title: "Career recommendations", subtitle: "" },
      { title: "Learning pathways", subtitle: "" },
      { title: "Job market trends", subtitle: "" },
    ],
    buttonText: "Comming soon...",
  },
];

const StudentMainFeatures = () => {
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false);

  const navigate = useNavigate();

  const actOnAction = useCallback((btnInnerText: string) => {
    if (btnInnerText === "Start Your Startup") {
      navigate("/entrepreneurship");
    } else if (btnInnerText === "Apply") {
        setIsOpenGeneralForm(true);

    }
  }, []);



  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-gray-50 to-orange-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {features.map((feature, index) => (
          <div key={feature.id} className="card gropu">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
              {feature.description}
            </p>

            <div className="space-y-4 mb-6">
              {feature.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  {highlight.icon || (
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {highlight.title}
                    </div>
                    {highlight.subtitle && (
                      <div className="text-sm text-gray-600">
                        {highlight.subtitle}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {index === features.length - 1 && index === 2 ? (
              <Button
                className="bg-gradient-to-r from-orange-400 to-orange-400 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                {feature.buttonText}
              </Button>
            ) : (
              <Button
                onClick={() => actOnAction(feature.buttonText)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                {feature.buttonText}
              </Button>
            )}
          </div>
        ))}
      </div>
      {
        <GeneralForm
          visible={isOpenGeneralForm}
          onClose={() => setIsOpenGeneralForm(false)}
        />
      }
    </section>
  );
};

export default StudentMainFeatures;
