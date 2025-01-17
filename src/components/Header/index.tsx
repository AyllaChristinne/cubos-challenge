import { useTheme } from "@/context/ThemeContext";
import { LogoCubos } from "@/components/icons/LogoCubos";
import { SunIcon } from "@/components/icons/Sun";
import { MoonIcon } from "@/components/icons/Moon";
import { Button } from "../Button";
import "./index.scss";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
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
    </header>
  );
}
