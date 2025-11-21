import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import LogoImage from "../LogoImage/LogoImage";
import { navs } from "./navs";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 10)
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header
      className={` w-full z-50 transition-all duration-300 sticky top-0 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-orange-100/30 shadow-lg"
          : "bg-white/50 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <LogoImage makeClickable={true} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navs.map((currentNav) => (
              <NavLink
                key={currentNav.id}
                to={currentNav.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative group ${
                    isActive
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-700 hover:text-orange-600"
                  }`
                }
              >
                {currentNav.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-300 group-hover:w-full ${({
                    // @ts-ignore
                    isActive,
                  }) => (isActive ? "w-full" : "w-0")}`}
                />
              </NavLink>
            ))}
          </nav>

          {/* Desktop Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => {
                window.open("https://wa.me/9810446594");
              }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-all duration-300"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="z-50 md:hidden">
            <nav className="flex flex-col space-y-1 px-4 py-4 sm:px-6">
              {navs.map((currentNav) => (
                <NavLink
                  key={currentNav.id}
                  to={currentNav.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`
                  }
                >
                  {currentNav.name}
                </NavLink>
              ))}
              <Button
                onClick={() => {
                  window.open("https://wa.me/9810446594");
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
              >
                Contact Us
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
