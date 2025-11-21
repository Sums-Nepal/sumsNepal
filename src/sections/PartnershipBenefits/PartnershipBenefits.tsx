import { Award, Building2, Lightbulb } from "lucide-react";

const benefitsData = [
  {
    title: "Strengthen Industry-Academia Linkages",
    icon: <Building2 className="w-6 h-6 text-white" />,
    gradient: "from-orange-500 to-orange-600",
    borderColor: "border-orange-100",
    hoverColor: "group-hover:text-orange-600",
    bullets: [
      "More Aligned Placement-Linked Curricula To Embed Industry Practices In Academic Programs",
      "Faculty Exchange With Industry For Practical Exposure",
      "Personalized PPMS",
      "Real-Time About Placement Needs From The Academic Experience",
    ],
  },
  {
    title: "Foster Innovation & Research",
    icon: <Lightbulb className="w-6 h-6 text-white" />,
    gradient: "from-orange-500 to-orange-600",
    borderColor: "border-orange-100",
    hoverColor: "group-hover:text-orange-600",
    bullets: [
      "Transform Academic Institutions Into Hubs Of Innovation And Research",
      "Incubation Centers For Student Startups To Pursue Ideas From Conception To Commercialization",
      "Create Opportunities For Applied Research And Product Development",
    ],
  },
  {
    title: "Improve Graduate Employability",
    icon: <Award className="w-6 h-6 text-white" />,
    gradient: "from-orange-500 to-orange-600",
    borderColor: "border-orange-100",
    hoverColor: "group-hover:text-orange-600",
    bullets: [
      "Equip Students With In-Demand Practical Skills And Professional Experience",
      "Build Comprehensive Portfolios That Demonstrate Value To Employers",
      "Address The National Challenge Of Matching Qualified With Employment Opportunities",
      "Employment Opportunities",
    ],
  },
];

const PartnershipBenefits = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Strategic <span className="text-orange-500">Partnership </span>
              Benefits
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how SUMS transforms academic institutions through strategic
            partnerships
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="group card"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}
              >
                {benefit.icon}
              </div>
              <h3
                className={`text-xl font-bold text-gray-900 mb-4 ${benefit.hoverColor} transition-colors duration-300`}
              >
                {benefit.title}
              </h3>
              <ul className="text-gray-600 text-sm space-y-3">
                {benefit.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`mr-2 text-orange-500`}>•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipBenefits;
