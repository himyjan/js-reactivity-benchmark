import { expect, test, vi } from "vitest";
import { tc39SignalsFramework as framework } from "./tc39Signals";
import { dispose } from "../util/cleanup";

test("synchronous flushes coalesce the polyfill's queued microtask", async () => {
  await Promise.resolve();
  const queue = vi.spyOn(globalThis, "queueMicrotask");
  try {
    const source = framework.signal(0);
    let value = -1;
    framework.effect(() => {
      value = source.read();
    });
    for (let i = 1; i <= 100; i++) framework.withBatch(() => source.write(i));
    expect(value).toBe(100);
    expect(queue).toHaveBeenCalledTimes(1);
    await Promise.resolve();
  } finally {
    dispose();
    queue.mockRestore();
  }
});
