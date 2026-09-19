import { retain } from "../util/cleanup";
import { ReactiveFramework } from "../util/reactiveFramework";
import { atom, computed, react, transact } from "@tldraw/state";

export const tldrawFramework: ReactiveFramework = {
  name: "@tldraw/state",
  signal: (initialValue) => {
    const s = atom("s", initialValue);
    return {
      write: (v) => s.set(v),
      read: () => s.get(),
    };
  },
  computed: (fn) => {
    const c = computed("c", fn);
    return {
      read: () => c.get(),
    };
  },
  effect: (fn) => retain(react("r", fn)),
  withBatch: (fn) => transact(fn),
  withBuild: (fn) => fn(),
};
