import assert from "node:assert/strict";
import { repeats, smoke, matchesCase } from "./util/settings";
import { dispose } from "./util/cleanup";
import { fastestTest } from "./util/benchRepeat";
import { logPerfResult } from "./util/perfLogging";
import { ReactiveFramework } from "./util/reactiveFramework";

function fib(n: number): number {
  return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
}
function hard(n: number) {
  return n + fib(16);
}
const numbers = [0, 1, 2, 3, 4];

export async function molBench(framework: ReactiveFramework) {
  if (!matchesCase("molBench")) return;
  const observed = { h: 0, g: 0, j: 0 };
  const iter = framework.withBuild(() => {
    const a = framework.signal(0);
    const b = framework.signal(0);
    const c = framework.computed(() => (a.read() % 2) + (b.read() % 2));
    const d = framework.computed(() =>
      numbers.map((i) => ({ x: i + (a.read() % 2) - (b.read() % 2) }))
    );
    const e = framework.computed(() =>
      hard(c.read() + a.read() + d.read()[0].x)
    );
    const f = framework.computed(() => hard(d.read()[2].x || b.read()));
    const g = framework.computed(
      () => c.read() + (c.read() || e.read() % 2) + d.read()[4].x + f.read()
    );
    framework.effect(() => {
      observed.h = hard(g.read());
    });
    framework.effect(() => {
      observed.g = g.read();
    });
    framework.effect(() => {
      observed.j = hard(f.read());
    });
    return (i: number) => {
      framework.withBatch(() => {
        b.write(1);
        a.write(1 + i * 2);
      });
      framework.withBatch(() => {
        a.write(2 + i * 2);
        b.write(2);
      });
    };
  });
  const verify = () =>
    assert.deepEqual(observed, { h: 3201, g: 1604, j: 3196 });
  iter(1);
  verify();
  const { timing } = await fastestTest(
    repeats,
    () => {
      for (let i = 0; i < (smoke ? 10 : 10_000); i++) iter(i);
    },
    verify
  );
  dispose();
  logPerfResult({
    framework: framework.name,
    test: "molBench",
    time: timing.time.toFixed(4),
    samplesMs: timing.samplesMs,
  });
}
