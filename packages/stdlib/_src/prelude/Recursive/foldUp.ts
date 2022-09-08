import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
/**
 * @tsplus fluent Recursive/Aspects foldUp
 * @tsplus pipeable Recursive foldUp
 */
export function foldUp<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
) {
  return (self: Recursive<F>): Z =>
    pipe(
      self.caseValue,
      F.reduceRight(z, (r: Recursive<F>, accum) => r.foldUp(F, accum, f)),
      (z0) => f(z0, self)
    )
}
