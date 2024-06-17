import { describe, expect, it } from "vitest";

import { getDistance } from "./utils";

describe("utils", () => {
  describe("getDistance", () => {
    it("should return 0 as distance between overlapping points", () => {
      const point1 = { x: 2, y: 3 };
      const point2 = { x: 2, y: 3 };
      const result = getDistance(point1, point2);
      expect(result).toBe(0);
    });

    it("should return the difference in x if y is the same", () => {
      const point1 = { x: 2, y: 3 };
      const point2 = { x: 5, y: 3 };
      const result = getDistance(point1, point2);
      expect(result).toBe(3);
    });

    it("should return the difference in y if x is the same", () => {
      const point1 = { x: 2, y: 3 };
      const point2 = { x: 2, y: 9 };
      const result = getDistance(point1, point2);
      expect(result).toBe(6);
    });

    it("should return the correct distance", () => {
      const point1 = { x: 2, y: 3 };
      const point2 = { x: 5, y: 7 };
      const result = getDistance(point1, point2);
      expect(result).toBe(5);
    });
  });
});
