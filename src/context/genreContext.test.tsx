import { render, screen, waitFor } from "@testing-library/react";
import { GenreProvider, useGenres } from "./GenreContext";

const MockComponent = () => {
  const genres = useGenres();
  return (
    <div>
      {genres.length > 0 ? (
        genres.map((genre) => <p key={genre.id}>{genre.name}</p>)
      ) : (
        <p>No genres available</p>
      )}
    </div>
  );
};

describe("GenreContext", () => {
  it("should load genres from localStorage if available", () => {
    const mockGenres = [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ];
    localStorage.setItem("@cubos-movies/genres", JSON.stringify(mockGenres));

    render(
      <GenreProvider>
        <MockComponent />
      </GenreProvider>
    );

    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Comedy")).toBeInTheDocument();
  });

  it("should fetch genres and store them in localStorage if not available", async () => {
    const mockGenres = [
      { id: 1, name: "Action" },
      { id: 2, name: "Comedy" },
    ];
    const getGenres = jest.fn();
    getGenres.mockResolvedValue({ genres: mockGenres });

    render(
      <GenreProvider>
        <MockComponent />
      </GenreProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Action")).toBeInTheDocument();
      expect(screen.getByText("Comedy")).toBeInTheDocument();
    });

    expect(localStorage.getItem("@cubos-movies/genres")).toEqual(
      JSON.stringify(mockGenres)
    );
  });

  it("should show No genres available when no genres are set", () => {
    localStorage.removeItem("@cubos-movies/genres");

    render(
      <GenreProvider>
        <MockComponent />
      </GenreProvider>
    );

    expect(screen.getByText("No genres available")).toBeInTheDocument();
  });
});
