import { describe, it, expect } from "vitest";
import { truncateAddress } from "../pages/sellerDashboard/utils/walletUtils";

describe("truncateAddress", () => {
  it("truncates a standard 44-char Solana address to first 6 + '...' + last 4", () => {
    const address = "9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin";
    expect(truncateAddress(address)).toBe("9xQeWv...VFin");
  });

  it("returns empty string for an empty string input", () => {
    expect(truncateAddress("")).toBe("");
  });

  it("preserves exactly the first 6 characters", () => {
    const result = truncateAddress("ABCDEFGHIJ1234");
    expect(result.startsWith("ABCDEF")).toBe(true);
  });

  it("preserves exactly the last 4 characters", () => {
    const result = truncateAddress("ABCDEFGHIJ1234");
    expect(result.endsWith("1234")).toBe(true);
  });

  it("always inserts '...' separator", () => {
    const result = truncateAddress("ABCDEFGHIJ1234");
    expect(result).toBe("ABCDEF...1234");
  });

  it("handles a short address where slices overlap (length < 10)", () => {
    // slice(0, 6) = "ABCDE" (only 5 chars), slice(-4) = "BCDE" — they overlap
    // The function still produces a result, just with repeated chars
    const result = truncateAddress("ABCDE");
    expect(result).toBe("ABCDE...BCDE");
  });
});
