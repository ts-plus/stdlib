/**
 * @tsplus fluent ImmutableArray if
 */
export const branch_ = Prelude.conditionalF_<ImmutableArray.HKT>()

/**
 * @tsplus static ImmutableArray/Ops if
 */
export const branch = Prelude.conditionalF<ImmutableArray.HKT>()

export { branch as if, branch_ as if_ }
