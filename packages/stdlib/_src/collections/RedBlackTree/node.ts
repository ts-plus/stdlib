export type Color = "Red" | "Black";

/**
 * @tsplus type RedBlackTree/Node
 * @tsplus companion RedBlackTree/Node/Ops
 */
export class Node<K, V> {
  constructor(
    public color: Color,
    public key: K,
    public value: V,
    public left: Node<K, V> | undefined,
    public right: Node<K, V> | undefined,
    public count: number
  ) {}
}

/**
 * @tsplus fluent RedBlackTree/Node clone
 */
export function clone<K, V>(node: Node<K, V>) {
  return new Node(node.color, node.key, node.value, node.left, node.right, node.count);
}

/**
 * @tsplus fluent RedBlackTree/Node swap
 */
export function swap<K, V>(n: Node<K, V>, v: Node<K, V>) {
  n.key = v.key;
  n.value = v.value;
  n.left = v.left;
  n.right = v.right;
  n.color = v.color;
  n.count = v.count;
}

/**
 * @tsplus fluent RedBlackTree/Node repaint
 */
export function repaint<K, V>(node: Node<K, V>, color: Color) {
  return new Node(color, node.key, node.value, node.left, node.right, node.count);
}

/**
 * @tsplus fluent RedBlackTree/Node recount
 */
export function recount<K, V>(node: Node<K, V>) {
  node.count = 1 + (node.left?.count ?? 0) + (node.right?.count ?? 0);
}
