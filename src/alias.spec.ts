import { describe, test, expect } from "vitest";
import { add } from "@/add";

describe("alias", () => {
  test("adds two numbers", () => {
    expect(add(1, 1)).toBe(2);
  });
});
