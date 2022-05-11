export interface NonEmptyImmutableArrayBrand {
  readonly NonEmptyImmutableArray: unique symbol;
}
/**
 * @tsplus type NonEmptyImmutableArray
 */
export type NonEmptyImmutableArray<A> = ImmutableArray<A> & NonEmptyImmutableArrayBrand;

/**
 * @tsplus type NonEmptyImmutableArray/Ops
 */
export interface NonEmptyImmutableArrayOps {
  readonly $: NonEmptyImmutableArrayAspects;
}
export const NonEmptyImmutableArray: NonEmptyImmutableArrayOps = {
  $: {}
};

/**
 * @tsplus type NonEmptyImmutableArray/Aspects
 */
export interface NonEmptyImmutableArrayAspects {}

/**
 * @tsplus macro pipe
 * @tsplus fluent NonEmptyImmutableArray __call
 */
export const nonEmptyImmutableArrayPipe: typeof pipe = pipe;
