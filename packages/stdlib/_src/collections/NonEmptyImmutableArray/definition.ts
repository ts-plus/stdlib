export interface NonEmptyImmutableArrayBrand {
  readonly NonEmptyImmutableArray: unique symbol
}
/**
 * @tsplus type NonEmptyImmutableArray
 */
export type NonEmptyImmutableArray<A> = ImmutableArray<A> & NonEmptyImmutableArrayBrand

/**
 * @tsplus type NonEmptyImmutableArray.Ops
 */
export interface NonEmptyImmutableArrayOps {
  readonly $: NonEmptyImmutableArrayAspects
}
export const NonEmptyImmutableArray: NonEmptyImmutableArrayOps = {
  $: {}
}

/**
 * @tsplus type NonEmptyImmutableArray.Aspects
 */
export interface NonEmptyImmutableArrayAspects {}
