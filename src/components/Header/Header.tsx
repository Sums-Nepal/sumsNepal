"use client"

import { useState } from "react"
import { Menu, X, ChevronDown, Plus, LogIn, UserPlus } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import LogoImage from "../LogoImage/LogoImage"
import { navs } from "./navs"
import "./Header.css"
import { useCurrentUser } from "../../hooks"
import userService from "../../services/user"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(false)
  const navigate = useNavigate()

  const { user } = useCurrentUser()

  const visibleNavs = navs.slice(0, 5)
  const hiddenNavs = navs.slice(5)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header
      className={`w-full z-50 transition-all duration-500 sticky top-0 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-orange-100/50 shadow-xl shadow-orange-500/5"
          : "bg-white/90 backdrop-blur-lg border-b border-orange-50/30 shadow-lg shadow-orange-500/5"
      }`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-8 max-w-[1900px]">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-105 relative z-10">
            <LogoImage makeClickable={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {visibleNavs.map((currentNav) => (
              <NavLink
                key={currentNav.id}
                to={currentNav.path}
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 relative group ${
                    isActive
                      ? "text-orange-600 bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100/70 shadow-sm ring-1 ring-orange-100"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/60"
                  }`
                }
              >
                {currentNav.name}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full transition-all duration-300 group-hover:w-[calc(100%-1.5rem)] w-0`}
                />
              </NavLink>
            ))}

            {hiddenNavs.length > 0 && (
              <div className="relative group">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  onMouseEnter={() => setOpenDropdown(true)}
                  className={`px-3 xl:px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-1.5 relative ${
                    openDropdown
                      ? "text-orange-600 bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100/70 shadow-sm ring-1 ring-orange-100"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/60"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown ? "rotate-180 text-orange-500" : ""
                    }`}
                  />
                </button>

                {/* Dropdown menu */}
                <div
                  onMouseLeave={() => setOpenDropdown(false)}
                  className={`absolute top-full right-0 mt-2.5 w-64 rounded-2xl bg-white shadow-2xl shadow-orange-500/10 border border-orange-100/80 backdrop-blur-xl overflow-hidden transition-all duration-300 origin-top ${
                    openDropdown
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400" />

                  <div className="max-h-[360px] overflow-y-auto overscroll-contain py-2 px-2">
                    {hiddenNavs.map((currentNav, index) => (
                      <NavLink
                        key={currentNav.id}
                        to={currentNav.path}
                        onClick={() => setOpenDropdown(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                            isActive
                              ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100/60 shadow-sm ring-1 ring-orange-100"
                              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/80 hover:translate-x-1"
                          } ${index !== 0 ? "mt-1" : ""}`
                        }
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {currentNav.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <Button
              onClick={() => {
                window.open("https://wa.me/9810446594")
              }}
              className="bg-white border-2 border-orange-500 text-orange-600 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              Contact Us
            </Button>

            {!user ? (
              <>
                <Button
                  onClick={() => {
                    navigate("/login")
                  }}
                  className="bg-white border-2 border-orange-500 text-orange-600 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate("/signup")
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="relative z-10">Sign Up</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("/project/create")
                  }}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span className="relative z-10">Create Project</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button
                  onClick={async () => {
                    await userService.logout()
                    window.location.reload()
                  }}
                  className="bg-white border-2 border-orange-500 text-orange-600 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 active:scale-95 ring-2 ring-transparent hover:ring-orange-100"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-orange-100/60 bg-gradient-to-b from-white to-orange-50/30">
            <nav className="flex flex-col px-3 py-4 sm:px-4 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain">
              <div className="space-y-1.5">
                {navs.map((currentNav) => (
                  <NavLink
                    key={currentNav.id}
                    to={currentNav.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isActive
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100/60 shadow-sm translate-x-1 ring-1 ring-orange-100"
                          : "text-gray-700 hover:bg-orange-50/70 hover:text-orange-600 hover:translate-x-1"
                      }`
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {currentNav.name}
                    </span>
                  </NavLink>
                ))}
              </div>

              <div className="mt-4 space-y-2.5 pt-4 border-t border-orange-100">
                <Button
                  onClick={() => {
                    window.open("https://wa.me/9810446594")
                    setIsOpen(false)
                  }}
                  className="w-full bg-white border-2 border-orange-500 text-orange-600 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98]"
                >
                  Contact Us
                </Button>

                {!user ? (
                  <>
                    <Button
                      onClick={() => {
                        navigate("/login")
                        setIsOpen(false)
                      }}
                      className="w-full bg-white border-2 border-orange-500 text-orange-600 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/signup")
                        setIsOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        navigate("/project/create")
                        setIsOpen(false)
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Project
                    </Button>
                    <Button
                      onClick={async () => {
                        await userService.logout()
                        window.location.reload()
                      }}
                      className="w-full bg-white border-2 border-orange-500 text-orange-600 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/20 active:scale-[0.98]"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
