import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * HeroSection Component
 *
 * @component
 * @description The main banner section of the home page featuring the latest movie,
 * navigation menu, and trailer preview.
 *
 * @example
 * ```tsx
 * <HeroSection />
 * ```
 *
 * Features:
 * - Responsive navigation menu with mobile hamburger
 * - Featured movie display with title and details
 * - Trailer preview button
 * - Background image with overlay
 *
 * Accessibility:
 * - Menu button is keyboard accessible
 * - Proper heading hierarchy
 * - Alt text for images
 * - ARIA labels for interactive elements
 */
export const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative min-h-[500px] sm:min-h-[852px] px-4 sm:px-20 pt-4 sm:pt-7 pb-12 sm:pb-48">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/c49028e4e997e87b86ebff75d18c135ac6d9a589127af847273a389355ca2576?placeholderIfAbsent=true)",
        }}
      />

      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center max-w-[1258px] mx-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/a8a5dc41e8d040d4cca9d38a1dc94f8242644a4105ba5b533d386e4cee4aa1bc?placeholderIfAbsent=true"
          alt="Logo"
          className="w-[60px] sm:w-[85px] object-contain"
        />

        <button
          className="sm:hidden absolute right-4 top-4 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav
          className={`
          ${isMenuOpen ? "flex" : "hidden"}
          sm:flex flex-col sm:flex-row gap-4 sm:gap-7
          text-white text-sm font-medium tracking-wider
          w-full sm:w-auto mt-4 sm:mt-0
          bg-black/90 sm:bg-transparent
          p-4 sm:p-0
        `}
        >
          <Link to="/" className="text-red-500 font-black">
            Home
          </Link>
          <Link to="/distributions" className="hover:text-red-500">
            Distributions
          </Link>
          <Link to="/production" className="hover:text-red-500">
            Production
          </Link>
          <Link to="/about" className="hover:text-red-500">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-red-500">
            Contact Us
          </Link>
        </nav>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12 sm:mt-[119px] max-w-[1224px] mx-auto">
        <div className="text-white px-4 sm:px-0">
          <div className="flex gap-4 items-center">
            <span className="px-2 sm:px-3 py-1 text-xs font-semibold tracking-wider">
              NEW
            </span>
            <span className="text-sm">Best of 2022</span>
          </div>

          <h1 className="text-5xl sm:text-[120px] font-semibold leading-none tracking-tighter mt-4 sm:mt-8">
            Avatar 2
          </h1>

          <div className="flex items-center gap-3 sm:gap-5 mt-4 sm:mt-6 text-lg sm:text-xl font-semibold">
            <span className="border border-white px-2 py-1">PG-18</span>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/d45dfc1dc0e2b40ba96cb8b6d3d49751eff550edfb8cc3dad6dce49d44456dce?placeholderIfAbsent=true"
              alt="Rating"
              className="w-[40px] sm:w-[51px] object-contain"
            />
          </div>

          <p className="text-sm sm:text-base leading-relaxed sm:leading-7 tracking-wide mt-4 sm:mt-7 max-w-[600px]">
            The Way of Water is a 2022 American epic science fiction film
            co-produced and directed by James Cameron, who co-wrote the
            screenplay with Rick Jaffa
          </p>

          <button className="mt-4 sm:mt-6 px-8 sm:px-11 py-3 sm:py-4 text-sm font-semibold tracking-wide bg-red-500 hover:bg-red-600 transition-colors">
            Watch Now
          </button>
        </div>

        <div className="relative min-h-[250px] sm:min-h-[324px] mt-4 sm:mt-0">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg sm:rounded-none"
            style={{
              backgroundImage:
                "url(https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/630ebff568d611ea9e245b1b2c5c6dc42c8126408cf3f16ada6110661754ff19?placeholderIfAbsent=true)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0329669a448f4e19b213ca65eb35fcc4/781dfdea18ac6a78da5d406e3708d7a51e599328f09846a6f08fd67a15c781be?placeholderIfAbsent=true"
                alt="Play"
                className="w-[60px] sm:w-[93px] mx-auto"
              />
              <span className="block text-white text-xs sm:text-sm mt-4 sm:mt-6">
                Watch Trailer
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
