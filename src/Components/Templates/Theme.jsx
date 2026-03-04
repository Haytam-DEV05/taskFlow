import { useEffect, useState } from "react";
import { LuSunMoon } from "react-icons/lu";

export default function Theme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("theme", theme);
  }, [theme]);

  return (
    <div
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-16 h-8 bg-(--card) border border-(--text)/20 rounded-full flex items-center cursor-pointer p-1 transition-all duration-300"
    >
      <div
        className={`absolute w-6 h-6 rounded-full bg-(--primary) flex items-center justify-center transition-all duration-300 ${
          theme === "dark" ? "translate-x-8" : "translate-x-0"
        }`}
      >
        <LuSunMoon size={14} className="text-white" />
      </div>
    </div>
  );
}