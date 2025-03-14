import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiHome,
  FiFilm,
  FiStar,
  FiBookmark,
  FiLayout,
  FiInfo,
  FiMail,
} from "react-icons/fi";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock authentication state (replace with your actual auth logic)
  const isAuthenticated = false;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Movies", path: "/movies", icon: FiFilm },
    { name: "Reviews", path: "/reviews", icon: FiStar },
    { name: "Watchlist", path: "/watchlist", icon: FiBookmark },
    { name: "Dashboard", path: "/dashboard", icon: FiLayout },
    { name: "About", path: "/about", icon: FiInfo },
    { name: "Contact", path: "/contact", icon: FiMail },
  ];

  return (
    <nav className="bg-gray-900 text-white fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-500">
            MovieReviews
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Search and Auth Buttons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <FiSearch size={20} />
            </button>
            <ThemeToggle />

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <FiUser size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Settings
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2">
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <FiSearch size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
