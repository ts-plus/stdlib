import { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
import type { Unfolder } from "@tsplus/stdlib/prelude/Recursive/Unfolder"

/**
 * Use a `Covariant<F>` and an `Unfolder.Fn<F, Z>` function to generate a Recurisve<F>
 * structure.  The `unfolder` is non-recursive and generates a single level of the
 * structure.
 * i.e. _anamorphism_
 *
 * @tsplus static Recursive/Ops unfold
 */
export function unfold<F extends HKT, Z, E = unknown, R = unknown>(
  F: Covariant<F>,
  unfolder: Unfolder.Fn<F, Z, E, R>
): (a: Z) => Recursive<F, E, R> {
  return function self(a): Recursive<F, E, R> {
    return Recursive(F.map(self)(unfolder(a)))
  }
}
