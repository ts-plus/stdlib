/**
 * @tsplus static Option/Ops compactF
 */
export const compactF = Witherable.implementCompactF<Option.HKT>()((_) =>
  (F) => (f) => (fa) => fa.isNone() ? DSL.succeedF(F)(Option.none) : f(fa.value)
);
