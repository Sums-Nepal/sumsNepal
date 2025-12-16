import { contacts, policies, quickLinks, socialLinks, stakeholders } from "./FooterDatas"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div>
            <div className="mb-6">
              <img src="/images/sums-logo-without-bg.png" alt="SUMS Logo" className="w-32 h-24 object-contain" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering education, driving innovation, and discovering the future through strategic connections between
              students, colleges, companies, and cities.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                  className="w-10 h-10 bg-slate-800 hover:bg-orange-500 rounded-lg flex items-center justify-center transition-colors duration-200 border border-slate-700 hover:border-orange-500"
                  title={link.label}
                >
                  <span className="text-xs font-semibold text-gray-300">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white border-l-2 border-orange-500 pl-3">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Stakeholders */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white border-l-2 border-orange-500 pl-3">
              For Stakeholders
            </h3>
            <ul className="space-y-2.5">
              {stakeholders.map((stake, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-200 text-sm">
                    {stake}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white border-l-2 border-orange-500 pl-3">
              Contact & Support
            </h3>
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <li key={contact.id} className="flex items-start gap-2.5 text-gray-400 text-sm">
                  <span className="text-base">{contact.icon}</span>
                  <span>{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} <span className="text-orange-500 font-medium">sumsnepal</span>. All Rights
              Reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {policies.map((policy, idx) => (
                <Link
                  key={idx}
                  to={`/${policy.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-gray-500 hover:text-orange-500 transition-colors duration-200"
                >
                  {policy}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
