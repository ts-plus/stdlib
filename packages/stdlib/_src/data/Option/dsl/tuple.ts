/**
 * @tsplus static Option/Ops tuple
 */
export const tuple = Prelude.tupleF<Option.HKT>({
  ...Option.Monad,
  ...Option.Applicative
})
