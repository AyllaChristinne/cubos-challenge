import { useTheme } from "@/context/ThemeContext";
import { LogoCubos } from "@/icons/LogoCubos";
import "./index.scss";
import { SunIcon } from "@/icons/Sun";
import { MoonIcon } from "@/icons/Moon";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="header">
      <div className="header_title">
        <LogoCubos className="header_logo" />
        <span className="header_text">Movies</span>
      </div>
      <button
        type="button"
        aria-label="Switch color theme"
        onClick={toggleTheme}
        className="header_toggleTheme"
      >
        {theme === "dark" ? (
          <SunIcon className="header_toggleThemeIcon" />
        ) : (
          <MoonIcon className="header_toggleThemeIcon" />
        )}
      </button>
    </nav>
  );
};
