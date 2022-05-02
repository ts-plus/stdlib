/**
 * Given a tuple of `AssociativeIdentity`s, returns an `AssociativeIdentity` for
 * the tuple.
 *
 * @tsplus static AssociativeIdentity/Ops tuple
 */
export function tuple<T extends ReadonlyArray<AssociativeIdentity<any>>>(
  ...identities: T
): AssociativeIdentity<
  {
    [K in keyof T]: T[K] extends Associative<infer A> ? A : never;
  }
> {
  return AssociativeIdentity(
    identities.map((m) => m.identity) as any,
    Associative.tuple(...identities).combine as any
  );
}
