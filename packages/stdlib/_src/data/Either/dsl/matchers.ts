const Matchers = DSL.matchers<Either.HKT>()

/**
 * @tsplus static Either.Ops match
 */
export const match = Matchers.match

/**
 * @tsplus static Either.Ops matchTag
 */
export const matchTag = Matchers.matchTag

/**
 * @tsplus static Either.Ops matchMorph
 */
export const matchMorph = Matchers.matchMorph

/**
 * @tsplus static Either.Ops matchIn
 */
export const matchIn = Matchers.matchIn

/**
 * @tsplus static Either.Ops matchTagIn
 */
export const matchTagIn = Matchers.matchTagIn
