import { getGenres } from "./genres";
import api from "../config/api";

jest.mock("../config/api");

describe("getGenres", () => {
  it("should return genres data when the API call is successful", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        genres: [
          { id: 28, name: "Action" },
          { id: 35, name: "Comedy" },
        ],
      },
    });

    const result = await getGenres();

    expect(result).toEqual({
      genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
      ],
    });
  });

  it("should return error message when the API call fails", async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch genres")
    );

    const result = await getGenres();

    expect(result).toEqual({ error: "Failed to fetch genres" });
  });
});
