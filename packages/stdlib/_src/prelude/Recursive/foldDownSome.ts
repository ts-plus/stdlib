import { constant } from "@tsplus/stdlib/data/Function"
import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
/**
 * @tsplus static Recursive/Aspects foldDownSome
 * @tsplus pipeable Recursive foldDownSome
 */
export function foldDownSome<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  pf: (accum: Z, current: HKT.Kind<F, unknown, unknown, Recursive<F>>) => Maybe<Z>
) {
  return (self: Recursive<F>) =>
    self.foldDown(F, z, (accum, recursive) =>
      pf(accum, recursive.caseValue).fold(
        constant(accum),
        identity
      ))
}
