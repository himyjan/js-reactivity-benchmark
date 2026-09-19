import { batchWith } from "../util/batch";
import { retain } from "../util/cleanup";
import { ReactiveFramework } from "../util/reactiveFramework";
import { Signal } from "signal-polyfill";

export const tc39SignalsFramework: ReactiveFramework = {
  name: "TC39 Signals Polyfill",
  signal: (initialValue) => {
    const s = new Signal.State(initialValue);
    return {
      write: (v) => s.set(v),
      read: () => s.get(),
    };
  },
  computed: (fn) => {
    const c = new Signal.Computed(fn);
    return {
      read: () => c.get(),
    };
  },
  effect: (fn) => retain(effect(fn)),
  withBatch: batchWith(processPending),
  withBuild: (fn) => fn(),
};

// Synchronous batch flushes must not enqueue another microtask on every write.
let scheduled = false;
const w = new Signal.subtle.Watcher(() => {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    processPending();
  });
});

function processPending() {
  for (const s of w.getPending()) {
    s.get();
  }

  w.watch();
}

function effect(callback: () => void | (() => void)) {
  let cleanup: void | (() => void);

  const computed = new Signal.Computed(() => {
    typeof cleanup === "function" && cleanup();
    cleanup = callback();
  });

  w.watch(computed);
  computed.get();

  return () => {
    w.unwatch(computed);
    typeof cleanup === "function" && cleanup();
  };
}
