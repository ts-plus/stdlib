/**
 * @tsplus static Option/Ops if
 */
export const branch = DSL.conditionalF<Option.HKT>()

/**
 * @tsplus static Option/Ops if_
 */
export const branch_ = DSL.conditionalF_<Option.HKT>()

export { branch as if, branch_ as if_ }
