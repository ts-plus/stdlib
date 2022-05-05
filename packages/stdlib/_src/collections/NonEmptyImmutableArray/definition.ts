/**
 * @tsplus type NonEmptyImmutableArray
 * @tsplus companion NonEmptyImmutableArray/Ops
 */
export class NonEmptyImmutableArray<A> extends ImmutableArray<A> {
  constructor(readonly array: ReadonlyArray<A> & { readonly 0: A; }) {
    super(array);
  }
}

/**
 * @tsplus type NonEmptyImmutableArray/Aspects
 */
export interface NonEmptyImmutableArrayAspects {}
/**
 * @tsplus static NonEmptyImmutableArray/Ops $
 */
export const NonEmptyImmutableArrayAspects: NonEmptyImmutableArrayAspects = {};

/**
 * @tsplus macro pipe
 * @tsplus fluent NonEmptyImmutableArray __call
 */
export const nonEmptyImmutableArrayPipe: typeof pipe = pipe;
