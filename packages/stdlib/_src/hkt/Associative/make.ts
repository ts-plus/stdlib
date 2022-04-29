/**
 * @tsplus static Associative/Ops __call
 */
export function makeAssociative<A>(combine: (x: A, y: A) => A): Associative<A> {
  return {
    _Associative: "Associative",
    _Closure: "Closure",
    combine
  };
}
