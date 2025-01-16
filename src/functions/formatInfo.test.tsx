import { formatDate, formatMinutesToHours, formatRating } from "./formatInfo";

describe("Utility Functions", () => {
  describe("formatDate", () => {
    it('should format a date in "YYYY-MM-DD" format to "MM/DD/YYYY"', () => {
      const inputDate = "2023-05-15";
      const formattedDate = formatDate(inputDate);
      expect(formattedDate).toBe("05/15/2023");
    });

    it("should handle invalid date input correctly", () => {
      const inputDate = "invalid-date";
      const formattedDate = formatDate(inputDate);
      expect(formattedDate).toBe("NaN/NaN/NaN");
    });
  });

  describe("formatMinutesToHours", () => {
    it("should convert minutes to hours and minutes correctly", () => {
      const inputMinutes = 125;
      const formattedTime = formatMinutesToHours(inputMinutes);
      expect(formattedTime).toBe("2h5m");
    });

    it("should handle cases where minutes are less than 60", () => {
      const inputMinutes = 45;
      const formattedTime = formatMinutesToHours(inputMinutes);
      expect(formattedTime).toBe("0h45m");
    });

    it('should return "0h0m" for 0 minutes', () => {
      const inputMinutes = 0;
      const formattedTime = formatMinutesToHours(inputMinutes);
      expect(formattedTime).toBe("0h0m");
    });

    it("should handle very large numbers of minutes correctly", () => {
      const inputMinutes = 1500;
      const formattedTime = formatMinutesToHours(inputMinutes);
      expect(formattedTime).toBe("25h0m");
    });
  });

  describe("formatRating", () => {
    it("should convert rating to percentage ", () => {
      const inputRating = 8.5;
      const formattedRating = formatRating(inputRating);
      expect(formattedRating).toBe("85");
    });

    it("should return 0 for rating of 0", () => {
      const inputRating = 0;
      const formattedRating = formatRating(inputRating);
      expect(formattedRating).toBe("0");
    });

    it("should return 100 for rating of 10", () => {
      const inputRating = 10;
      const formattedRating = formatRating(inputRating);
      expect(formattedRating).toBe("100");
    });

    it("should round the rating correctly when it's a decimal", () => {
      const inputRating = 7.1;
      const formattedRating = formatRating(inputRating);
      expect(formattedRating).toBe("71");
    });
  });
});
