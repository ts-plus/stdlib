/**
 * @tsplus static Maybe/Ops if
 */
export const branch = DSL.conditionalF<Maybe.HKT>()

/**
 * @tsplus static Maybe/Ops if_
 */
export const branch_ = DSL.conditionalF_<Maybe.HKT>()

export { branch as if, branch_ as if_ }
