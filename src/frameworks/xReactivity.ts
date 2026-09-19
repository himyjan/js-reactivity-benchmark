// Based on upstream's x-reactivity adapter, using the current package API.
import {
  createEffect,
  createMemo,
  createRoot,
  createSignal,
  flush,
} from "@solidjs/signals";
import { retain } from "../util/cleanup";
import { ReactiveFramework } from "../util/reactiveFramework";

let batchDepth = 0;

export const xReactivityFramework: ReactiveFramework = {
  name: "x-reactivity",
  signal: (initialValue) => {
    const [read, write] = createSignal(
      initialValue as Exclude<typeof initialValue, Function>,
      { ownedWrite: true }
    );
    let current = initialValue;
    return {
      read: () => {
        read();
        return current;
      },
      write: (value) => {
        current = value;
        write(value as never);
        if (batchDepth === 0) flush();
      },
    };
  },
  computed: (fn) => ({ read: createMemo(fn) }),
  effect: (fn) => createEffect(fn, () => {}),
  withBatch: (fn) => {
    batchDepth++;
    try {
      fn();
    } finally {
      if (--batchDepth === 0) flush();
    }
  },
  withBuild: (fn) =>
    createRoot((dispose) => {
      retain(dispose);
      return fn();
    }),
};
