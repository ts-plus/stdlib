import { _A, SortedSetSym } from "@tsplus/stdlib/collections/SortedSet/definition"

export class SortedSetInternal<A> implements SortedSet<A> {
  readonly [SortedSetSym]: SortedSetSym = SortedSetSym
  readonly [_A]!: () => A

  constructor(readonly keyTree: RedBlackTree<A, unknown>) {}

  [Hash.sym](): number {
    return this.keyTree[Hash.sym]()
  }

  [Equals.sym](that: unknown): boolean {
    return this.keyTree[Equals.sym](that)
  }

  [Symbol.iterator](): Iterator<A> {
    return this.keyTree.keys()
  }
}

/**
 * @tsplus macro remove
 */
export function concreteSortedSet<A>(_: SortedSet<A>): asserts _ is SortedSetInternal<A> {
  //
}
