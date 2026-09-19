// S.js-inspired graph shapes. Read every computed so eager and lazy engines
// both perform the advertised work. Explicit GC and validation are not timed.
import assert from "node:assert/strict";
import { logPerfResult } from "./util/perfLogging";
import { ReactiveFramework } from "./util/reactiveFramework";
import { fastestTest } from "./util/benchRepeat";
import { dispose } from "./util/cleanup";
import { repeats, smoke, matchesCase } from "./util/settings";

export async function sbench(framework: ReactiveFramework) {
  const count = smoke ? 1000 : 100_000;
  const shapes = [
    [0, 1],
    [1, 1],
    [2, 1],
    [4, 1],
    [1000, 1],
    [1, 2],
    [1, 4],
    [1, 8],
    [1, 1000],
  ] as const;

  async function report(name: string, run: () => number, expected: number) {
    if (!matchesCase(name)) return;
    const check = (value: number) => {
      assert.equal(value, expected, name);
      dispose();
    };
    check(run());
    const { timing } = await fastestTest(repeats, run, check);
    logPerfResult({
      framework: framework.name,
      test: name,
      time: timing.time.toFixed(4),
      samplesMs: timing.samplesMs,
    });
  }

  await report(
    "createDataSignals",
    () =>
      framework.withBuild(() => {
        const signals = Array.from({ length: count }, (_, i) =>
          framework.signal(i)
        );
        return signals.reduce((sum, signal) => sum + signal.read(), 0);
      }),
    (count * (count - 1)) / 2
  );

  for (const [inputs, outputs] of shapes) {
    const groups = Math.max(1, Math.floor(count / Math.max(inputs, outputs)));
    await report(
      `createComputations${inputs}to${outputs}`,
      () =>
        framework.withBuild(() => {
          const sources = Array.from({ length: groups * inputs }, () =>
            framework.signal(1)
          );
          let sum = 0;
          for (let group = 0; group < groups; group++) {
            for (let out = 0; out < outputs; out++) {
              const computed = framework.computed(() => {
                let value = 0;
                for (let input = 0; input < inputs; input++)
                  value += sources[group * inputs + input].read();
                return value;
              });
              sum += computed.read();
            }
          }
          return sum;
        }),
      groups * outputs * inputs
    );
  }

  for (const [inputs, outputs] of shapes.filter(
    ([inputs, outputs]) => inputs > 0 && outputs !== 8
  )) {
    if (!matchesCase(`updateComputations${inputs}to${outputs}`)) continue;
    const writes = Math.max(
      2,
      Math.floor((count * 4) / Math.max(inputs, outputs))
    );
    let sources: ReturnType<ReactiveFramework["signal"]>[];
    let leaves: ReturnType<ReactiveFramework["computed"]>[];
    const setup = () =>
      framework.withBuild(() => {
        sources = Array.from({ length: inputs }, () => framework.signal(1));
        leaves = Array.from({ length: outputs }, () =>
          framework.computed(() =>
            sources.reduce((sum, source) => sum + Number(source.read()), 0)
          )
        );
        leaves.forEach((leaf) => leaf.read());
      });
    const run = () => {
      let sum = 0;
      for (let i = 0; i < writes; i++) {
        framework.withBatch(() => sources[0].write(i));
        for (const leaf of leaves) sum += Number(leaf.read());
      }
      return sum;
    };
    setup();
    const expected =
      outputs * ((writes * (writes - 1)) / 2 + writes * (inputs - 1));
    assert.equal(run(), expected);
    dispose();
    // A fresh graph per measured sample, built before starting the clock.
    const samplesMs: number[] = [];
    let fastest = Infinity;
    for (let sample = 0; sample < repeats; sample++) {
      setup();
      globalThis.gc?.();
      const start = performance.now();
      const actual = run();
      const elapsed = performance.now() - start;
      samplesMs.push(elapsed);
      fastest = Math.min(fastest, elapsed);
      assert.equal(actual, expected);
      dispose();
      globalThis.gc?.();
    }
    logPerfResult({
      framework: framework.name,
      test: `updateComputations${inputs}to${outputs}`,
      time: fastest.toFixed(4),
      samplesMs,
    });
  }
}
