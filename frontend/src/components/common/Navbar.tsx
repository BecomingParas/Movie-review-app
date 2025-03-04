import { Link } from "react-router-dom";
import { FiUser, FiSearch } from "react-icons/fi";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-white">
            MovieReviews
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/movies" className="text-gray-300 hover:text-white">
              Movies
            </Link>
            <Link to="/reviews" className="text-gray-300 hover:text-white">
              Reviews
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white">
              About
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-300 hover:text-white">
              <FiSearch size={20} />
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <FiUser size={18} />
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
