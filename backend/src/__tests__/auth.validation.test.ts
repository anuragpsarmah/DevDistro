import { describe, expect, it } from "vitest";
import { githubCodeSchema } from "../validations/auth.validation";

describe("auth validation — githubCodeSchema", () => {
  // --- F1: Valid code + state accepted ---
  it("accepts valid code and 48-char hex state", () => {
    const result = githubCodeSchema.safeParse({
      code: "abc123def456",
      state: "a".repeat(48),
    });
    expect(result.success).toBe(true);
  });

  // --- F2: Empty code rejected ---
  it("rejects empty code", () => {
    const result = githubCodeSchema.safeParse({
      code: "",
      state: "a".repeat(48),
    });
    expect(result.success).toBe(false);
  });

  // --- F3: Code > 100 chars rejected ---
  it("rejects code longer than 100 characters", () => {
    const result = githubCodeSchema.safeParse({
      code: "x".repeat(101),
      state: "a".repeat(48),
    });
    expect(result.success).toBe(false);
  });

  // --- F4: State != 48 chars rejected ---
  it("rejects state that is not exactly 48 characters", () => {
    const result = githubCodeSchema.safeParse({
      code: "validcode",
      state: "abcdef",
    });
    expect(result.success).toBe(false);
  });

  // --- F5: Non-hex state rejected ---
  it("rejects state containing non-hex characters", () => {
    const result = githubCodeSchema.safeParse({
      code: "validcode",
      state: "g".repeat(48),
    });
    expect(result.success).toBe(false);
  });
});
