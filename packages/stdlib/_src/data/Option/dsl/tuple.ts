/**
 * @tsplus static Option/Ops tuple
 */
export const tuple = DSL.tupleF<Option.HKT>({
  ...Option.Monad,
  ...Option.Applicative
});
