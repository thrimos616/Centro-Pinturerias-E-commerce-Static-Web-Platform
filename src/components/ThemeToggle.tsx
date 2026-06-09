import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  isMobile?: boolean;
}

export function ThemeToggle({ className = "", isMobile = false }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync with HTML class applied by inline script
    const checkTheme = () => document.documentElement.classList.contains("dark");
    setIsDark(checkTheme());

    // Observe classList changes to keep React state in sync
    const observer = new MutationObserver(() => {
      setIsDark(checkTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const isDarkNow = document.documentElement.classList.contains("dark");
    const newTheme = isDarkNow ? "light" : "dark";
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  if (isMobile) {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-center gap-2 px-3 py-3 w-full text-left text-sm rounded-lg transition ${
          isDark
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-gray-700 hover:bg-gray-50"
        } ${className}`}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        {isDark ? "Modo Claro" : "Modo Oscuro"}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full text-white hover:bg-white/10 dark:text-gray-200 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-white ${className}`}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      title={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
