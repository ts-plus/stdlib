/**
 * @tsplus static Maybe.Ops compactF
 */
export const compactF = Witherable.implementCompactF<Maybe.HKT>()((_) =>
  (F) => (f) => (fa) => fa.isNone() ? DSL.succeedF(F)(Maybe.none) : f(fa.value)
)
