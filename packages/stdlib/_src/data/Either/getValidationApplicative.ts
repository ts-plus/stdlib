/**
 * @tsplus static Either/Ops getValidationApplicative
 */
export const getValidationApplicative = Prelude.getValidationF<Either.HKT>(
  HKT.instance({
    ...Either.Monad,
    ...Either.Run,
    ...Either.Fail,
    ...Either.Applicative
  })
)
