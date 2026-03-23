import { existsSync, readFileSync } from "node:fs";

type ByteMetric = {
  bytes: number;
  mb: number;
};

type ByteMetricOrNull = ByteMetric | null;

const toMb = (bytes: number) => Math.round((bytes / 1024 / 1024) * 100) / 100;

const toMetric = (bytes: number): ByteMetric => ({
  bytes,
  mb: toMb(bytes),
});

const readTextFile = (path: string): string | null => {
  if (!existsSync(path)) {
    return null;
  }

  try {
    return readFileSync(path, "utf-8").trim();
  } catch {
    return null;
  }
};

const parseMetric = (value: number | null | undefined): ByteMetricOrNull => {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return null;
  }

  return toMetric(value);
};

const readCgroupValue = (paths: string[]) => {
  for (const path of paths) {
    const raw = readTextFile(path);

    if (raw !== null) {
      return { path, raw };
    }
  }

  return { path: null, raw: null };
};

const parseCgroupLimit = (raw: string | null): ByteMetricOrNull => {
  if (!raw || raw === "max") {
    return null;
  }

  const numeric = Number(raw);
  return Number.isFinite(numeric) && numeric >= 0 ? toMetric(numeric) : null;
};

const readCgroupMemory = () => {
  const current = readCgroupValue([
    "/sys/fs/cgroup/memory.current",
    "/sys/fs/cgroup/memory/memory.usage_in_bytes",
  ]);

  const max = readCgroupValue([
    "/sys/fs/cgroup/memory.max",
    "/sys/fs/cgroup/memory/memory.limit_in_bytes",
  ]);

  const currentBytes =
    current.raw !== null && Number.isFinite(Number(current.raw))
      ? toMetric(Number(current.raw))
      : null;

  return {
    source: current.path ?? max.path,
    current: currentBytes,
    max: parseCgroupLimit(max.raw),
    maxRaw: max.raw,
  };
};

export const getMemorySnapshot = () => {
  const used = process.memoryUsage();
  const constrainedMemory =
    typeof process.constrainedMemory === "function"
      ? process.constrainedMemory()
      : undefined;
  const availableMemory =
    typeof process.availableMemory === "function"
      ? process.availableMemory()
      : undefined;
  const cgroup = readCgroupMemory();

  return {
    nodeVersion: process.version,
    pid: process.pid,
    uptimeSeconds: Math.round(process.uptime() * 100) / 100,
    process: {
      rss: toMetric(used.rss),
      heapTotal: toMetric(used.heapTotal),
      heapUsed: toMetric(used.heapUsed),
      external: toMetric(used.external),
      arrayBuffers: toMetric(used.arrayBuffers),
    },
    runtime: {
      constrainedMemory: parseMetric(constrainedMemory),
      availableMemory: parseMetric(availableMemory),
    },
    cgroup,
  };
};
