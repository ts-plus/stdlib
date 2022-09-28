import {
  fromBitmap,
  hashFragment,
  toBitmap
} from "@tsplus/stdlib/collections/HashMap/_internal/bitwise"
import { SIZE } from "@tsplus/stdlib/collections/HashMap/_internal/config"
import type { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node"
import { isEmptyNode } from "@tsplus/stdlib/collections/HashMap/_internal/node"
import { _K, _V, HashMapSym } from "@tsplus/stdlib/collections/HashMap/definition"

export type TraversalFn<K, V, A> = (k: K, v: V) => A

export type Cont<K, V, A> =
  | [
    len: number,
    children: Node<K, V>[],
    i: number,
    f: TraversalFn<K, V, A>,
    cont: Cont<K, V, A>
  ]
  | undefined

export interface VisitResult<K, V, A> {
  value: A
  cont: Cont<K, V, A>
}

export class HashMapInternal<K, V> implements HashMap<K, V> {
  readonly [HashMapSym]: HashMapSym = HashMapSym
  readonly [_K]!: () => K
  readonly [_V]!: () => V

  constructor(
    public _editable: boolean,
    public _edit: number,
    public _root: Node<K, V>,
    public _size: number
  ) {}

  [Symbol.iterator](): Iterator<readonly [K, V]> {
    return new HashMapIterator(this, (k, v) => [k, v])
  }

  [Hash.sym](): number {
    let hash = Hash.string("HashMap")
    for (const item of this) {
      hash ^= Hash.combine(Hash.unknown(item[0]), Hash.unknown(item[1]))
    }
    return Hash.optimize(hash)
  }

  [Equals.sym](that: unknown): boolean {
    if (HashMap.isHashMap(that)) {
      realHashMap(that)
      if (that._size !== this._size) {
        return false
      }
      for (const item of this) {
        const elem = that.getHash(item[0], Hash.unknown(item[0]))
        if (elem.isNone()) {
          return false
        } else {
          if (!Equals.equals(item[1], elem.value)) {
            return false
          }
        }
      }
      return true
    }
    return false
  }
}

export class HashMapIterator<K, V, T> implements IterableIterator<T> {
  v = visitLazy(this.map._root, this.f, undefined)

  constructor(readonly map: HashMapInternal<K, V>, readonly f: TraversalFn<K, V, T>) {}

  next(): IteratorResult<T> {
    if (this.v.isNone()) {
      return { done: true, value: undefined }
    }
    const v0 = this.v.value
    this.v = applyCont(v0.cont)
    return { done: false, value: v0.value }
  }

  [Symbol.iterator](): IterableIterator<T> {
    return new HashMapIterator(this.map, this.f)
  }
}

/**
 * @tsplus macro remove
 */
export function realHashMap<K, V>(
  _: HashMap<K, V>
): asserts _ is HashMapInternal<K, V> {
  //
}

export function applyCont<K, V, A>(cont: Cont<K, V, A>) {
  return cont
    ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4])
    : Maybe.none
}

export function visitLazy<K, V, A>(
  node: Node<K, V>,
  f: TraversalFn<K, V, A>,
  cont: Cont<K, V, A> = undefined
): Maybe<VisitResult<K, V, A>> {
  switch (node._tag) {
    case "LeafNode": {
      return node.value.isSome()
        ? Maybe.some({
          value: f(node.key, node.value.value),
          cont
        })
        : applyCont(cont)
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children = node.children
      return visitLazyChildren(children.length, children, 0, f, cont)
    }
    default: {
      return applyCont(cont)
    }
  }
}

export function visitLazyChildren<K, V, A>(
  len: number,
  children: Node<K, V>[],
  i: number,
  f: TraversalFn<K, V, A>,
  cont: Cont<K, V, A>
): Maybe<VisitResult<K, V, A>> {
  while (i < len) {
    const child = children[i++]
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont])
    }
  }
  return applyCont(cont)
}

/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @tsplus fluent HashMap getHash
 */
export function getHash_<K, V>(self: HashMap<K, V>, key: K, hash: number): Maybe<V> {
  realHashMap(self)
  let node = self._root
  let shift = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return Equals.equals(key, node.key) ? node.value : Maybe.none
      }
      case "CollisionNode": {
        if (hash === node.hash) {
          const children = node.children
          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i]!
            if ("key" in child && Equals.equals(key, child.key)) return child.value
          }
        }
        return Maybe.none
      }
      case "IndexedNode": {
        const frag = hashFragment(shift, hash)
        const bit = toBitmap(frag)
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)]!
          shift += SIZE
          break
        }
        return Maybe.none
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift, hash)]!
        if (node) {
          shift += SIZE
          break
        }
        return Maybe.none
      }
      default:
        return Maybe.none
    }
  }
}

/**
 * Lookup the value for the specified key in the `HashMap` using a custom hash.
 *
 * @tsplus static HashMap.Aspects getHash
 */
export const getHash = Pipeable(getHash_)

/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @tsplus fluent HashMap has
 */
export function has_<K, V>(self: HashMap<K, V>, key: K): boolean {
  return self.getHash(key, Hash.unknown(key)).isSome()
}

/**
 * Checks if the specified key has an entry in the `HashMap`.
 *
 * @tsplus static HashMap.Aspects has
 */
export const has = Pipeable(has_)

/**
 * @tsplus operator HashMap ==
 * @tsplus fluent HashMap equals
 */
export function equals_<K, V>(self: HashMap<K, V>, that: HashMap<K, V>): boolean
export function equals_<K, V, K1, V1>(self: HashMap<K, V>, that: HashMap<K1, V1>): boolean
export function equals_(self: HashMap<unknown, unknown>, that: HashMap<unknown, unknown>) {
  return Equals.equals(self, that)
}

export const equals = Pipeable(equals_)
