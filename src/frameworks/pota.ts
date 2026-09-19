// Adapted from aeb921183b89207a3c562118714565559f81ac79 for current Pota.
import { batch, effect, memo, root, signal } from "pota";
import { retain } from "../util/cleanup";
import { ReactiveFramework } from "../util/reactiveFramework";

export const potaFramework: ReactiveFramework = {
  name: "Pota",
  signal: (initialValue) => {
    const value = signal(initialValue);
    return {
      read: () => value.read(),
      write: (next) => {
        value.write(next);
      },
    };
  },
  computed: (fn) => ({ read: memo(fn) }),
  effect: (fn) => effect(fn),
  withBatch: (fn) => batch(fn),
  withBuild: (fn) =>
    root((dispose) => {
      retain(dispose);
      return fn();
    }),
};
