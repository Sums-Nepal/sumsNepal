import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { Button } from "../../components";
import "./SolutionSection.css"; // Make sure this file includes the correct CSS

const solutions = [
  {
    id: "talent",
    label: "Talent Retention",
    title: "Talent Retention",
    description:
      "Keep your brightest minds home by creating meaningful opportunities. Our programs connect local talent with innovation projects that matter to your community.",
    cta: "See Examples",
  },
  {
    id: "education",
    label: "Education-Industry Alignment",
    title: "Education-Industry Alignment",
    description:
      "Bridge the gap between education and industry needs. We help align curriculum with real-world demands, ensuring students graduate with relevant, in-demand skills.",
    cta: "Learn More",
  },
  {
    id: "ecosystem",
    label: "Innovation Ecosystem",
    title: "Innovation Ecosystem",
    description:
      "Build a thriving innovation ecosystem that attracts talent and investment. Create the infrastructure and support systems that enable startups and innovation to flourish.",
    cta: "Explore Solutions",
  },
];

export function SolutionsSection() {
  const [activeTab, setActiveTab] = useState("talent");
  const [animationClass, setAnimationClass] = useState("");

  // Trigger animation each time the activeTab changes
  useEffect(() => {
    // Add animation class
    setAnimationClass("animation-slide");

    // Remove the animation class after the animation completes (500ms or 1s)
    const timeout = setTimeout(() => {
      setAnimationClass("");
    }, 500); // Match the animation duration here

    return () => clearTimeout(timeout); // Cleanup the timeout
  }, [activeTab]); // Re-run on tab change

  const activeSolution = solutions.find((s) => s.id === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Our <span className="text-orange-500">Solution</span>
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {solutions.map((solution) => (
            <Button
              key={solution.id}
              onClick={() => setActiveTab(solution.id)}
              className={
                activeTab === solution.id
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "hover:border-orange-500/50"
              }
            >
              {solution.label}
            </Button>
          ))}
        </div>

        {/* Content */}
        {activeSolution && (
          <div
            className={`max-w-3xl mx-auto text-center space-y-8 ${animationClass}`}
          >
            <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-orange-500" />
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold">
              {activeSolution.title}
            </h3>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {activeSolution.description}
            </p>

            {/* Uncomment the Button if needed */}
            {/* 
            <Button className="text-orange-500 hover:text-orange-600">
              {activeSolution.cta} →
            </Button> 
            */}
          </div>
        )}
      </div>
    </section>
  );
}
