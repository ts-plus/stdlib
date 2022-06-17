/**
 * @tsplus static Maybe/Ops tuple
 */
export const tuple = DSL.tupleF<Maybe.HKT>({
  ...Maybe.Monad,
  ...Maybe.Applicative
})
