/**
 * @tsplus static Closure/Ops __call
 */
export function makeClosure<A>(combine: (x: A, y: A) => A): Closure<A> {
  return {
    _Closure: "Closure",
    combine
  };
}
