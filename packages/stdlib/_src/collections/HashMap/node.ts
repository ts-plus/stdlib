import type { Cont, TraversalFn, VisitResult } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import {
  visitLazy as visitLazyInternal,
  visitLazyChildren as visitLazyChildrenInternal
} from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import type { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node"
import {
  ArrayNode,
  canEditNode as canEditNodeInternal,
  CollisionNode,
  EmptyNode,
  IndexedNode,
  isEmptyNode as isEmptyNodeInternal,
  isLeafNode as isLeafNodeInternal,
  LeafNode
} from "@tsplus/stdlib/collections/HashMap/_internal/node"

export { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node"

/**
 * @tsplus static HashMap.Node.Ops empty
 */
export function emptyNode<K = never, V = never>(): Node<K, V> {
  return new EmptyNode()
}

/**
 * @tsplus static HashMap.Node.Ops leaf
 */
export function leafNode<K, V>(
  edit: number,
  hash: number,
  key: K,
  value: Maybe<V>
): Node<K, V> {
  return new LeafNode(edit, hash, key, value)
}

/**
 * @tsplus static HashMap.Node.Ops collision
 */
export function collisionNode<K, V>(
  edit: number,
  hash: number,
  children: Array<Node<K, V>>
): Node<K, V> {
  return new CollisionNode(edit, hash, children)
}

/**
 * @tsplus static HashMap.Node.Ops indexed
 */
export function indexedNode<K, V>(
  edit: number,
  mask: number,
  children: Array<Node<K, V>>
): Node<K, V> {
  return new IndexedNode(edit, mask, children)
}

/**
 * @tsplus static HashMap.Node.Ops array
 */
export function arrayNode<K, V>(
  edit: number,
  size: number,
  children: Array<Node<K, V>>
): Node<K, V> {
  return new ArrayNode(edit, size, children)
}

// -----------------------------------------------------------------------------
// Type Guards
// -----------------------------------------------------------------------------

/**
 * @tsplus static HashMap.Node.Ops isEmptyNode
 */
export const isEmptyNode = isEmptyNodeInternal

/**
 * @tsplus static HashMap.Node.Ops isLeafNode
 */
export const isLeafNode = isLeafNodeInternal

// -----------------------------------------------------------------------------
// Operations
// -----------------------------------------------------------------------------

/**
 * @tsplus pipeable HashMap.Node canEdit
 */
export function canEditNode(edit: number) {
  return <K, V>(node: Node<K, V>): boolean => canEditNodeInternal(node, edit)
}

/**
 * @tsplus pipeable HashMap.Node visitLazy
 */
export function visitLazy<K, V, A>(f: TraversalFn<K, V, A>, cont?: Cont<K, V, A>) {
  return (node: Node<K, V>): Maybe<VisitResult<K, V, A>> => visitLazyInternal(node, f)
}

/**
 * @tsplus fluent HashMap.Node.Ops visitLazyChildren
 */
export const visitLazyChildren = visitLazyChildrenInternal
