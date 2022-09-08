import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
/**
 * Use a `Folder<F>`, an initial value `Z` and a `Recursive.FoldDownFn<F, Z>`
 * function to perform a breadth-first reduction of a `Recursive<F>` to a summary value `Z`.
 *
 * @tsplus static Recursive/Aspects foldDown
 * @tsplus pipeable Recursive foldDown
 */
export function foldDown<F extends HKT, Z>(
  F: Foldable<F>,
  z: Z,
  f: Recursive.FoldDownFn<F, Z>
) {
  return (self: Recursive<F>): Z => {
    const next = f(z, self)
    const iter = (z0: Z, r: Recursive<F>) => r.foldDown(F, z0, f)
    return pipe(
      self.caseValue,
      F.reduce(next, iter)
    )
  }
}
