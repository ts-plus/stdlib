declare global {
  /**
   * @tsplus type Array
   */
  export interface Array<T> {}
}

/**
 * @tsplus type ImmutableArray
 * @tsplus companion ImmutableArray/Ops
 */
export class ImmutableArray<A> implements Equals, Collection<A> {
  constructor(readonly array: ReadonlyArray<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this.array[Symbol.iterator]();
  }

  [Equals.sym](this: this, other: unknown): boolean {
    return (
      other instanceof ImmutableArray &&
      this.array.length === other.array.length &&
      this.array.every((v, i) => Equals.equals(v, other.array[i]))
    );
  }

  [Hash.sym](this: this): number {
    return Hash.array(this.array);
  }
}

export interface ImmutableArrayF extends HKT {
  readonly type: ImmutableArray<this["A"]>;
}

export declare namespace ImmutableArray {
  export type HKT = ImmutableArrayF;
}

/**
 * @tsplus type ImmutableArray/Aspects
 */
export interface ImmutableArrayAspects {}
/**
 * @tsplus static ImmutableArray/Ops $
 */
export const ImmutableArrayAspects: ImmutableArrayAspects = {};

/**
 * @tsplus macro pipe
 * @tsplus fluent ImmutableArray __call
 */
export const immutableArrayPipe: typeof pipe = pipe;
