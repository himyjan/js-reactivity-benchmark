import { TestConfig } from "./frameworkTypes";
import { TestResult, TimingResult } from "./perfTests";

export interface PerfRowStrings {
  framework: string;
  test: string;
  time: string;
  samplesMs?: number[];
}
export const results: PerfRowStrings[] = [];
export function logPerfResult(row: PerfRowStrings): void {
  if (!Number.isFinite(Number(row.time)) || Number(row.time) < 0)
    throw new Error("Invalid timing");
  results.push(row);
}
export function perfRowStrings(
  frameworkName: string,
  config: TestConfig,
  timed: TimingResult<TestResult>
): PerfRowStrings {
  return {
    framework: frameworkName,
    test: `${makeTitle(config)} (${config.name ?? ""})`,
    time: timed.timing.time.toFixed(4),
    samplesMs: timed.timing.samplesMs,
  };
}
export function makeTitle(config: TestConfig): string {
  const { width, totalLayers, staticFraction, nSources, readFraction } = config;
  return `${width}x${totalLayers} - ${nSources} sources${staticFraction < 1 ? " - dynamic" : ""}${readFraction < 1 ? ` - read ${Math.round(readFraction * 100)}%` : ""}`;
}
