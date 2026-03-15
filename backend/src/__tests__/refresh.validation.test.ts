import { describe, expect, it } from "vitest";
import { refreshTokenCookieSchema } from "../validations/refresh.validation";

describe("refresh validation — refreshTokenCookieSchema", () => {
  // --- G1: Valid 80-char hex token accepted ---
  it("accepts valid 80-character lowercase hex refresh token", () => {
    const result = refreshTokenCookieSchema.safeParse({
      refresh_token: "a".repeat(80),
    });
    expect(result.success).toBe(true);
  });

  // --- G2: Short token rejected ---
  it("rejects token shorter than 80 characters", () => {
    const result = refreshTokenCookieSchema.safeParse({
      refresh_token: "a".repeat(79),
    });
    expect(result.success).toBe(false);
  });

  // --- G3: Non-hex chars rejected ---
  it("rejects token containing non-hex characters", () => {
    const result = refreshTokenCookieSchema.safeParse({
      refresh_token: "g".repeat(80),
    });
    expect(result.success).toBe(false);
  });

  // --- G4: Missing refresh_token rejected ---
  it("rejects when refresh_token is missing", () => {
    const result = refreshTokenCookieSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
