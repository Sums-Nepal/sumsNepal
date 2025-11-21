import React from "react";
import { Button } from "../../components";

const CTASection = () => {
  return (
    <>
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join thousands of organizations already collaborating and
              co-creating innovative solutions for Nepal's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="text-lg px-8 py-6 bg-white text-orange-600 hover:bg-gray-100">
                Get Started Today
              </Button>
              <Button className="text-lg px-8 py-6 border-white/20 text-white hover:bg-white hover:text-orange-600 bg-transparent border">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
