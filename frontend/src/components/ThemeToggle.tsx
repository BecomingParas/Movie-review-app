import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkModeEnabled =
      storedTheme === "dark" || (!storedTheme && prefersDark);

    setIsDark(darkModeEnabled);
    if (darkModeEnabled) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isNowDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isNowDark ? "dark" : "light");
    setIsDark(isNowDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className=" rounded-lg  text-white  dark:text-black"
    >
      {isDark ? "🌙" : "🌞"}
    </button>
  );
};

export default ThemeToggle;
