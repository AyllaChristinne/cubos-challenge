import { render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import userEvent from "@testing-library/user-event";

const MockComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p>{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should set the theme from localStorage if available", () => {
    localStorage.setItem("@cubos-movies/theme", "light");

    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    expect(screen.getByText("light")).toBeInTheDocument();
  });

  it("should default to 'dark' theme if no theme is in localStorage", () => {
    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    expect(screen.getByText("dark")).toBeInTheDocument();
  });

  it("should toggle theme between 'light' and 'dark' when button is clicked", async () => {
    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle Theme");

    expect(screen.getByText("dark")).toBeInTheDocument();

    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("light")).toBeInTheDocument();
    });

    userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText("dark")).toBeInTheDocument();
    });
  });

  it("should save the theme to localStorage when toggled", async () => {
    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle Theme");

    userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("@cubos-movies/theme")).toBe("light");
    });

    userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem("@cubos-movies/theme")).toBe("dark");
    });
  });

  it("should apply the correct theme to the document element", async () => {
    render(
      <ThemeProvider>
        <MockComponent />
      </ThemeProvider>
    );

    const button = screen.getByText("Toggle Theme");

    expect(document.documentElement.getAttribute("color-theme")).toBe("dark");

    userEvent.click(button);
    await waitFor(() => {
      expect(document.documentElement.getAttribute("color-theme")).toBe(
        "light"
      );
    });
  });
});
