import { useTheme } from "@/context/ThemeContext";
import { LogoCubos } from "@/icons/LogoCubos";
import "./index.scss";
import { SunIcon } from "@/icons/Sun";
import { MoonIcon } from "@/icons/Moon";
import { Button } from "../Button";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="header">
      <div className="header_content">
        <div className="header_title">
          <LogoCubos className="header_logo" />
          <span className="header_text">Movies</span>
        </div>
        <Button
          ariaLabel="Mudar tema de cores"
          onClick={toggleTheme}
          className="header_toggleTheme"
          icon={
            theme === "dark" ? (
              <SunIcon className="header_toggleThemeIcon" />
            ) : (
              <MoonIcon className="header_toggleThemeIcon" />
            )
          }
          variant="secondary"
        />
      </div>
    </nav>
  );
};
