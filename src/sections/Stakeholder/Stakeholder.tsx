import { useCallback } from "react";
import { stakeholderData } from "./StakeHolderData";
import { useNavigate } from "react-router-dom";

const Stakeholder = () => {
  const navigate = useNavigate();

  const actOnClick = useCallback((redirectName: string) => {
    switch (redirectName) {
      case "Students":
        navigate("/student");
        break;
      case "Colleges":
        navigate("/academia");
        break;
      case "Companies":
        navigate("business");
        break;
      case "Cities":
        navigate("city");
        break;
      default:
        navigate("/");
    }
  }, []);

  return (
    <>
      {/* Stakeholder Cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stakeholderData.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="text-center group hover:transform hover:scale-105 transition-all duration-30 cursor-pointer"
                onClick={() => actOnClick(item.title)}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 h-64">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Stakeholder;
