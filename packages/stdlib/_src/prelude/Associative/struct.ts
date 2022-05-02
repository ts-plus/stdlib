/**
 * Given a struct of `Associative`s, returns an `Associative` for the structure.
 *
 * @tsplus static Associative/Ops struct
 */
export function struct<O extends Record<string, any>>(
  associatives: {
    [K in keyof O]: Associative<O[K]>;
  }
): Associative<{ readonly [K in keyof O]: O[K]; }> {
  return Associative((x, y) => {
    const r: O = {} as any;
    for (const k in associatives) {
      if (Object.prototype.hasOwnProperty.call(associatives, k)) {
        r[k] = associatives[k].combine(x[k], y[k]);
      }
    }
    return r;
  });
}
