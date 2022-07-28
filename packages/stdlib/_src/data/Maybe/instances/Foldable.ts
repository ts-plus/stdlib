import type * as P from "@tsplus/stdlib/prelude/Foldable"

/**
 * @tsplus static Maybe.Ops Foldable
 */
export const Foldable = HKT.instance<P.Foldable<Maybe.HKT>>({
  reduce: (b, f) => (fa) => fa.isNone() ? b : f(b, fa.value),
  reduceRight: (b, f) => (fa) => fa.isNone() ? b : f(fa.value, b),
  foldMap: (M) => (f) => (fa) => fa.isNone() ? M.identity : f(fa.value)
})
