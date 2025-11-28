import React, { useState } from "react";
import { Button } from "../../components";
import { Building2, Cross, Handshake, UserCheck, Users, X } from "lucide-react";
import PdfViewer from "../../components/PDFViewer/PDFViewer";

const IncubationReports = () => {
  const [pdfURL, setPDFURL] = useState<string>();
  return (
    <>
      {/* Our Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">
              Incubation <span className="text-orange-500">Reports</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our Pre-Incubation Reports summarize the key activities and
              outcomes from programs conducted in different partner colleges.
              Each report highlights student progress, hands-on sessions, team
              formation, problem identification, solution validation, and
              pitching results under the SUMS Innovator Program (SIP).
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Texas",
                logo: "texas-mgmt-id.png",
                report: "/public/files/SUMSXTexaspre-incubationReport.pdf",
              },
              {
                title: "St.Xaviers",
                logo: "st-x.png",
                report: "/public/files/St.Xaviers.pdf",
              },

              {
                title: "School of Management",
                logo: "somtu.png",
                report: "/public/files/School-of-Management.pdf",
              },
              {
                title: "Samarpan",
                logo: "icms.jpeg",
                report: "/public/files/Samarpan.pdf",
              },
            ].map((process, index) => (
              <div key={index} className="group card">
                <div className="text-center pb-4">
                  <div className="w-12 h-12 mx-auto rounded-lg text-orange-600 flex items-center justify-center mb-4 mt-4 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={`/images/logos/${process.logo}`}
                      alt={process.title.toString() + "-logo"}
                      width={200}
                      height={200}
                      className="scale-150"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-black">
                    {process.title}
                  </h3>
                </div>
                <div className="flex justify-center items-center">
                  <Button
                    className="bg-orange-500 text-white h-10"
                    onClick={() => setPDFURL(process.report)}
                  >
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {pdfURL && pdfURL?.trim().length > 0 && (
            <div
              className="fixed top-0 left-0 bg-white flex justify-center items-center  h-screen w-screen z-50"
              style={{ zIndex: "999999" }}
            >
              <div
                className="fixed right-6 top-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-full p-2 cursor-pointer flex items-center justify-center z-50
             hover:bg-orange-50"
                onClick={() => setPDFURL("")}
              >
                <X size={24} className="text-orange-500" />
              </div>

              <div className="w-screen h-screen" style={{ overflow: "scroll" }}>
                <PdfViewer pdfUrl={pdfURL} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default IncubationReports;
