import { _A, ImmutableQueueSym } from "@tsplus/stdlib/collections/ImmutableQueue/definition"

export class ImmutableQueueInternal<A> implements ImmutableQueue<A> {
  readonly [ImmutableQueueSym]: ImmutableQueueSym = ImmutableQueueSym
  readonly [_A]!: () => A

  constructor(readonly backingList: List<A>) {}

  [Hash.sym](): number {
    return this.backingList[Hash.sym]()
  }

  [Equals.sym](u: unknown): boolean {
    return u instanceof ImmutableQueueInternal && Equals.equals(this.backingList, u.backingList)
  }

  [Symbol.iterator](): Iterator<A> {
    return this.backingList[Symbol.iterator]()
  }
}

/**
 * @tsplus macro remove
 */
export function concreteImmutableQueue<A>(
  _: ImmutableQueue<A>
): asserts _ is ImmutableQueueInternal<A> {
  //
}
