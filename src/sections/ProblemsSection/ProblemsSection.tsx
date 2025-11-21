import { Brain, Target, Lightbulb } from "lucide-react";

const problems = [
  {
    icon: Brain,
    title: "Brain Drain",
    description:
      "Talent leaves abroad seeking better opportunities and innovative ecosystems.",
  },
  {
    icon: Target,
    title: "Skill Mismatch",
    description:
      "Education systems misaligned with current industry needs and market demands.",
  },
  {
    icon: Lightbulb,
    title: "Low Innovation",
    description:
      "Cities miss economic growth opportunities due to lack of innovation ecosystems.",
  },
];

export function ProblemsSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-gray-900">
          Why <span className="text-orange-500">Your City </span>Needs SUMS
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="group card"
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <problem.icon className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-orange-500 transition-colors">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>

              {/* Decorative Bottom Bar */}
              {/* <div className="absolute bottom-0 left-0 w-12 h-1 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
