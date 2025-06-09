import { Link } from "react-router-dom";
import {
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    movies: [
      { name: "Browse Movies", path: "/movies" },
      { name: "Top Rated", path: "/movies/top-rated" },
      { name: "Coming Soon", path: "/movies/coming-soon" },
      { name: "Genres", path: "/movies/genres" },
    ],
    community: [
      { name: "Reviews", path: "/reviews" },
      { name: "Discussion", path: "/discussion" },
      { name: "Members", path: "/members" },
      { name: "Events", path: "/events" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Contact Us", path: "/contact" },
      { name: "About Us", path: "/about" },
      { name: "Terms of Service", path: "/terms" },
    ],
  };

  return (
    <footer className="bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-blue-500 mb-4">
              MovieReviews
            </h3>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for discovering, discussing, and sharing
              your love for cinema.
            </p>
            <div className="flex space-x-4 text-black dark:text-white transition-colors">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Movies Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Movies</h4>
            <ul className="space-y-2">
              {footerLinks.movies.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black dark:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-black dark:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMail className="text-blue-500 mt-1" size={18} />
                <span className="text-black dark:text-white">
                  support@moviereviews.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiPhone className="text-blue-500 mt-1" size={18} />
                <span className="text-black dark:text-white">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="text-blue-500 mt-1" size={18} />
                <span className="text-black dark:text-white">
                  123 Movie Street
                  <br />
                  Cinema City, CC 12345
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-black dark:text-white text-sm">
              © {currentYear} MovieReviews. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-black dark:text-white hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-black dark:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-black dark:text-white text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
