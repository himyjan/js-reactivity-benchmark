// Benchmarks execute sequentially. Keep roots alive until the workload finishes,
// then dispose outside the measured interval (withBuild itself is not a lifetime).
let cleanups: (() => void)[] = [];
export function retain(cleanup: (() => void) | void): void {
  if (cleanup) cleanups.push(cleanup);
}
export function dispose(): void {
  const pending = cleanups;
  cleanups = [];
  for (const cleanup of pending.reverse()) cleanup();
}
