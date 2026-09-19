import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const directory = mkdtempSync(join(tmpdir(), "reactivity-cli-"));
function run(args, status) {
  const result = spawnSync(process.execPath, ["dist/index.js", ...args], {
    encoding: "utf8",
    timeout: 15_000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, status, result.stderr);
  return result;
}
try {
  assert.match(run(["--framework", "unknown"], 1).stderr, /Unknown selection/);
  assert.match(run(["--repeats", "0"], 1).stderr, /positive integer/);
  const output = join(directory, "result");
  const base = [
    "--framework",
    "alien",
    "--suite",
    "kairo",
    "--smoke",
    "--output",
    output,
  ];
  run([...base, "--case", "diamond"], 0);
  let snapshot = JSON.parse(readFileSync(`${output}.json`, "utf8"));
  assert.equal(snapshot.status, "passed");
  assert.equal(snapshot.results.length, 1);
  assert.equal(snapshot.results[0].test, "diamond");
  assert.equal(snapshot.results[0].samplesMs.length, 1);
  const markdown = readFileSync(`${output}.md`, "utf8");
  const csv = readFileSync(`${output}.csv`, "utf8");
  run(["--report", `${output}.json`], 0);
  assert.equal(readFileSync(`${output}.md`, "utf8"), markdown);
  assert.equal(readFileSync(`${output}.csv`, "utf8"), csv);
  run([...base, "--case", "unknown"], 1);
  snapshot = JSON.parse(readFileSync(`${output}.json`, "utf8"));
  assert.equal(snapshot.status, "failed");
  assert.equal(snapshot.results.length, 0);
  assert.equal(snapshot.failures.length, 1);
  run([...base, "--timeout", "1"], 1);
  snapshot = JSON.parse(readFileSync(`${output}.json`, "utf8"));
  assert.equal(snapshot.status, "failed");
  assert.match(snapshot.failures[0].error, /ETIMEDOUT/);
  console.log(
    "CLI checks passed: selection, validation, snapshot rendering, worker failures, timeout."
  );
} finally {
  rmSync(directory, { recursive: true, force: true });
}
