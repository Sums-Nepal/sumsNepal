"use client";
import { useEffect, useState } from "react";
import { Button, GeneralForm } from "../../components";

const AcademiaHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenGeneralForm, setIsOpenGeneralForm] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // /images/aca.JPG
  return (
    <section className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0">
        <img
          className="object-cover w-full h-full filter blur-xs" // Add blur class here
          src="./images/ac-hero.jpeg"
          alt="Background"
        />
        {/* Optional dark overlay to further enhance text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-3xl">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
              <p className="text-orange-400 text-sm font-medium">
                🚀 Empowering Learning
              </p>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight">
              <span className="text-white">SUMS:</span>
              <br />
              <span className="italic font-serif text-orange-500">
                Powering Education
              </span>
            </h1>

            <div className="space-y-6 mb-10">
              <p className="text-gray-300 text-xl leading-relaxed">
                SUMS is an integrated technology service platform designed to
                power the next generation of education. By combining essential
                academic and administrative tools into one user-friendly system,
                SUMS addresses core challenges faced by Higher Education
                Institutions.
              </p>
              <p className="text-gray-300 text-xl leading-relaxed">
                We prepare students for the demands of the global market through
                innovation, collaboration, and excellence in education.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-orange-500/10 border border-orange-500/30 mb-8">
              <p className="text-orange-300 font-semibold flex items-center gap-2">
                🇳🇵 Nepal-Focused Design
              </p>
              <p className="text-gray-300 mt-2">
                Specifically developed to align with operational realities and
                accreditation requirements of Nepali institutions.
              </p>
            </div>

            <Button
              onClick={() => setIsOpenGeneralForm(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
      {isOpenGeneralForm && (
        <GeneralForm
          visible={isOpenGeneralForm}
          onClose={() => setIsOpenGeneralForm(false)}
        />
      )}
    </section>
  );
};

export default AcademiaHero;
