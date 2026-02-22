import { contacts, policies, quickLinks, socialLinks, stakeholders } from "./FooterDatas"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="relative bg-slate-950 dark:bg-black text-white border-t border-slate-800 pt-16 pb-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <img src="/images/sums-logo-without-bg.png" alt="SUMS Logo" className="w-32 h-auto object-contain brightness-110" />
            </motion.div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Empowering education, driving innovation, and discovering the future through strategic connections between
              students, colleges, companies, and cities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.id}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.href}
                  className="w-10 h-10 bg-slate-900 hover:bg-primary rounded-xl flex items-center justify-center transition-colors border border-slate-800 hover:border-primary shadow-lg"
                >
                  <span className="text-[10px] font-bold text-slate-300 group-hover:text-white uppercase tracking-tighter">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections Container */}
          <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                Quick Links
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to="#" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-primary rounded-full" />
                Stakeholders
              </h3>
              <ul className="space-y-4">
                {stakeholders.map((stake, idx) => (
                  <li key={idx}>
                    <Link to="#" className="text-slate-400 hover:text-primary transition-colors text-sm font-medium flex items-center group">
                      <span className="w-0 group-hover:w-2 h-px bg-primary mr-0 group-hover:mr-2 transition-all" />
                      {stake}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              Contact
            </h3>
            <div className="bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-3">
                  <span className="text-primary mt-1">{contact.icon}</span>
                  <p className="text-slate-400 text-sm leading-snug">{contact.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm order-2 sm:order-1">
            © {new Date().getFullYear()} <span className="text-primary font-bold">SUMS NEPAL</span>. Crafted with passion.
          </p>
          <div className="flex flex-wrap justify-center gap-8 order-1 sm:order-2">
            {policies.map((policy, idx) => (
              <Link
                key={idx}
                to={`/${policy.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-500 hover:text-primary text-sm transition-colors"
              >
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
