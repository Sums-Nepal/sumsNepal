// PrivacyPolicyPage.tsx
import React, { useState } from "react";
import { privacyPolicies } from "./PrivacyPoliciesData";
import { ChevronDown, ChevronUp } from "lucide-react";

const PrivacyAndPolicies = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center mb-6">
        Privacy <span className="text-orange-500"> & Policies</span>
      </h1>
      <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
        Learn how SUMS Nepal protects your personal information and respects
        your privacy. All policies are clearly explained to ensure transparency
        and trust.
      </p>

      <div className="space-y-6">
        {privacyPolicies.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
          >
            <button
              className="w-full text-left px-8 py-5 bg-white hover:bg-orange-50 flex justify-between items-center focus:outline-none relative"
              onClick={() => toggleSection(index)}
            >
              <span className="font-semibold text-gray-800 text-lg">
                {section.title}
              </span>
              <span className="text-orange-500">
                {openIndex === index ? (
                  <ChevronUp size={24} />
                ) : (
                  <ChevronDown size={24} />
                )}
              </span>
            </button>

            <div
              className={`px-8 pb-6 text-gray-700 text-base transition-all duration-500 ${
                openIndex === index
                  ? "max-h-[2000px] opacity-100 pt-4"
                  : "max-h-0 opacity-0 pt-0 overflow-hidden"
              }`}
            >
              {section.content.split("\n").map((line, i) => (
                <p key={i} className="mb-3 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacyAndPolicies;
