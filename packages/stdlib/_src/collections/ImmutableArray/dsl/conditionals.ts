/**
 * @tsplus fluent ImmutableArray if
 */
export const branch_ = DSL.conditionalF_<ImmutableArray.HKT>()

/**
 * @tsplus static ImmutableArray/Ops if
 */
export const branch = DSL.conditionalF<ImmutableArray.HKT>()

export { branch as if, branch_ as if_ }
