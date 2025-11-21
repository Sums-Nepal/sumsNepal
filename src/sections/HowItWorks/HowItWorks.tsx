"use client";

import { useCallback } from "react";
import { stepsData } from "./StepsData";
import { useHowItWorks } from "../../context/HowItWorksContext";
import AssessAndAlignDetailed from "../AssessAndAlignDetailed/AssessAndAlignDetailed";
import Connext from "../Connect/Connext";
import Upskill from "../Upskill/Upskill";
import Place from "../Place/Place";

const HowItWorks = () => {
  const { one, two, three, four, currentStateNum } = useHowItWorks();

  const ActOnClick = useCallback(
    (position: number) => {
      switch (position) {
        case 1:
          one();
          break;
        case 2:
          two();
          break;
        case 3:
          three();
          break;
        case 4:
          four();
          break;
        default:
          one();
          break;
      }
    },
    [one, two, three, four]
  );

  return (
    <>
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
        {/* Animated background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 -left-32 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 -right-32 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20 animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <span className="text-orange-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                Process
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              How It{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
              Four strategic steps to transform careers and communities. Click
              each step to explore the journey!
            </p>
          </div>

          {/* Process Flow Container */}
          <div className="relative">
            {/* Animated progress bar - Desktop */}
            <div className="hidden lg:block absolute left-0 right-0 h-1 bg-gray-800 transform translate-y-12 z-0 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    currentStateNum === 1
                      ? "12.5%"
                      : currentStateNum === 2
                      ? "37.5%"
                      : currentStateNum === 3
                      ? "62.5%"
                      : "100%",
                }}
              ></div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-20">
              {stepsData.map((step, index) => {
                const Icon = step.icon;
                const isActive = index + 1 <= currentStateNum;
                const isCurrent = index + 1 === currentStateNum;

                return (
                  <div
                    key={step.id}
                    onClick={() => ActOnClick(index + 1)}
                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${
                        index * 0.1
                      }s backwards`,
                    }}
                  >
                    {/* Card */}
                    <div
                      className={`relative p-4 sm:p-3 rounded-2xl backdrop-blur-lg border transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-orange-500/50 shadow-lg shadow-orange-500/20"
                          : "bg-slate-800/40 border-slate-700/50 hover:border-orange-500/30 hover:bg-slate-800/60"
                      }`}
                    >
                      {/* Icon container */}
                      <div className="relative mb-6 flex justify-center">
                        <div
                          className={`w-10 h-10 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/40"
                              : "bg-slate-700/50 group-hover:bg-slate-700"
                          }`}
                        >
                          <Icon
                            className={`w-6 h- sm:w-6 sm:h-10 ${
                              isActive ? "text-white" : "text-gray-400"
                            }`}
                          />
                        </div>
                        {isCurrent && (
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        )}
                      </div>

                      {/* Step Number */}
                      <div className="text-center mb-3">
                        <span
                          className={`text-xs sm:text-sm font-semibold uppercase tracking-widest ${
                            isActive ? "text-orange-400" : "text-gray-500"
                          }`}
                        >
                          Step {index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white text-center mb-3 group-hover:text-orange-400 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm sm:text-base text-center leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Content Sections */}
      <div className="bg-slate-950">
        {currentStateNum === 1 && <AssessAndAlignDetailed />}
        {currentStateNum === 2 && <Connext />}
        {currentStateNum === 3 && <Upskill />}
        {currentStateNum === 4 && <Place />}
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default HowItWorks;
