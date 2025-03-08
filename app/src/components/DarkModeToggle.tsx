// src/components/DarkModeToggle.tsx
import React, { useState, useEffect } from "react";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

const DarkModeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <button
      className="px-4 py-2 dark:text-white"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default DarkModeToggle;
