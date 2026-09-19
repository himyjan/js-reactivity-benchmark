import {
  computed,
  effectScope,
  shallowRef,
  effect,
  ReactiveEffect,
} from "@vue/reactivity";
import { retain } from "../util/cleanup";
import { batchWith } from "../util/batch";
import { ReactiveFramework } from "../util/reactiveFramework";

const scheduled = new Set<ReactiveEffect>();
export const vueReactivityFramework: ReactiveFramework = {
  name: "@vue/reactivity",
  signal: <T>(initial: T) => {
    const data = shallowRef(initial);
    return {
      read: () => data.value as T,
      write: (value: T) => {
        data.value = value;
      },
    };
  },
  computed: (fn) => {
    const value = computed(fn);
    return { read: () => value.value };
  },
  effect: (fn) => {
    const runner = effect(fn, {
      scheduler: () => {
        scheduled.add(runner.effect);
      },
    });
    retain(() => {
      scheduled.delete(runner.effect);
      runner.effect.stop();
    });
  },
  withBatch: batchWith(() => {
    for (const effect of scheduled) {
      scheduled.delete(effect);
      if (effect.dirty) effect.run();
    }
  }),
  withBuild: (fn) => {
    const scope = effectScope();
    retain(() => scope.stop());
    return scope.run(fn)!;
  },
};
