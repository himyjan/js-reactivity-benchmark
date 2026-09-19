import { retain } from "../util/cleanup";
import {
  observablePrimitive,
  computed,
  observe,
  batch,
} from "@legendapp/state";
import { ReactiveFramework } from "../util/reactiveFramework";

export const legendFramework: ReactiveFramework = {
  name: "Legend State",
  signal: <T>(initial: T) => {
    const value = observablePrimitive(initial);
    return {
      read: () => value.get() as T,
      write: (next: T) => value.set(next),
    };
  },
  computed: <T>(fn: () => T) => {
    const value = computed(fn);
    return { read: () => value.get() as T };
  },
  effect: (fn) => retain(observe(fn)),
  withBatch: (fn) => batch(fn),
  withBuild: (fn) => fn(),
};
