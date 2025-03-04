"use client";
import React, { useState } from "react";

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    "Home",
    "Distributions",
    "Production",
    "About Us",
    "Contact Us",
  ];

  return (
    <nav className="relative flex justify-between items-center px-28 py-7 max-md:px-5">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cbfa68bdf9fe830345b513a3b2f10d5338e3d202"
        alt="Logo"
        className="h-[92px] w-[85px]"
      />

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-7">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="text-sm font-medium tracking-widest text-white cursor-pointer opacity-[0.67] hover:opacity-100"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-neutral-900 py-4 px-5 md:hidden z-50">
          {navItems.map((item, index) => (
            <button
              key={index}
              className="block w-full text-left text-sm font-medium tracking-widest text-white cursor-pointer opacity-[0.67] hover:opacity-100 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
