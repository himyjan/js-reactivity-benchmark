import { TimingResult } from "./perfTests";
import { runTimed } from "./perfUtil";

/** Minimum of repeated samples; validation and explicit GC are outside timing. */
export async function fastestTest<T>(
  times: number,
  fn: () => T,
  afterEach?: (result: T) => void
): Promise<TimingResult<T>> {
  if (!Number.isInteger(times) || times < 1)
    throw new Error("Invalid repeat count");
  const samplesMs: number[] = [];
  let fastest: TimingResult<T> | undefined;
  for (let i = 0; i < times; i++) {
    globalThis.gc?.();
    const { result, time } = runTimed(fn);
    samplesMs.push(time);
    afterEach?.(result);
    if (!fastest || time < fastest.timing.time)
      fastest = { result, timing: { time } };
    globalThis.gc?.();
  }
  fastest!.timing.samplesMs = samplesMs;
  return fastest!;
}
