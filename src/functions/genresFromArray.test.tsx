import { getGenresFromArray } from "./genresFromArray";

describe("getGenresFromArray", () => {
  const mockGenres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "Drama" },
  ];

  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockGenres));
  });

  it("should return the correct genre names based on the IDs", () => {
    const result = getGenresFromArray([1, 3]);
    expect(result).toBe("Action, Drama");
  });

  it("should return an empty string if no genres match the IDs", () => {
    const result = getGenresFromArray([999, 1000]);
    expect(result).toBe("");
  });

  it("should return an empty string if no genres are found in localStorage", () => {
    Storage.prototype.getItem = jest.fn(() => "");
    const result = getGenresFromArray([1, 2]);
    expect(result).toBe("");
  });

  it("should return an empty string if localStorage is empty or null", () => {
    Storage.prototype.getItem = jest.fn(() => null);
    const result = getGenresFromArray([1, 2]);
    expect(result).toBe("");
  });

  it("should handle invalid IDs gracefully", () => {
    const result = getGenresFromArray([54, 365, 2]);
    expect(result).toBe("Comedy");
  });
});
