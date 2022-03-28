export const TupleSym: unique symbol = Symbol.for("tsplus/Tuple");
export type TupleSym = typeof TupleSym;

/**
 * A `Tuple` represents an immutable, finite ordered sequence of elements.
 *
 * @tsplus type tsplus/Tuple
 * @tsplus companion tsplus/TupleOps
 */
export class Tuple<T extends readonly unknown[]> implements Iterable<T[number]>, Equals {
  readonly [TupleSym]: TupleSym = TupleSym;

  constructor(readonly tuple: T) {}

  [Symbol.iterator](): IterableIterator<T[number]> {
    return this.tuple[Symbol.iterator]();
  }

  [Hash.sym](): number {
    return Hash.array(this.tuple);
  }

  [Equals.sym](that: unknown): boolean {
    if (isTuple(that)) {
      return (
        this.tuple.length === that.tuple.length &&
        this.tuple.every((v, i) => Equals.equals(v, that.tuple[i]))
      );
    }
    return false;
  }

  get<K extends keyof T>(i: K): T[K] {
    return this.tuple[i];
  }
}

/**
 * @tsplus unify tsplus/Tuple
 */
export function unifyTuple<X extends Tuple<any>>(
  self: X
): Tuple<[X] extends [Tuple<infer A>] ? A : never> {
  return self;
}

/**
 * Checks if the provided value is a `Tuple`.
 *
 * @tsplus static tsplus/TupleOps isTuple
 */
export function isTuple(self: unknown): self is Tuple<unknown[]> {
  return typeof self === "object" && self != null && TupleSym in self;
}
