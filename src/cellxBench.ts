import { dispose } from "./util/cleanup";
import { repeats, matchesCase } from "./util/settings";
import assert from "node:assert/strict";
// The following is an implementation of the cellx benchmark https://github.com/Riim/cellx/blob/master/perf/perf.html
import { logPerfResult } from "./util/perfLogging";
import { Computed, ReactiveFramework } from "./util/reactiveFramework";

const cellx = (framework: ReactiveFramework, layers: number) => {
  return framework.withBuild(() => {
    const start = {
      prop1: framework.signal(1),
      prop2: framework.signal(2),
      prop3: framework.signal(3),
      prop4: framework.signal(4),
    };

    let layer: {
      prop1: Computed<number>;
      prop2: Computed<number>;
      prop3: Computed<number>;
      prop4: Computed<number>;
    } = start;

    for (let i = layers; i > 0; i--) {
      const m = layer;
      const s = {
        prop1: framework.computed(() => m.prop2.read()),
        prop2: framework.computed(() => m.prop1.read() - m.prop3.read()),
        prop3: framework.computed(() => m.prop2.read() + m.prop4.read()),
        prop4: framework.computed(() => m.prop3.read()),
      };

      framework.effect(() => s.prop1.read());
      framework.effect(() => s.prop2.read());
      framework.effect(() => s.prop3.read());
      framework.effect(() => s.prop4.read());

      s.prop1.read();
      s.prop2.read();
      s.prop3.read();
      s.prop4.read();

      layer = s;
    }

    const end = layer;

    const startTime = performance.now();

    const before = [
      end.prop1.read(),
      end.prop2.read(),
      end.prop3.read(),
      end.prop4.read(),
    ] as const;

    framework.withBatch(() => {
      start.prop1.write(4);
      start.prop2.write(3);
      start.prop3.write(2);
      start.prop4.write(1);
    });

    const after = [
      end.prop1.read(),
      end.prop2.read(),
      end.prop3.read(),
      end.prop4.read(),
    ] as const;

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return [elapsedTime, before, after] as const;
  });
};

const arraysEqual = (a: readonly number[], b: readonly number[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

type BenchmarkResults = [
  readonly [number, number, number, number],
  readonly [number, number, number, number],
];

export const cellxbench = (framework: ReactiveFramework) => {
  globalThis.gc?.();

  // An independent non-reactive oracle makes depth configurable without stale fixtures.
  function reference(
    depth: number,
    initial: number[]
  ): readonly [number, number, number, number] {
    let [a, b, c, d] = initial;
    for (let i = 0; i < depth; i++) [a, b, c, d] = [b, a - c, b + d, c];
    return [a, b, c, d];
  }
  const depths =
    process.env.BENCH_STRESS === "1" ? [1000, 2500, 5000] : [10, 20, 30];
  const expected: Record<number, BenchmarkResults> = Object.fromEntries(
    depths.map((depth) => [
      depth,
      [reference(depth, [1, 2, 3, 4]), reference(depth, [4, 3, 2, 1])],
    ])
  );

  for (const layers of depths) {
    if (!matchesCase(`cellx${layers}`)) continue;
    const verify = (before: readonly number[], after: readonly number[]) => {
      assert(
        arraysEqual(before, expected[layers][0]),
        `CellX ${layers}: wrong initial values`
      );
      assert(
        arraysEqual(after, expected[layers][1]),
        `CellX ${layers}: wrong updated values`
      );
    };
    const [, warmBefore, warmAfter] = cellx(framework, layers);
    verify(warmBefore, warmAfter);
    dispose();
    const samplesMs: number[] = [];
    for (let i = 0; i < repeats; i++) {
      globalThis.gc?.();
      const [elapsed, before, after] = cellx(framework, layers);
      verify(before, after);
      samplesMs.push(elapsed);
      dispose();
    }
    logPerfResult({
      framework: framework.name,
      test: `cellx${layers}`,
      time: Math.min(...samplesMs).toFixed(4),
      samplesMs,
    });
  }
  globalThis.gc?.();
};
