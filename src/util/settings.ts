export const smoke = process.env.BENCH_SMOKE === "1";
export const repeats = smoke ? 1 : Number(process.env.BENCH_REPEATS ?? 3);

export function matchesCase(name: string): boolean {
  return !process.env.BENCH_CASE || process.env.BENCH_CASE === name;
}
