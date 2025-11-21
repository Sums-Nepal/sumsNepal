import { Button } from "../../components";
import { eventsData } from "./EventsData";

const UpcomingEvents = () => {
  return (
    <>
      {/* Upcoming Events Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Upcoming Events
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto">
            Join our community events to network, learn, and contribute to
            Nepal's development
          </p>

          {eventsData.length > 0 ? (
            /* Events Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {eventsData.map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.id}
                    className={`bg-gradient-to-br ${event.gradient} rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group hover:transform hover:scale-105`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 ${event.bgColor} rounded-xl flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-sm ${event.dateColor} font-semibold`}
                        >
                          {event.date}
                        </div>
                        <div className={`text-xs ${event.locationColor}`}>
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Fallback Message */
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg sm:text-xl">
                🚀 No upcoming events at the moment. Stay tuned!
              </p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        {eventsData.length > 0 && (
          <div className="flex items-center justify-center p-10">
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200 rounded-full">
              Join Now
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default UpcomingEvents;
