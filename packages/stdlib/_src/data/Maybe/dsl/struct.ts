/**
 * @tsplus static Maybe.Ops struct
 */
export const struct = DSL.structF<Maybe.HKT>({
  ...Maybe.Monad,
  ...Maybe.Applicative
})
