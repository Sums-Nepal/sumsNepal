"use client"

import { useState, useEffect } from "react"
import { Menu, X, ChevronDown, Plus, LogIn, UserPlus, LogOut } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../Button/Button"
import LogoImage from "../LogoImage/LogoImage"
import ThemeToggle from "../ThemeToggle/ThemeToggle"
import { navs } from "./navs"
import { useCurrentUser } from "../../hooks"
import userService from "../../services/user"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const navigate = useNavigate()
  const { user } = useCurrentUser()

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Scrolling down & past threshold -> hide
      } else {
        setIsVisible(true)  // Scrolling up or at top -> show
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const visibleNavs = navs.slice(0, 4)
  const hiddenNavs = navs.slice(4)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"} ${scrolled
        ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]"
        : "bg-transparent"
        }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center flex-shrink-0 relative z-10"
          >
            <LogoImage makeClickable={true} />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {visibleNavs.map((currentNav, i) => (
              <motion.div
                key={currentNav.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navVariants}
              >
                <NavLink
                  to={currentNav.path}
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 relative group truncate max-w-[160px] inline-block ${isActive
                      ? "text-primary bg-primary/10 shadow-inner"
                      : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                    }`
                  }
                  title={currentNav.name}
                >
                  {currentNav.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full w-0"
                    layoutId="underline"
                  />
                </NavLink>
              </motion.div>
            ))}

            {hiddenNavs.length > 0 && (
              <div className="relative group">
                <button
                  onMouseEnter={() => setOpenDropdown(true)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-1 ${openDropdown ? "text-primary bg-primary/10 shadow-inner" : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/5"
                    }`}
                >
                  More
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-500 ${openDropdown ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseLeave={() => setOpenDropdown(false)}
                      className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-800 shadow-2xl border border-border overflow-hidden p-2"
                    >
                      {hiddenNavs.map((currentNav) => (
                        <NavLink
                          key={currentNav.id}
                          to={currentNav.path}
                          onClick={() => setOpenDropdown(false)}
                          className={({ isActive }) =>
                            `block px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"
                            }`
                          }
                        >
                          {currentNav.name}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <ThemeToggle />

            <div className="h-6 w-px bg-border mx-2" />

            {!user ? (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/25 hover:-translate-y-1 active:scale-95"
                >
                  Get Started
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => navigate("/project/create")}
                  className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
                <button
                  onClick={async () => {
                    await userService.logout()
                    window.location.reload()
                  }}
                  className="p-2 text-foreground hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex xl:hidden items-center gap-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl text-foreground hover:bg-secondary transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white dark:bg-slate-900 border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-2">
              {navs.map((currentNav) => (
                <NavLink
                  key={currentNav.id}
                  to={currentNav.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium text-sm transition-all ${isActive ? "text-primary bg-primary/10" : "text-foreground hover:bg-secondary"
                    }`
                  }
                >
                  {currentNav.name}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-border mt-2 space-y-2">
                {!user ? (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full bg-primary text-white px-4 py-3 rounded-xl"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate("/signup")}
                      className="w-full bg-primary text-white px-4 py-3 rounded-xl"
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate("/project/create")}
                      className="w-full bg-primary text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Project
                    </Button>
                    <Button
                      onClick={async () => {
                        await userService.logout()
                        window.location.reload()
                      }}
                      className="w-full px-4 py-3 text-red-500"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
