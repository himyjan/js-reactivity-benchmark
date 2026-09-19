import { Random } from "random";
import type { TestConfig } from "./frameworkTypes";

/** Evaluate the final graph with plain numbers, without reactive nodes or caches. */
export function graphOracle(config: TestConfig): number {
  const {
    width,
    iterations,
    totalLayers,
    nSources,
    staticFraction,
    readFraction,
  } = config;
  let row = Array.from({ length: width }, (_, source) => {
    if (source >= iterations) return source;
    const lastWrite =
      source + Math.floor((iterations - 1 - source) / width) * width;
    return lastWrite + source;
  });
  const topology = new Random("seed");
  for (let layer = 1; layer < totalLayers; layer++) {
    const previous = row;
    row = previous.map((_, index) => {
      const isStatic = topology.float() < staticFraction;
      const first = previous[index];
      let value = first;
      for (let input = 1; input < nSources; input++) {
        if (!isStatic && first & 1 && input - 1 === first % (nSources - 1))
          continue;
        value += previous[(index + input) % width];
      }
      return value;
    });
  }
  const selection = new Random("seed");
  const skipped = Math.round(width * (1 - readFraction));
  for (let i = 0; i < skipped; i++)
    row.splice(selection.int(0, row.length - 1), 1);
  return row.reduce((sum, value) => sum + value, 0);
}
