import { _K, _V, SortedMapSym } from "@tsplus/stdlib/collections/SortedMap/definition"

export class SortedMapInternal<K, V> implements SortedMap<K, V> {
  readonly [SortedMapSym]: SortedMapSym = SortedMapSym
  readonly [_K]!: () => K
  readonly [_V]!: () => V

  constructor(readonly tree: RedBlackTree<K, V>) {}

  [Hash.sym](): number {
    return this.tree[Hash.sym]()
  }

  [Equals.sym](that: unknown): boolean {
    return this.tree[Equals.sym](that)
  }

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    return this.tree[Symbol.iterator]()
  }
}

/**
 * @tsplus macro remove
 */
export function concreteSortedMap<K, V>(_: SortedMap<K, V>): asserts _ is SortedMapInternal<K, V> {
  //
}
