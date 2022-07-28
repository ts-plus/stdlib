/**
 * @tsplus static Either.Ops if
 */
export const branch = DSL.conditionalF<Either.HKT>()

/**
 * @tsplus static Either.Ops if_
 */
export const branch_ = DSL.conditionalF_<Either.HKT>()

export { branch as if, branch_ as if_ }
