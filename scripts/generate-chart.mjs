#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const inputPath = resolve(root, process.argv[2] ?? "results/latest.json");
const outputPath = resolve(
  root,
  process.argv[3] ?? "docs/latest-benchmark.svg"
);

const report = JSON.parse(await readFile(inputPath, "utf8"));
if (report.status !== "passed") {
  throw new Error(`Cannot chart a failed benchmark report: ${report.status}`);
}

const byFramework = new Map();
for (const result of report.results) {
  const entry = byFramework.get(result.framework) ?? { total: 0, count: 0 };
  entry.total += result.timeMs;
  entry.count++;
  byFramework.set(result.framework, entry);
}

const rows = [...byFramework.entries()]
  .map(([framework, { total, count }]) => ({
    framework,
    average: total / count,
    count,
  }))
  .sort((a, b) => a.average - b.average);

if (rows.length === 0)
  throw new Error("The benchmark report has no measurements");

const width = 1800;
const left = 390;
const right = 90;
const top = 120;
const rowHeight = 68;
const bottom = 95;
const height = top + rows.length * rowHeight + bottom;
const plotWidth = width - left - right;
const max = Math.max(...rows.map((row) => row.average));
const fastest = rows[0].average;
const slowest = rows.at(-1).average;

const escape = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const color = (index) => {
  const t = rows.length === 1 ? 0 : index / (rows.length - 1);
  const r = Math.round(20 + (255 - 20) * t);
  const g = Math.round(150 * (1 - t));
  return `rgb(${r},${g},20)`;
};

const grid = [0, 0.25, 0.5, 0.75, 1]
  .map((fraction) => {
    const x = left + plotWidth * fraction;
    const value = max * fraction;
    return (
      `<line x1="${x}" y1="${top - 24}" x2="${x}" y2="${height - bottom + 8}" stroke="#c8c8c8" stroke-dasharray="6 6" />\n` +
      `<text x="${x}" y="${height - 36}" text-anchor="middle" fill="#333" font-size="24">${value.toFixed(0)}</text>`
    );
  })
  .join("\n");

const bars = rows
  .map((row, index) => {
    const y = top + index * rowHeight;
    const barWidth = (row.average / max) * plotWidth;
    const labelOutsideX = left + barWidth + 12;
    const labelInside = labelOutsideX > width - right - 72;
    const valueX = labelInside ? left + barWidth - 12 : labelOutsideX;
    const valueAnchor = labelInside ? "end" : "start";
    const valueFill = labelInside ? "white" : "#222";
    return (
      `<text x="${left - 18}" y="${y + 34}" text-anchor="end" fill="#222" font-size="28">${escape(row.framework)}</text>\n` +
      `<rect x="${left}" y="${y + 8}" width="${barWidth}" height="${rowHeight - 16}" rx="2" fill="${color(index)}" />\n` +
      `<text x="${valueX}" y="${y + 34}" text-anchor="${valueAnchor}" fill="${valueFill}" font-size="22">${row.average.toFixed(1)} ms</text>`
    );
  })
  .join("\n");

const generatedAt = new Date().toISOString().slice(0, 10);
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">JavaScript framework benchmark times, fastest to slowest</title>
  <desc id="desc">Average time across ${report.results.length} benchmark measurements. Bars interpolate from green for fastest to red for slowest.</desc>
  <rect width="100%" height="100%" fill="white" />
  <text x="${width / 2}" y="55" text-anchor="middle" fill="#333" font-size="40" font-family="system-ui, sans-serif">JavaScript Framework Benchmark Times (Fastest to Slowest)</text>
  <text x="${width / 2}" y="88" text-anchor="middle" fill="#666" font-size="20" font-family="system-ui, sans-serif">Arithmetic mean across ${report.results.length} measurements · ${generatedAt} · lower is better</text>
  ${grid}
  ${bars}
  <line x1="${left}" y1="${top - 24}" x2="${left}" y2="${height - bottom + 8}" stroke="#222" stroke-width="2" />
  <text x="${left + plotWidth / 2}" y="${height - 5}" text-anchor="middle" fill="#333" font-size="26">Average time (ms)</text>
</svg>
`;

await writeFile(outputPath, svg);
console.log(`Wrote ${outputPath}`);
console.log(`Fastest: ${rows[0].framework} (${fastest.toFixed(1)} ms)`);
console.log(`Slowest: ${rows.at(-1).framework} (${slowest.toFixed(1)} ms)`);
