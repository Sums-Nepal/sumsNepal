"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import LogoImage from "../LogoImage/LogoImage";
import { navs } from "./navs";
import "./Header.css";
import { useCurrentUser } from "../../hooks";
import userService from "../../services/user";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const { user } = useCurrentUser();

  const visibleNavs = navs.slice(0, 5);
  const hiddenNavs = navs.slice(5);

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10)
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={`w-full z-50 transition-all duration-500 sticky top-0 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-orange-100/50 shadow-xl shadow-black/5"
          : "bg-white/90 backdrop-blur-lg border-b border-orange-50/30 shadow-sm"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20 w-[100%]">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-105 relative z-10">
            <LogoImage makeClickable={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {visibleNavs.map((currentNav) => (
              <NavLink
                key={currentNav.id}
                to={currentNav.path}
                className={({ isActive }) =>
                  `px-4 lg:px-5 py-2.5 rounded-xl font-semibold text-sm lg:text-[15px] transition-all duration-300 relative group ${
                    isActive
                      ? "text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-sm"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                  }`
                }
              >
                {currentNav.name}
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-full transition-all duration-300 group-hover:w-[calc(100%-2rem)] w-0`}
                />
              </NavLink>
            ))}

            {hiddenNavs.length > 0 && (
              <div className="relative group">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  onMouseEnter={() => setOpenDropdown(true)}
                  className={`px-4 lg:px-5 py-2.5 rounded-xl font-semibold text-sm lg:text-[15px] transition-all duration-300 flex items-center gap-1.5 relative ${
                    openDropdown
                      ? "text-orange-600 bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-sm"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/50"
                  }`}
                >
                  More
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown ? "rotate-180 text-orange-600" : ""
                    }`}
                  />
                </button>

                {/* Enhanced dropdown menu with scrollable container */}
                <div
                  onMouseLeave={() => setOpenDropdown(false)}
                  className={`absolute top-full right-0 mt-2 w-56 rounded-2xl bg-white shadow-2xl shadow-black/10 border border-gray-100/80 backdrop-blur-xl overflow-hidden transition-all duration-300 origin-top ${
                    openDropdown
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  {/* Gradient header accent */}
                  <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500" />

                  {/* Scrollable container for many items */}
                  <div className="max-h-[320px] overflow-y-auto overscroll-contain py-2 scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent hover:scrollbar-thumb-orange-300">
                    {hiddenNavs.map((currentNav, index) => (
                      <NavLink
                        key={currentNav.id}
                        to={currentNav.path}
                        onClick={() => setOpenDropdown(false)}
                        className={({ isActive }) =>
                          `block mx-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                            isActive
                              ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100/50 shadow-sm"
                              : "text-gray-700 hover:text-orange-600 hover:bg-orange-50/70 hover:translate-x-1"
                          } ${index !== 0 ? "mt-1" : ""}`
                        }
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {currentNav.name}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Desktop Button */}
          <div className=" flex gap-6">
            <Button
              onClick={() => {
                window.open("https://wa.me/9810446594");
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold text-sm lg:text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
            >
              <span className="relative z-10">Contact Us</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            {!user ? (
              <Button
                onClick={() => {
                  navigate("/login");
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold text-sm lg:text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            ) : (
                <Button
                onClick={async () => {
                  await userService.logout();
                  window.location.reload();
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl font-semibold text-sm lg:text-[15px] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 relative overflow-hidden group"
              >
                <span className="relative z-10">Logout</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300 active:scale-95"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="z-50 md:hidden border-t border-orange-100/50">
            <nav className="flex flex-col px-4 py-4 sm:px-6 max-h-[calc(100vh-5rem)] overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
              <div className="space-y-1">
                {navs.map((currentNav) => (
                  <NavLink
                    key={currentNav.id}
                    to={currentNav.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isActive
                          ? "text-orange-600 bg-gradient-to-r from-orange-50 to-orange-100/50 shadow-sm translate-x-1"
                          : "text-gray-700 hover:bg-orange-50/70 hover:text-orange-600 hover:translate-x-1"
                      }`
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      {currentNav.name}
                    </span>
                  </NavLink>
                ))}
              </div>
              <Button
                onClick={() => {
                  window.open("https://wa.me/9810446594");
                  setIsOpen(false);
                }}
                className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 active:scale-[0.98]"
              >
                Contact Us
              </Button>
              {!user && (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 active:scale-[0.98]"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
