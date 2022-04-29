/**
 * @tsplus static Identity/Ops __call
 */
export function makeIdentity<A>(identity: A, combine: (x: A, y: A) => A): Identity<A> {
  return {
    _Closure: "Closure",
    _Associative: "Associative",
    combine,
    identity
  };
}
