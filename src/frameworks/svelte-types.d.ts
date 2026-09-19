// Narrow declarations for the private Svelte primitives used by this adapter.
// Runtime contract tests remain necessary because these are not public APIs.
declare module "svelte/internal/client" {
  interface Value<T> {
    readonly v: T;
  }
  export function state<T>(value: T): Value<T>;
  export function derived<T>(fn: () => T): Value<T>;
  export function get<T>(value: Value<T>): T;
  export function set<T>(source: Value<T>, value: T): T;
  export function render_effect(fn: () => void): unknown;
  export function effect_root(fn: () => void): () => void;
  export function flush<T>(fn: () => T): T;
  export function flush(): void;
}
