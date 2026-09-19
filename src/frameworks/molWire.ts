import { retain } from "../util/cleanup";
import { ReactiveFramework, Signal } from "../util/reactiveFramework";
import { createRequire } from "node:module";
// Its ESM entry mutates module namespace objects; use the supported Node CJS entry.
const $: typeof import("mol_wire_lib") = createRequire(import.meta.url)(
  "mol_wire_lib"
);

const Atom = $.$mol_wire_atom; // fix a bug in mol exports

export const molWireFramework: ReactiveFramework = {
  name: "$mol_wire",
  signal: <T>(initialValue: T): Signal<T> => {
    const atom = new Atom("", (next: T = initialValue) => next);
    retain(() => atom.destructor());
    return {
      write: (v: T) => atom.put(v),
      read: () => atom.sync(),
    };
  },
  computed: (fn) => {
    const atom = new Atom("", fn);
    retain(() => atom.destructor());
    return {
      read: () => atom.sync(),
    };
  },
  effect: (fn) => {
    const atom = new Atom("", fn);
    retain(() => atom.destructor());
    atom.sync();
  },
  withBatch: (fn) => {
    fn();
    Atom.sync();
  },
  withBuild: (fn) => fn(),
};
