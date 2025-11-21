import { whatYouGetData } from "./WhatYouGetDatas";



const OutcomesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-br from-teal-50 via-white to-green-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-200/30 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            What You Get
          </span>
        </h2>
        <p className="text-2xl sm:text-3xl font-bold mb-12">
          <span className="text-orange-500">
            Make your Progress
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatYouGetData.map((item, index) => (
            <div
              key={index}
              className="card group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              {item.subtitle && <p className="text-sm font-semibold text-gray-700 mb-3">{item.subtitle}</p>}
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OutcomesSection;
