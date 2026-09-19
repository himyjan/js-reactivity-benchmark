import { batchWith } from "../util/batch";
import { retain } from "../util/cleanup";
import { ReactiveFramework } from "../util/reactiveFramework";
import $ from "oby";

export const obyFramework: ReactiveFramework = {
  name: "Oby",
  signal: (initialValue) => {
    const observable = $(initialValue);
    return {
      write: (v) => observable(v),
      read: () => observable(),
    };
  },
  computed: (fn) => {
    const memo = $.memo(fn);
    return {
      read: () => memo(),
    };
  },
  effect: (fn) => {
    return $.effect(fn, { sync: "init" });
  },
  withBatch: batchWith(() => $.tick()),
  withBuild: (fn) =>
    $.root((dispose) => {
      retain(dispose);
      return fn();
    }),
};
