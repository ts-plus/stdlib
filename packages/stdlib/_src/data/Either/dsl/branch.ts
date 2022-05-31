/**
 * @tsplus static Either/Ops if
 */
export const branch = Prelude.conditionalF<Either.HKT>()

/**
 * @tsplus static Either/Ops if_
 */
export const branch_ = Prelude.conditionalF_<Either.HKT>()

export { branch as if, branch_ as if_ }
