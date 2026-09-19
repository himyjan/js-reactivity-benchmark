import { renderMarkdown, toCsv, type Snapshot } from "./util/report";
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { cpus, platform, arch, release, totalmem } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  registry,
  suites,
  defaultFrameworks,
  FrameworkId,
  Suite,
} from "./registry";
import type { PerfRowStrings } from "./util/perfLogging";

const { values } = parseArgs({
  options: {
    report: { type: "string" },
    case: { type: "string" },
    framework: { type: "string" },
    suite: { type: "string" },
    output: { type: "string" },
    timeout: { type: "string", default: "120000" },
    repeats: { type: "string", default: "3" },
    unobserved: { type: "boolean", default: false },
    stress: { type: "boolean", default: false },
    smoke: { type: "boolean", default: false },
    worker: { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

function positiveInteger(value: string, name: string) {
  const number = Number(value);
  if (!Number.isSafeInteger(number) || number < 1)
    throw new Error(`${name} must be a positive integer`);
  return number;
}
function select<T extends string>(
  value: string | undefined,
  choices: readonly T[]
): T[] {
  const chosen = value ? value.split(",") : [...choices];
  for (const choice of chosen)
    if (!choices.includes(choice as T))
      throw new Error(
        `Unknown selection: ${choice}. Choose ${choices.join(", ")}`
      );
  return [...new Set(chosen)] as T[];
}
function packageVersion(name: string): string {
  const require = createRequire(import.meta.url);
  let directory = dirname(require.resolve(name));
  while (true) {
    try {
      const pkg = JSON.parse(
        readFileSync(resolve(directory, "package.json"), "utf8")
      );
      if (pkg.name === name) return pkg.version;
    } catch {
      /* Walk from entry point to package root (exports may hide package.json). */
    }
    const parent = dirname(directory);
    if (parent === directory) throw new Error(`Cannot find version: ${name}`);
    directory = parent;
  }
}

async function main() {
  if (values.help) {
    console.log(
      `Usage: pnpm run run [--framework ${Object.keys(registry).join(",")}]\n  [--suite ${suites.join(",")}] [--repeats 3] [--timeout 120000]\n  [--output results/latest] [--smoke] [--stress] [--unobserved] [--case name]\n  --report results/latest.json  (regenerate Markdown and CSV without benchmarking)\nTimes are milliseconds. Smoke runs are correctness checks, not performance snapshots.`
    );
    return;
  }
  if (values.report) {
    const path = resolve(values.report);
    const snapshot: Snapshot = JSON.parse(readFileSync(path, "utf8"));
    const prefix = path.replace(/\.json$/, "");
    if (prefix === path) throw new Error("--report requires a .json snapshot");
    writeFileSync(`${prefix}.md`, renderMarkdown(snapshot));
    writeFileSync(`${prefix}.csv`, toCsv(snapshot.results));
    console.error(`Regenerated ${prefix}.{md,csv}`);
    return;
  }
  const frameworks = values.framework
    ? select(values.framework, Object.keys(registry) as FrameworkId[])
    : defaultFrameworks;
  const selectedSuites = select(values.suite, suites);
  if (values.case && selectedSuites.length !== 1)
    throw new Error("--case requires exactly one --suite");
  if (values.case) process.env.BENCH_CASE = values.case;
  else delete process.env.BENCH_CASE;
  const timeout = positiveInteger(values.timeout!, "timeout");
  const repeats = positiveInteger(values.repeats!, "repeats");
  process.env.BENCH_UNOBSERVED = values.unobserved ? "1" : "0";
  process.env.BENCH_STRESS = values.stress ? "1" : "0";
  process.env.BENCH_SMOKE = values.smoke ? "1" : "0";
  process.env.BENCH_REPEATS = String(repeats);
  if (values.worker) {
    if (frameworks.length !== 1 || selectedSuites.length !== 1)
      throw new Error("Worker requires one framework and suite");
    const { runWorker } = await import("./worker");
    const rows = await runWorker(frameworks[0], selectedSuites[0]);
    // Explicit exit releases any library-owned scheduling handles after all results are written.
    process.stdout.write(JSON.stringify(rows), () => process.exit(0));
    return;
  }
  const startedAt = new Date().toISOString();
  const rows: (PerfRowStrings & { suite: Suite })[] = [];
  const failures: { framework: string; suite: Suite; error: string }[] = [];
  for (const id of frameworks) {
    for (const suite of selectedSuites) {
      process.stderr.write(`${id} / ${suite} … `);
      const child = spawnSync(
        process.execPath,
        [
          "--expose-gc",
          fileURLToPath(import.meta.url),
          "--worker",
          "--framework",
          id,
          "--suite",
          suite,
          "--repeats",
          String(repeats),
          ...(values.unobserved ? ["--unobserved"] : []),
          ...(values.case ? ["--case", values.case] : []),
          ...(values.stress ? ["--stress"] : []),
          ...(values.smoke ? ["--smoke"] : []),
        ],
        {
          encoding: "utf8",
          timeout,
          maxBuffer: 8 * 1024 * 1024,
          env: { ...process.env, NODE_ENV: "production" },
        }
      );
      try {
        if (child.error || child.status !== 0)
          throw new Error(
            [child.error?.message, child.stderr.trim(), `Exit ${child.status}`]
              .filter(Boolean)
              .join("\n")
          );
        const results: PerfRowStrings[] = JSON.parse(child.stdout);
        if (!Array.isArray(results) || !results.length)
          throw new Error("Worker returned no results");
        const expectedCount = values.case
          ? 1
          : {
              kairo: 8,
              mol: 1,
              s: 17,
              dynamic: values.smoke ? 1 : 5,
              cellx: 3,
            }[suite];
        if (
          results.length !== expectedCount ||
          new Set(results.map((r) => r.test)).size !== expectedCount
        )
          throw new Error("Incomplete or duplicate results");
        for (const row of results) {
          if (
            row.framework !== registry[id][0] ||
            !Number.isFinite(Number(row.time)) ||
            Number(row.time) < 0 ||
            row.samplesMs?.length !== (values.smoke ? 1 : repeats) ||
            row.samplesMs.some(
              (sample) => !Number.isFinite(sample) || sample < 0
            )
          )
            throw new Error("Invalid worker result");
        }
        rows.push(...results.map((row) => ({ ...row, suite })));
        process.stderr.write(`${results.length} passed\n`);
      } catch (error) {
        const message = String(error);
        failures.push({ framework: registry[id][0], suite, error: message });
        process.stderr.write(`FAILED: ${message.slice(0, 300)}\n`);
      }
    }
  }
  const metadata = {
    schemaVersion: 1,
    startedAt,
    finishedAt: new Date().toISOString(),
    profile: values.smoke ? "smoke" : "full",
    stress: values.stress,
    graphMode: values.unobserved ? "unobserved" : "observed",
    repeats: values.smoke ? 1 : repeats,
    timeout,
    node: process.version,
    v8: process.versions.v8,
    system: {
      platform: platform(),
      arch: arch(),
      release: release(),
      cpu: cpus()[0]?.model,
      logicalCpus: cpus().length,
      memoryBytes: totalmem(),
    },
    packages: Object.fromEntries(
      frameworks.map((id) => [registry[id][1], packageVersion(registry[id][1])])
    ),
    tooling: Object.fromEntries(
      ["vite", "vitest", "typescript"].map((name) => [
        name,
        packageVersion(name),
      ])
    ),
    suites: selectedSuites,
    case: values.case,
    status: failures.length ? "failed" : "passed",
  };
  const output = resolve(
    values.output ??
      `results/${values.smoke ? "smoke" : values.stress ? "stress" : values.unobserved ? "unobserved" : values.framework || values.suite ? "filtered" : "latest"}`
  );
  mkdirSync(dirname(output), { recursive: true });
  const snapshot = {
    ...metadata,
    results: rows.map(({ time, ...row }) => ({
      ...row,
      samplesMs: row.samplesMs!,
      timeMs: Number(time),
    })),
    failures,
  };
  const csv = toCsv(snapshot.results);
  writeFileSync(`${output}.csv`, csv);
  writeFileSync(`${output}.json`, JSON.stringify(snapshot, null, 2) + "\n");
  writeFileSync(`${output}.md`, renderMarkdown(snapshot));
  process.stdout.write(csv);
  process.stderr.write(`Saved ${output}.{json,csv,md}\n`);
  if (failures.length) process.exitCode = 1;
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
