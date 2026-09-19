/** Adapt manually scheduled engines to one flush at the outer transaction boundary. */
export function batchWith(flush: () => void) {
  let depth = 0;
  return (fn: () => unknown): void => {
    depth++;
    try {
      fn();
    } finally {
      if (--depth === 0) flush();
    }
  };
}
