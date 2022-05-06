/**
 * @tsplus static Option/Ops Foldable
 */
export const OptionFoldable = HKT.instance<Foldable<Option.HKT>>({
  reduce: (b, f) => (fa) => fa.isNone() ? b : f(b, fa.value),
  reduceRight: (b, f) => (fa) => fa.isNone() ? b : f(fa.value, b),
  foldMap: (M) => (f) => (fa) => fa.isNone() ? M.identity : f(fa.value)
});
