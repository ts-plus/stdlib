/**
 * @tsplus static Option/Ops struct
 */
export const struct = DSL.structF<Option.HKT>({
  ...Option.Monad,
  ...Option.Applicative
});
