/**
 * Given a struct of `AssociativeIdentity`s, returns a `Identity` for the
 * structure.
 *
 * @tsplus static AssociativeIdentity/Ops struct
 */
export function struct<O extends Record<string, any>>(
  identities: {
    [K in keyof O]: AssociativeIdentity<O[K]>;
  }
): AssociativeIdentity<{ readonly [K in keyof O]: O[K]; }> {
  const r: O = {} as any;
  for (const k in identities) {
    if (Object.prototype.hasOwnProperty.call(identities, k)) {
      r[k] = identities[k].identity;
    }
  }
  return AssociativeIdentity(
    r,
    Associative.struct(identities).combine
  );
}
