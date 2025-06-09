import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
  FiHome,
  FiFilm,
  FiStar,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import ThemeToggle from "../ThemeToggle";
import { useMeQuery } from "@/api/auth/auth.query";
import { logout } from "@/services/auth.service";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollDirection, setScrollDirection] = useState("up"); // Default is up
  const [prevScrollY, setPrevScrollY] = useState(0); // To track previous scroll position
  const navigate = useNavigate();

  const { data: user, isLoading } = useMeQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/", icon: FiHome },
    { name: "Movies", path: "/movies", icon: FiFilm },
    { name: "Reviews", path: "/reviews", icon: FiStar },
    { name: "About", path: "/about", icon: FiInfo },
    { name: "Contact", path: "/contact", icon: FiMail },
  ];

  const privateLinks = [
    { name: "Watchlist", path: "/watchlist" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  // Scroll event handler to detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <nav
      className={`bg-white text-black dark:bg-gray-900 dark:text-white fixed w-full z-50 transition-all duration-300 ${
        scrollDirection === "down" ? "-top-20" : "top-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-500">
            MovieReviews
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-2 hover:text-blue-500"
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
            {!isLoading && user && (
              <>
                {privateLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="hover:text-blue-500"
                  >
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-black  dark:text-white "
              aria-label="Toggle Search"
            >
              <FiSearch size={20} className="text-black dark:text-white" />
            </button>
            <ThemeToggle />

            {/* Auth State */}
            {!isLoading && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-9 h-9 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center"
                  aria-label="Profile Menu"
                >
                  {user.username?.charAt(0).toUpperCase()}
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center space-x-2"
                    >
                      <FiLogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/login" className="text-black dark:text-white ">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
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
                className="w-full px-4 py-2 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-700 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-black dark:text-white dark:bg-gray-800 "
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
                  className="text-black dark:text-white flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <link.icon size={18} />
                  <span>{link.name}</span>
                </Link>
              ))}
              {!isLoading && user && (
                <>
                  {privateLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="text-black dark:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-400 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              )}
              {!isLoading && !user && (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                  <Link
                    to="/login"
                    className="text-black dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-500 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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
