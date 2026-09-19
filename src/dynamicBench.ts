import { Counter, makeGraph, runGraph } from "./util/dependencyGraph";
import { logPerfResult, perfRowStrings } from "./util/perfLogging";
import { verifyBenchResult } from "./util/perfTests";
import { FrameworkInfo, TestConfig } from "./util/frameworkTypes";
import { perfTests } from "./config";
import { fastestTest } from "./util/benchRepeat";
import { dispose } from "./util/cleanup";
import { repeats, smoke, matchesCase } from "./util/settings";

export async function dynamicBench(
  frameworkTest: FrameworkInfo
): Promise<void> {
  const { framework } = frameworkTest;
  const configs: TestConfig[] = smoke
    ? [
        {
          name: "smoke graph",
          width: 3,
          totalLayers: 3,
          staticFraction: 1,
          nSources: 2,
          readFraction: 1,
          iterations: 2,
          expected: { sum: 16, count: 11 },
        },
      ]
    : perfTests;
  for (const config of configs) {
    if (!matchesCase(config.name!)) continue;
    function runOnce() {
      const counter = new Counter();
      const graph = makeGraph(framework, config, counter);
      const sum = runGraph(
        graph,
        config.iterations,
        config.readFraction,
        framework
      );
      return { sum, count: counter.count };
    }
    const warmup = runOnce();
    verifyBenchResult(frameworkTest, config, {
      result: warmup,
      timing: { time: 0 },
    });
    dispose();
    const timed = await fastestTest(repeats, runOnce, (result) => {
      verifyBenchResult(frameworkTest, config, { result, timing: { time: 0 } });
      dispose();
    });
    logPerfResult(perfRowStrings(framework.name, config, timed));
  }
}
