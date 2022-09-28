import type { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

export const RedBlackTreeSym = Symbol.for("@tsplus/stdlib/collections/RedBlackTree")
export type RedBlackTreeSym = typeof RedBlackTreeSym

export const _K = Symbol.for("@tsplus/stdlib/collections/RedBlackTree/K")
export type _K = typeof _K

export const _V = Symbol.for("@tsplus/stdlib/collections/RedBlackTree/V")
export type _V = typeof _V

export type Direction = "Forward" | "Backward"

/**
 * A Red-Black Tree.
 *
 * @tsplus type RedBlackTree
 */
export interface RedBlackTree<K, V> extends RedBlackTreeIterable<K, V>, Equals {
  readonly [RedBlackTreeSym]: RedBlackTreeSym
  readonly [_K]: () => K
  readonly [_V]: () => V
  readonly ord: Ord<K>
  readonly root: Node<K, V> | undefined
  [Symbol.iterator](): RedBlackTreeIterator<K, V>
}

/**
 * @tsplus type RedBlackTree.Ops
 */
export interface RedBlackTreeOps {
  $: RedBlackTreeAspects
}
export const RedBlackTree: RedBlackTreeOps = {
  $: {}
}

/**
 * @tsplus type RedBlackTree.Aspects
 */
export interface RedBlackTreeAspects {}

export interface RedBlackTreeIterable<K, V> extends Collection<readonly [K, V]> {
  readonly ord: Ord<K>
  [Symbol.iterator](): RedBlackTreeIterator<K, V>
}

export class RedBlackTreeIterator<K, V> implements Iterator<readonly [K, V]> {
  private count = 0

  constructor(
    readonly self: RedBlackTree<K, V>,
    readonly stack: Node<K, V>[],
    readonly direction: Direction
  ) {}

  /**
   * Clones the iterator
   */
  clone(): RedBlackTreeIterator<K, V> {
    return new RedBlackTreeIterator(this.self, this.stack.slice(), this.direction)
  }

  /**
   * Reverse the traversal direction
   */
  reversed(): RedBlackTreeIterator<K, V> {
    return new RedBlackTreeIterator(
      this.self,
      this.stack.slice(),
      this.direction === "Forward" ? "Backward" : "Forward"
    )
  }

  /**
   * Iterator next
   */
  next(): IteratorResult<readonly [K, V]> {
    const entry = this.entry
    this.count++
    if (this.direction === "Forward") {
      this.moveNext()
    } else {
      this.movePrev()
    }
    return entry.fold(
      () => ({ done: true, value: this.count }),
      (kv) => ({ done: false, value: kv })
    )
  }

  /**
   * Returns the key
   */
  get key(): Maybe<K> {
    if (this.stack.length > 0) {
      return Maybe.some(this.stack[this.stack.length - 1]!.key)
    }
    return Maybe.none
  }

  /**
   * Returns the value
   */
  get value(): Maybe<V> {
    if (this.stack.length > 0) {
      return Maybe.some(this.stack[this.stack.length - 1]!.value)
    }
    return Maybe.none
  }

  /**
   * Returns the key
   */
  get entry(): Maybe<readonly [K, V]> {
    if (this.stack.length > 0) {
      return Maybe.some(
        [this.stack[this.stack.length - 1]!.key, this.stack[this.stack.length - 1]!.value]
      )
    }
    return Maybe.none
  }

  /**
   * Returns the position of this iterator in the sorted list
   */
  get index(): number {
    let idx = 0
    const stack = this.stack
    if (stack.length === 0) {
      const r = this.self.root
      if (r) {
        return r.count
      }
      return 0
    } else if (stack[stack.length - 1]!.left) {
      idx = stack[stack.length - 1]!.left!.count
    }
    for (let s = stack.length - 2; s >= 0; --s) {
      if (stack[s + 1] === stack[s]!.right) {
        ;++idx
        if (stack[s]!.left) {
          idx += stack[s]!.left!.count
        }
      }
    }
    return idx
  }

  /**
   * Advances iterator to next element in list
   */
  moveNext() {
    const stack = this.stack
    if (stack.length === 0) {
      return
    }
    let n: Node<K, V> | undefined = stack[stack.length - 1]!
    if (n.right) {
      n = n.right
      while (n) {
        stack.push(n)
        n = n.left
      }
    } else {
      stack.pop()
      while (stack.length > 0 && stack[stack.length - 1]!.right === n) {
        n = stack[stack.length - 1]
        stack.pop()
      }
    }
  }

  /**
   * Checks if there is a next element
   */
  get hasNext() {
    const stack = this.stack
    if (stack.length === 0) {
      return false
    }
    if (stack[stack.length - 1]!.right) {
      return true
    }
    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1]!.left === stack[s]) {
        return true
      }
    }
    return false
  }

  /**
   * Advances iterator to previous element in list
   */
  movePrev() {
    const stack = this.stack
    if (stack.length === 0) {
      return
    }
    let n = stack[stack.length - 1]
    if (n && n.left) {
      n = n.left
      while (n) {
        stack.push(n)
        n = n.right
      }
    } else {
      stack.pop()
      while (stack.length > 0 && stack[stack.length - 1]!.left === n) {
        n = stack[stack.length - 1]
        stack.pop()
      }
    }
  }

  /**
   * Checks if there is a previous element
   */
  get hasPrev() {
    const stack = this.stack
    if (stack.length === 0) {
      return false
    }
    if (stack[stack.length - 1]!.left) {
      return true
    }
    for (let s = stack.length - 1; s > 0; --s) {
      if (stack[s - 1]!.right === stack[s]) {
        return true
      }
    }
    return false
  }
}
