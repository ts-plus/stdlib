import type { RedBlackTree } from "@tsplus/stdlib/collections/RedBlackTree/definition";
import { _K, _V, RedBlackTreeIterator, RedBlackTreeSym } from "@tsplus/stdlib/collections/RedBlackTree/definition";
import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node";

export class RedBlackTreeInternal<K, V> implements RedBlackTree<K, V> {
  readonly [RedBlackTreeSym]: RedBlackTreeSym = RedBlackTreeSym;
  readonly [_K]!: () => K;
  readonly [_V]!: () => V;

  constructor(readonly ord: Ord<K>, readonly root: Node<K, V> | undefined) {}

  [Symbol.iterator](): RedBlackTreeIterator<K, V> {
    const stack: Node<K, V>[] = [];
    let n = this.root;
    while (n) {
      stack.push(n);
      n = n.left;
    }
    return new RedBlackTreeIterator(this, stack, "Forward");
  }

  [Hash.sym](): number {
    return Hash.iterator(this[Symbol.iterator]());
  }

  [Equals.sym](that: unknown): boolean {
    return (
      that instanceof RedBlackTreeInternal &&
      (this.root?.count ?? 0) === (that.root?.count ?? 0) &&
      this == that
    );
  }
}
