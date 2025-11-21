"use client"
import { contacts, policies, quickLinks, socialLinks, stakeholders } from "./FooterDatas"
import LogoImage from "../LogoImage/LogoImage"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white pt-20 sm:pt-24 lg:pt-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
              {/* Brand Section */}
              <div className="lg:col-span-1 animate-fade-in">
                <div className="flex items-center mb-6 group cursor-pointer">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow duration-300 transform group-hover:scale-110">
                    <LogoImage />
                  </div>
                  <span className="ml-3 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                    SUMS
                  </span>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                  Empowering education, driving innovation, and discovering the future through strategic connections
                  between students, colleges, companies, and cities.
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.href}
                      className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-orange-500 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-slate-700 hover:border-orange-500/50 shadow-lg hover:shadow-orange-500/30"
                      title={link.label}
                    >
                      <span className="text-sm font-bold text-gray-300 group-hover:text-white">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <h3 className="text-lg sm:text-xl font-bold mb-6 text-white flex items-center group">
                  <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3 group-hover:h-8 transition-all"></span>
                  Quick Links
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base"
                      >
                        <span className="w-0 h-0.5 bg-orange-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* For Stakeholders */}
              <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-lg sm:text-xl font-bold mb-6 text-white flex items-center group">
                  <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3 group-hover:h-8 transition-all"></span>
                  For Stakeholders
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {stakeholders.map((stake, idx) => (
                    <li key={idx}>
                      <Link
                        to="#"
                        className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base"
                      >
                        <span className="w-0 h-0.5 bg-orange-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                        {stake}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact & Support */}
              <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-lg sm:text-xl font-bold mb-6 text-white flex items-center group">
                  <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3 group-hover:h-8 transition-all"></span>
                  Contact & Support
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {contacts.map((contact) => (
                    <li
                      key={contact.id}
                      className="flex items-start gap-3 text-gray-400 hover:text-orange-400 transition-colors duration-200 cursor-pointer group text-sm sm:text-base"
                    >
                      <span className="mt-1 text-orange-500 group-hover:scale-125 transition-transform">
                        {contact.icon}
                      </span>
                      <span>{contact.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
          </div>

          {/* Bottom Footer */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
              <div className="text-gray-500 text-xs sm:text-sm order-2 sm:order-1">
                © {new Date().getFullYear()} <span className="text-orange-400 font-semibold">sumsnepal</span>. All
                Rights Reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm order-1 sm:order-2">
                {policies.map((policy, idx) => (
                  <Link
                    key={idx}
                    to={policy.toLowerCase()}
                    className="text-gray-500 hover:text-orange-400 transition-colors duration-200 relative group"
                  >
                    {policy}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Animation keyframes */}
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

        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </>
  )
}

export default Footer
