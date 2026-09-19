import { test, expect } from "vitest";
import { graphOracle } from "./graphOracle";
import { perfTests } from "../config";

test("graph fixtures match the independent numeric oracle", () => {
  for (const config of perfTests) {
    expect(graphOracle(config), config.name).toBe(config.expected.sum);
  }
});
