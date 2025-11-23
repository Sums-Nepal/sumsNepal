import { Building2, Users } from "lucide-react";
import { Button } from "../../components";

export function GetInvolvedSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Get <span className="text-orange-500">Involved</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8 rounded-lg text-center dark-card">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">For City Leaders</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leverage smart frameworks and governance tools to transform your
              city into an innovation powerhouse.
            </p>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => {
                window.location.href = "#city-contact-form";
                const element = document.getElementById("city-contact-form");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth", // Smooth scroll
                    block: "start", // Align to the top of the container
                  });
                }
              }}
            >
              Contact Us
            </Button>
          </div>

          <div className="bg-gray-800 p-8 rounded-lg text-center dark-card">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              For Citizens & Innovators
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Join exciting initiatives and share your ideas as we build the
              future of your city together.
            </p>
            <Button
              onClick={() => {
                const element = document.getElementById("city-contact-form");
                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth", 
                    block: "start", 
                  });
                }
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Join Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
