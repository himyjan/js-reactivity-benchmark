import { frameworkInfo } from "./config";
import { registry, FrameworkId, Suite } from "./registry";
import { dynamicBench } from "./dynamicBench";
import { sbench } from "./sBench";
import { molBench } from "./molBench";
import { kairoBench } from "./kairoBench";
import { cellxbench } from "./cellxBench";
import { results } from "./util/perfLogging";
import { dispose } from "./util/cleanup";

export async function runWorker(id: FrameworkId, suite: Suite) {
  const info = frameworkInfo.find(
    ({ framework }) => framework.name === registry[id][0]
  );
  if (!info) throw new Error(`Missing adapter: ${id}`);
  const tasks = {
    kairo: () => kairoBench(info.framework),
    mol: () => molBench(info.framework),
    s: () => sbench(info.framework),
    dynamic: () => dynamicBench(info),
    cellx: () => cellxbench(info.framework),
  };
  try {
    await tasks[suite]();
  } finally {
    dispose();
  }
  return results;
}
