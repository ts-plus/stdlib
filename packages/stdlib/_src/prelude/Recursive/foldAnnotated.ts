import { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"
import type { Recursive } from "@tsplus/stdlib/prelude/Recursive/definition"
/**
 * Use a `Covariant<F>` and a `Annotated.Fn` function to perform a *depth-first* reduction
 * of the `Recursive<F>` structure. The supplied function will receive the current term
 * with all of its recursive elements replaced with *both* the computed value of the
 * sub-structure *and* the value of the computation for all of _its_ children.
 * i.e. _histomorphism_
 *
 * @tsplus static Recursive/Aspects foldAnnotated
 * @tsplus pipeable Recursive foldAnnotated
 */
export function foldAnnotated<F extends HKT, Z>(
  F: Covariant<F>,
  f: Annotated.Fn<F, Z>
) {
  return (self: Recursive<F>) => foldAnnotated_(self, F, f)
}

function foldAnnotated_<F extends HKT, Z>(
  self: Recursive<F>,
  F: Covariant<F>,
  f: Annotated.Fn<F, Z>
): Z {
  function annotate(recursive: Recursive<F>): Annotated<F, Z> {
    const calc = F.map(annotate)(recursive.caseValue)
    return Annotated(calc, f(calc))
  }
  return annotate(self).annotations
}
