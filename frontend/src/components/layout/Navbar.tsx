import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark =
      storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDarkMode(shouldUseDark);
    if (shouldUseDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-medium tracking-tight hover-lift">
          <span className="text-primary">review</span>
          <span className="text-accent">o</span>
          <span className="text-primary">saur</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/movies">Movies</NavLink>
          <NavLink to="/reviews">Reviews</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search movies..."
              className="h-9 w-[200px] rounded-full bg-muted px-4 pl-9 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <button className="rounded-full h-9 px-4 text-sm font-medium transition-colors bg-accent text-accent-foreground hover:bg-accent/90">
            Sign In
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 p-2 bg-muted text-muted-foreground hover:bg-muted/80 transition"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium transition-colors hover:text-accent relative hover-lift",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;
