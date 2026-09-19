import { expect, test } from "vitest";
import { relativeSummary, toCsv, type ReportRow } from "./report";

const row = (framework: string, test: string, timeMs: number): ReportRow => ({
  framework,
  suite: "example",
  test,
  timeMs,
  samplesMs: [timeMs],
});

test("CSV quotes embedded commas, quotes, and newlines using doubled quotes", () => {
  expect(toCsv([row('engine,"quoted"', "one\ntwo", 1.25)])).toBe(
    'framework,suite,test,time_ms\n"engine,""quoted""","example","one\ntwo","1.25"\n'
  );
});

test("summary normalizes within cases before taking a geometric mean", () => {
  const summary = relativeSummary([
    row("a", "short", 1),
    row("b", "short", 4),
    row("a", "long", 100),
    row("b", "long", 100),
  ]);
  expect(summary).toContain("| a | 1.00× |");
  expect(summary).toContain("| b | 2.00× |");
});
