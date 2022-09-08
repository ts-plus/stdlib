import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
/**
 * Use a `Covariant<F>` and a `Recursive.Fn` function to perform a *depth-first* reduction
 * of the `Recursive<F>` structure.  The supplied function will receive the current term
 * with all of its recursive elements replaced by the computed value of its children,
 * i.e. a _catamorphism_
 *
 * @tsplus static Recursive/Aspects fold
 * @tsplus pipeable Recursive fold
 */
export function fold<F extends HKT, Z, E = unknown, R = unknown>(
  F: Covariant<F>,
  f: Recursive.Fn<F, Z, E, R>
) {
  return (self: Recursive<F, E, R>) => go(self)
  function go(term: Recursive<F, E, R>): Z {
    return f(F.map(go)(term.caseValue))
  }
}
