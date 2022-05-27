/**
 * @tsplus static Option/Ops struct
 */
export const struct = Prelude.structF<Option.HKT>({
  ...Option.Monad,
  ...Option.Applicative
})
