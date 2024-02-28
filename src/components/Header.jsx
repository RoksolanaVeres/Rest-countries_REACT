import { Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  function toggleTheme() {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  }
  return (
    <div
      id="header"
      className="flex items-center justify-between bg-primary px-7 py-10 shadow-lg md:px-20 md:py-4"
    >
      <div className="text-lg font-bold md:text-2xl">Where in the world?</div>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center gap-1 rounded-lg p-2 text-sm font-semibold md:gap-3 md:p-4 md:text-base"
      >
        {theme === "dark" ? (
          <>
            <Sun />
            Light Mode
          </>
        ) : (
          <>
            <Moon />
            Dark Mode
          </>
        )}
      </button>
    </div>
  );
}
