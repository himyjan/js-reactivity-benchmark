import { describe, expect, test } from "vitest";
import { verifyBenchResult } from "./perfTests";
import { frameworkInfo } from "../config";
import { batchWith } from "./batch";
import { makeGraph, runGraph, Counter } from "./dependencyGraph";
import { graphOracle } from "./graphOracle";
import { dispose } from "./cleanup";
import { registry } from "../registry";

test("zero-valued expectations fail hard on incorrect output", () => {
  const config = {
    width: 2,
    totalLayers: 2,
    staticFraction: 1,
    nSources: 2,
    readFraction: 1,
    iterations: 1,
    expected: { sum: 0 },
  };
  expect(() =>
    verifyBenchResult(frameworkInfo[0], config, {
      result: { sum: 1, count: 0 },
      timing: { time: 1 },
    })
  ).toThrow();
});

test("manual batch adapters flush once, including after exceptions", () => {
  let calls = 0;
  const batch = batchWith(() => {
    calls++;
  });
  expect(() =>
    batch(() => {
      batch(() => {});
      expect(calls).toBe(0);
      throw new Error("test");
    })
  ).toThrow("test");
  expect(calls).toBe(1);
  batch(() => {});
  expect(calls).toBe(2);
});

test("registry and adapters match one-to-one", () => {
  expect(
    Object.values(registry)
      .map(([name]) => name)
      .sort()
  ).toEqual(frameworkInfo.map(({ framework }) => framework.name).sort());
});

describe.each(frameworkInfo)(
  "$framework.name numeric graph oracle",
  ({ framework }) => {
    test.each([0, 0.5, 1])(
      "matches plain evaluation with static fraction %s",
      (staticFraction) => {
        for (const readFraction of [0.25, 1]) {
          for (const iterations of [0, 1, 3, 17]) {
            const config = {
              width: 4,
              totalLayers: 5,
              staticFraction,
              nSources: 3,
              readFraction,
              iterations,
              expected: {},
            };
            try {
              const graph = makeGraph(framework, config, new Counter());
              expect(runGraph(graph, iterations, readFraction, framework)).toBe(
                graphOracle(config)
              );
            } finally {
              dispose();
            }
          }
        }
      }
    );
  }
);
