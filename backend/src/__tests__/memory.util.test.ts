import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fsMock = vi.hoisted(() => ({
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
}));

vi.mock("node:fs", () => fsMock);

import { getMemorySnapshot } from "../utils/memory.util";

describe("getMemorySnapshot", () => {
  const originalConstrainedMemory = process.constrainedMemory;
  const originalAvailableMemory = process.availableMemory;

  beforeEach(() => {
    vi.restoreAllMocks();
    fsMock.existsSync.mockReset();
    fsMock.readFileSync.mockReset();

    vi.spyOn(process, "memoryUsage").mockReturnValue({
      rss: 200 * 1024 * 1024,
      heapTotal: 80 * 1024 * 1024,
      heapUsed: 50 * 1024 * 1024,
      external: 12 * 1024 * 1024,
      arrayBuffers: 4 * 1024 * 1024,
    });

    Object.defineProperty(process, "constrainedMemory", {
      configurable: true,
      value: vi.fn(() => 512 * 1024 * 1024),
    });

    Object.defineProperty(process, "availableMemory", {
      configurable: true,
      value: vi.fn(() => 256 * 1024 * 1024),
    });
  });

  afterEach(() => {
    Object.defineProperty(process, "constrainedMemory", {
      configurable: true,
      value: originalConstrainedMemory,
    });

    Object.defineProperty(process, "availableMemory", {
      configurable: true,
      value: originalAvailableMemory,
    });
  });

  it("returns process, runtime, and cgroup memory details", () => {
    fsMock.existsSync.mockImplementation((path: string) =>
      ["/sys/fs/cgroup/memory.current", "/sys/fs/cgroup/memory.max"].includes(
        path
      )
    );

    fsMock.readFileSync.mockImplementation((path: string) => {
      if (path === "/sys/fs/cgroup/memory.current") {
        return "314572800\n";
      }

      if (path === "/sys/fs/cgroup/memory.max") {
        return "536870912\n";
      }

      throw new Error(`Unexpected path: ${path}`);
    });

    const snapshot = getMemorySnapshot();

    expect(snapshot.nodeVersion).toBe(process.version);
    expect(snapshot.process.rss).toEqual({ bytes: 209715200, mb: 200 });
    expect(snapshot.process.heapUsed).toEqual({ bytes: 52428800, mb: 50 });
    expect(snapshot.runtime.constrainedMemory).toEqual({
      bytes: 536870912,
      mb: 512,
    });
    expect(snapshot.runtime.availableMemory).toEqual({
      bytes: 268435456,
      mb: 256,
    });
    expect(snapshot.cgroup).toEqual({
      source: "/sys/fs/cgroup/memory.current",
      current: { bytes: 314572800, mb: 300 },
      max: { bytes: 536870912, mb: 512 },
      maxRaw: "536870912",
    });
  });

  it("handles an unlimited cgroup max cleanly", () => {
    fsMock.existsSync.mockImplementation((path: string) =>
      ["/sys/fs/cgroup/memory.current", "/sys/fs/cgroup/memory.max"].includes(
        path
      )
    );

    fsMock.readFileSync.mockImplementation((path: string) => {
      if (path === "/sys/fs/cgroup/memory.current") {
        return "12345\n";
      }

      if (path === "/sys/fs/cgroup/memory.max") {
        return "max\n";
      }

      throw new Error(`Unexpected path: ${path}`);
    });

    const snapshot = getMemorySnapshot();

    expect(snapshot.cgroup.current).toEqual({ bytes: 12345, mb: 0.01 });
    expect(snapshot.cgroup.max).toBeNull();
    expect(snapshot.cgroup.maxRaw).toBe("max");
  });
});
