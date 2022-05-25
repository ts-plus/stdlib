/**
 * @tsplus static Either/Ops getValidationApplicative
 */
export const getValidationApplicative = DSL.getValidationF<Either.HKT>(
  HKT.instance({
    ...Either.Monad,
    ...Either.Run,
    ...Either.Fail,
    ...Either.Applicative
  })
)
