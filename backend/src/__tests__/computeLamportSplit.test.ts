/**
 * Unit tests for computeLamportSplit.
 *
 * This is pure integer arithmetic that determines exactly how much SOL
 * is transferred to the seller vs the treasury on every purchase.
 * Getting it wrong means money is either lost or incorrectly split.
 *
 * No infrastructure needed — these are deterministic math tests.
 */

import { describe, it, expect, vi } from "vitest";

// solanaPrice.util.ts imports `redisClient` from ".." (src/index.ts) at module load time.
// Mock the entire barrel so no DB/Redis connections are attempted during tests.
vi.mock("..", () => ({
  redisClient: {
    get: vi.fn(),
    setex: vi.fn(),
    getdel: vi.fn(),
    del: vi.fn(),
  },
}));

import { computeLamportSplit } from "../utils/solanaPrice.util";

// These are the exact values from the real test purchase documented in the DB.
// They serve as a concrete regression anchor.
const REAL_PRICE_SOL = parseFloat((1 / 86.43).toFixed(9)); // ≈ 0.011570057
const REAL_TOTAL_LAMPORTS = 11_570_057;
const REAL_SELLER_LAMPORTS = 11_454_356;
const REAL_PLATFORM_LAMPORTS = 115_701;

describe("computeLamportSplit", () => {
  describe("invariant: no lamports created or destroyed", () => {
    it("sellerLamports + platformLamports === totalLamports for the real test purchase", () => {
      const { totalLamports, sellerLamports, platformLamports } =
        computeLamportSplit(REAL_PRICE_SOL);
      expect(sellerLamports + platformLamports).toBe(totalLamports);
    });

    it("sellerLamports + platformLamports === totalLamports for 100 random SOL amounts", () => {
      for (let i = 0; i < 100; i++) {
        // Prices between $0.01 and $10,000 at typical SOL rates
        const sol = Math.random() * 100;
        const { totalLamports, sellerLamports, platformLamports } =
          computeLamportSplit(sol);
        expect(sellerLamports + platformLamports).toBe(totalLamports);
      }
    });
  });

  describe("regression: real $1 purchase at $86.43/SOL", () => {
    it("produces the documented totalLamports", () => {
      const { totalLamports } = computeLamportSplit(REAL_PRICE_SOL);
      expect(totalLamports).toBe(REAL_TOTAL_LAMPORTS);
    });

    it("produces the documented sellerLamports (99%)", () => {
      const { sellerLamports } = computeLamportSplit(REAL_PRICE_SOL);
      expect(sellerLamports).toBe(REAL_SELLER_LAMPORTS);
    });

    it("produces the documented platformLamports (1%)", () => {
      const { platformLamports } = computeLamportSplit(REAL_PRICE_SOL);
      expect(platformLamports).toBe(REAL_PLATFORM_LAMPORTS);
    });
  });

  describe("split correctness", () => {
    it("sellerLamports is exactly floor(total * 99 / 100)", () => {
      const { totalLamports, sellerLamports } =
        computeLamportSplit(REAL_PRICE_SOL);
      expect(sellerLamports).toBe(Math.floor((totalLamports * 99) / 100));
    });

    it("platformLamports is exactly total - seller (not independently computed)", () => {
      const { totalLamports, sellerLamports, platformLamports } =
        computeLamportSplit(REAL_PRICE_SOL);
      expect(platformLamports).toBe(totalLamports - sellerLamports);
    });

    it("priceSolSeller is sellerLamports / 1e9", () => {
      const { sellerLamports, priceSolSeller } =
        computeLamportSplit(REAL_PRICE_SOL);
      expect(priceSolSeller).toBe(sellerLamports / 1_000_000_000);
    });

    it("priceSolPlatform is platformLamports / 1e9", () => {
      const { platformLamports, priceSolPlatform } =
        computeLamportSplit(REAL_PRICE_SOL);
      expect(priceSolPlatform).toBe(platformLamports / 1_000_000_000);
    });
  });

  describe("edge cases", () => {
    it("platform always receives at least 1 lamport for any non-trivial amount", () => {
      // Even 0.01 SOL → 10_000_000 lamports → platform = 100_000 lamports
      const { platformLamports } = computeLamportSplit(0.01);
      expect(platformLamports).toBeGreaterThan(0);
    });

    it("totalLamports is Math.round (not floor or ceil) of sol * 1e9", () => {
      const sol = 0.0115700574; // chosen to demonstrate rounding
      const expected = Math.round(sol * 1_000_000_000);
      const { totalLamports } = computeLamportSplit(sol);
      expect(totalLamports).toBe(expected);
    });

    it("handles a high-value project ($10,000 at $100/SOL = 100 SOL) without overflow", () => {
      const sol = 100; // 100 SOL = 100_000_000_000 lamports
      const { totalLamports, sellerLamports, platformLamports } =
        computeLamportSplit(sol);
      expect(totalLamports).toBe(100_000_000_000);
      expect(sellerLamports + platformLamports).toBe(totalLamports);
    });
  });
});
