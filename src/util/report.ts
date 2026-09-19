export interface ReportRow {
  framework: string;
  suite: string;
  test: string;
  timeMs: number;
  samplesMs: number[];
}
export interface Snapshot {
  startedAt: string;
  finishedAt: string;
  profile: string;
  graphMode: string;
  stress: boolean;
  status: string;
  repeats: number;
  node: string;
  system: { cpu?: string; platform: string; arch: string };
  packages: Record<string, string>;
  results: ReportRow[];
  failures: { framework: string; suite: string; error: string }[];
}

const cell = (value: string) =>
  value.replaceAll("|", "\\|").replaceAll("\n", " ");
export function toCsv(rows: ReportRow[]): string {
  const quote = (value: string | number) =>
    `"${String(value).replaceAll('"', '""')}"`;
  return (
    [
      "framework,suite,test,time_ms",
      ...rows.map((row) =>
        [row.framework, row.suite, row.test, row.timeMs].map(quote).join(",")
      ),
    ].join("\n") + "\n"
  );
}

/** Each test contributes equally within its suite, irrespective of duration. */
export function relativeSummary(rows: ReportRow[]): string {
  const frameworks = [...new Set(rows.map((row) => row.framework))];
  const suites = [...new Set(rows.map((row) => row.suite))];
  if (frameworks.length < 2) return "";
  const scores = frameworks.map((framework) => {
    return suites.map((suite) => {
      const cases = rows.filter((row) => row.suite === suite);
      const own = cases.filter((row) => row.framework === framework);
      const testNames = new Set(cases.map((row) => row.test));
      if (own.length !== testNames.size || own.some((row) => row.timeMs <= 0))
        return "—";
      const ratios = own.map(
        (row) =>
          row.timeMs /
          Math.min(
            ...cases
              .filter((candidate) => candidate.test === row.test)
              .map((candidate) => candidate.timeMs)
          )
      );
      if (ratios.some((ratio) => !Number.isFinite(ratio))) return "—";
      return `${Math.exp(ratios.reduce((sum, ratio) => sum + Math.log(ratio), 0) / ratios.length).toFixed(2)}×`;
    });
  });
  return `## Comparison by workload family\n\nGeometric mean of each case's time divided by the fastest engine on that case. Lower is better; 1× means fastest on every case in that family. Cases have equal weight within a family. There is no overall score. Small CellX timings are particularly sensitive to noise.\n\n| Engine | ${suites.join(" | ")} |\n| --- | ${suites.map(() => "---:").join(" | ")} |\n${frameworks.map((framework, i) => `| ${cell(framework)} | ${scores[i].join(" | ")} |`).join("\n")}\n\n`;
}

export function renderMarkdown(snapshot: Snapshot): string {
  const { results, failures } = snapshot;
  const summary =
    snapshot.status === "passed" && snapshot.profile === "full"
      ? relativeSummary(results)
      : "";
  return `# Benchmark snapshot\n\n${snapshot.startedAt} → ${snapshot.finishedAt}\n\n**${snapshot.status}** · ${snapshot.profile} · ${snapshot.graphMode} graphs · CellX ${snapshot.stress ? "stress" : "standard"}\n\n${snapshot.node} · ${snapshot.system.cpu} · ${snapshot.system.platform} ${snapshot.system.arch}\n\n${results.length} measurements; ${failures.length} failed suites. Times are milliseconds. Each framework/suite runs in a fresh process; values are the minimum of ${snapshot.repeats} samples. Explicit GC is outside timing. Raw samples are in the adjacent JSON file. See the repository README for workload definitions and limitations.\n\n${summary}## Packages\n\n| Package | Version |\n| --- | --- |\n${Object.entries(
    snapshot.packages
  )
    .map(([name, version]) => `| ${cell(name)} | ${cell(version)} |`)
    .join(
      "\n"
    )}\n\n## Measurements\n\n| Framework | Suite | Test | ms |\n| --- | --- | --- | ---: |\n${results.map((row) => `| ${cell(row.framework)} | ${cell(row.suite)} | ${cell(row.test)} | ${row.timeMs.toFixed(4)} |`).join("\n")}\n${failures.length ? `\n## Failures\n\n${failures.map((failure) => `- ${cell(failure.framework)} / ${cell(failure.suite)}: ${cell(failure.error)}`).join("\n")}\n` : ""}`;
}
