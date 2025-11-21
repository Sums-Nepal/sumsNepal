import { CheckCircle, Lightbulb, Rocket } from "lucide-react";
import React from "react";

const FeatureCards = () => {
  return (
    <>
      {/* Feature Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: CheckCircle,
                title: "Market Validated",
                description:
                  "Every project idea has been thoroughly researched and validated for market potential.",
                bgColor: "bg-blue-50",
                iconColor: "text-blue-600",
              },
              {
                icon: Rocket,
                title: "Ready to Launch",
                description:
                  "Complete with detailed specifications and implementation roadmaps.",
                bgColor: "bg-green-50",
                iconColor: "text-green-600",
              },
              {
                icon: Lightbulb,
                title: "Innovation First",
                description:
                  "Cutting-edge solutions designed to address tomorrow's challenges.",
                bgColor: "bg-purple-50",
                iconColor: "text-purple-600",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`${feature.bgColor} rounded-xl p-6 text-center`}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-lg bg-white ${feature.iconColor} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureCards;
