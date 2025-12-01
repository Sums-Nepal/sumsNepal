import { ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  college: string;
  image: string;
  description: string;
  report: string;
}

const studentProjects: Project[] = [
  // Texas College Teams
  {
    title: "HOVIUS",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "Hospital Management System focusing on digitizing hospital operations.",
    report: "/files/Texas_HOVIUS.pdf",
  },
  {
    title: "UTOPIA",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "Modernizing gold and silver jewelry to make it more affordable.",
    report: "/files/Texas_UTOPIA.pdf",
  },
  {
    title: "AUTUMN",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "Developing travel, study, and hygiene kits targeted for girls in communities.",
    report: "/files/Texas_AUTUMN.pdf",
  },
  {
    title: "GEN-Z",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "Energy & water solution for hiking with a smart bottle design.",
    report: "/files/Texas_GENZ.pdf",
  },
  {
    title: "FLOAT",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description: "Collaborative platform for learners to study and socialize.",
    report: "/files/Texas_FLOAT.pdf",
  },
  {
    title: "GIRLY GIRLZ",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "Jewelry segment connecting fashion with lightweight solutions.",
    report: "/files/Texas_GIRLYGIRLZ.pdf",
  },
  {
    title: "TREBLE",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description: "Providing home services nationwide in the future.",
    report: "/files/Texas_TREBLE.pdf",
  },
  {
    title: "SKILLWAVE",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "SOS system embedded in school bags to send alerts and live location to parents.",
    report: "/files/Texas_SKILLWAVE.pdf",
  },
  {
    title: "BACK ARROW",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description:
      "OTT platform promoting Nepali movies and culture internationally.",
    report: "/files/Texas_BACKARROW.pdf",
  },
  {
    title: "REACTOR",
    college: "Texas College",
    image: "/images/logos/texas-mgmt-id.png",
    description: "Multipurpose and interchangeable jewelry designs.",
    report: "/files/Texas_REACTOR.pdf",
  },

  // Other colleges remain as before
  {
    title: "Eco-friendly Robot",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description:
      "A robot prototype designed for sustainable waste management and recycling.",
    report: "/files/St.Xaviers.pdf",
  },
  {
    title: "Management Dashboard",
    college: "School of Management",
    image: "/images/logos/somtu.png",
    description:
      "A web-based dashboard for visualizing KPIs and team productivity metrics.",
    report: "/files/School-of-Management.pdf",
  },
  {
    title: "Community Help Platform",
    college: "Samarpan",
    image: "/images/logos/icms.jpeg",
    description:
      "A platform connecting volunteers with community service projects efficiently.",
    report: "/files/Samarpan.pdf",
  },
  {
    title: "The Plot Twist Trio",
    college: "Samarpan",
    image: "/images/logos/icms.jpeg",

    description:
      "Develop a mental wellness chatbot that provides students with 24/7 emotional support and resources.",
    report: "/files/Samarpan_PlotTwistTrio.pdf",
  },
  {
    title: "APPS",
    college: "Samarpan",
    image: "/images/logos/icms.jpeg",

    description:
      "Design a peer-to-peer book exchange platform to reduce textbook costs for students.",
    report: "/files/Samarpan_APPS.pdf",
  },
  // st
  {
    title: "BAZINGA",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description:
      "Bazinga Bites is a protein and meat bite, designed to target university students who want to fuel their bodies and minds during university struggles.",
    report: "/files/StXaviers_BAZINGA.pdf",
  },
  {
    title: "APPLE",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description: "Clothing - Have your hoodie haven.",
    report: "/files/StXaviers_APPLE.pdf",
  },
  {
    title: "DIVERSE",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description: "Bio kit backpack.",
    report: "/files/StXaviers_DIVERSE.pdf",
  },
  {
    title: "Aroma",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description: "Aroma Bags/Tote/Backpacks.",
    report: "/files/StXaviers_AROMA.pdf",
  },
  {
    title: "Team B",
    college: "St. Xaviers",
    image: "/images/logos/st-x.png",
    description:
      "Find Your Tribe app platform connecting fellow college students.",
    report: "/files/StXaviers_TeamB.pdf",
  },
  {
    title: "Innovators’ Hive",
    college: "School of Management",
    image: "/images/logos/somtu.png",
    description:
      "A mentoring platform where students can teach and learn from each other based on nearby locations.",
    report: "/files/SchoolOfManagement_InnovatorsHive.pdf",
  },
  // Sagarmatha Engineering College teams
  {
    title: "Tech Ninja",
    college: "Sagarmatha Engineering College",
    image: "/images/logos/sagarmathalogo.png",
    description:
      "Revamp an e-commerce site for better UX, improved navigation, and a streamlined checkout.",
    report: "/files/Sagarmatha_TechNinja.pdf",
  },
  {
    title: "S-quad",
    college: "Sagarmatha Engineering College",
    image: "/images/logos/sagarmathalogo.png",

    description:
      "Create an app for tracking workouts, diet, sleep, and integrating with wearables.",
    report: "/files/Sagarmatha_Squad.pdf",
  },
  {
    title: "Clover",
    college: "Sagarmatha Engineering College",
    image: "/images/logos/sagarmathalogo.png",

    description:
      "Build a system to control home devices via an app with voice recognition and AI learning.",
    report: "/files/Sagarmatha_Clover.pdf",
  },
  {
    title: "Pichai",
    college: "Sagarmatha Engineering College",
    image: "/images/logos/sagarmathalogo.png",

    description:
      "Develop a platform for video lessons, quizzes, and live sessions, with student-teacher interaction.",
    report: "/files/Sagarmatha_Pichai.pdf",
  },
  {
    title: "Code Crafter",
    college: "Sagarmatha Engineering College",
    image: "/images/logos/sagarmathalogo.png",

    description:
      "Design an IoT-based system to optimize water usage and provide real-time farming insights.",
    report: "/files/Sagarmatha_CodeCrafter.pdf",
  },
  {
    title: "365-plus1",
    college: "Sagarmatha Engineering College",
        image: "/images/logos/sagarmathalogo.png",

    description:
      "Build an AI chatbot for handling customer inquiries, with NLP and machine learning to improve over time.",
    report: "/files/Sagarmatha_365plus1.pdf",
  },
];

// Mock Data for visualization (Keep your own props/data)
// interface Project { ... }
// const studentProjects = [ ... ];

const StudentProjectShowcase = () => {
  const [pdfURL, setPDFURL] = useState<string>("");
  // Default all expanded to make the sticky effect immediately obvious,
  // or keep [] to start closed.
  const [expandedColleges, setExpandedColleges] = useState<string[]>([]);

  // Group projects logic remains the same...
  const projectsByCollege = studentProjects.reduce((acc, project) => {
    if (!acc[project.college]) acc[project.college] = [];
    acc[project.college].push(project);
    return acc;
  }, {} as Record<string, typeof studentProjects>);

  const toggleCollege = (college: string) => {
    setExpandedColleges((prev) =>
      prev.includes(college)
        ? prev.filter((c) => c !== college)
        : [...prev, college]
    );
  };

  return (
    <section className="py-24 bg-gray-900 relative min-h-screen text-zinc-100 selection:bg-orange-500 selection:text-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-600 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-900 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20">
          <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
            Ventures {" "}
            <span className="bg-clip-text bg-gradient-to-r text-orange-500">
             Incubated
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl border-l-4 border-orange-500 pl-6 italic">
            Witness the raw innovation of the SUMS Innovator Program. Where
            theory breaks and practical application begins.
          </p>
        </div>

        <div className="space-y-4">
          {Object.keys(projectsByCollege).map((college, index) => (
            <div key={college} className="relative group">
              {/* STICKY HEADER IMPLEMENTATION */}
              {/* top-0: Sticks to the very top.
                 z-30: Ensures it slides OVER the content but stays under modals.
                 backdrop-blur: Gives it that glass effect so you see content sliding under.
              */}
              <div
                className={`sticky top-0 z-30 transition-all duration-300 border-b border-zinc-800
                  ${
                    expandedColleges.includes(college)
                      ? "bg-gray-900/95 backdrop-blur-md py-6"
                      : "bg-gray-900 py-4"
                  }
                  flex justify-between items-center cursor-pointer px-6 border-l-4 
                  ${
                    expandedColleges.includes(college)
                      ? "border-l-orange-500"
                      : "border-l-zinc-700 hover:border-l-orange-500"
                  }
                `}
                onClick={() => toggleCollege(college)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 font-mono text-sm">
                    0{index + 1} //
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight uppercase">
                    {college}
                  </h3>
                </div>

                <div
                  className={`transition-transform duration-300 ${
                    expandedColleges.includes(college)
                      ? "rotate-180 text-orange-500"
                      : "text-zinc-500"
                  }`}
                >
                  {expandedColleges.includes(college) ? (
                    <ChevronDown size={28} />
                  ) : (
                    <ChevronRight size={28} />
                  )}
                </div>
              </div>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                  ${
                    expandedColleges.includes(college)
                      ? "max-h-[3000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }
                `}
              >
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-zinc-900/30">
                  {projectsByCollege[college].map((project, idx) => (
                    <div
                      key={idx}
                      className="group/card  relative bg-gray-900 border border-zinc-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] overflow-hidden"
                    >
                      {/* Image container with overlay effect */}
                      <div className="relative h-56 overflow-hidden flex justify-center items-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent z-10 opacity-80 flex justify-center items-center" />
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-[80%] h-[50%] object-cover transition-transform duration-700 group-hover/card:scale-100 "
                        />
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-orange-500 text-black text-xs font-bold px-2 py-1 uppercase tracking-widest">
                            Project
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h4 className="text-xl font-bold text-white mb-3 leading-tight group-hover/card:text-orange-500 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-zinc-400 text-sm mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        {/* <div className="flex gap-3 mt-auto">
                          <button
                            onClick={() => setPDFURL(project.report)}
                            className="flex-1 bg-zinc-100 text-black hover:bg-orange-500 hover:text-white h-10 font-bold text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2"
                          >
                            <FileText size={16} /> View Report
                          </button>
                          <a
                            href={project.report}
                            download
                            className="w-10 h-10 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-orange-500 hover:text-orange-500 transition-all"
                          >
                            <Download size={18} />
                          </a>
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cinematic PDF Viewer */}
        {pdfURL && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setPDFURL("")}
            />
            <div className="relative w-full max-w-5xl h-[85vh] bg-gray-900 border border-zinc-700 shadow-2xl flex flex-col animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900">
                <span className="text-orange-500 font-mono text-sm uppercase">
                  Secure Viewer // {pdfURL.split("/").pop()}
                </span>
                <button
                  onClick={() => setPDFURL("")}
                  className="text-zinc-400 hover:text-white hover:rotate-90 transition-transform"
                >
                  <X size={24} />
                </button>
              </div>
              <iframe
                src={pdfURL}
                title="PDF Viewer"
                className="w-full h-full bg-zinc-200"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentProjectShowcase;
