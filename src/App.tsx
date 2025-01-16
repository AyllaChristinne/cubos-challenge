import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";
import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { GenreProvider } from "./context/GenreContext";
import { ErrorComponent } from "./components/Error";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <Header />
      <GenreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
            <Route
              path="*"
              element={<ErrorComponent error={new Error()} />}
            />{" "}
            */
          </Routes>
        </BrowserRouter>
      </GenreProvider>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
