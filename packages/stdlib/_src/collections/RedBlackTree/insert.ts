import { RedBlackTreeInternal } from "@tsplus/stdlib/collections/RedBlackTree/_internal/RedBlackTreeInternal"
import { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Insert a new item into the tree.
 *
 * @tsplus fluent RedBlackTree insert
 */
export function insert_<K, V>(
  self: RedBlackTree<K, V>,
  key: K,
  value: V
): RedBlackTree<K, V> {
  const cmp = self.ord.compare
  // Find point to insert new node at
  let n: Node<K, V> | undefined = self.root
  const n_stack: Node<K, V>[] = []
  const d_stack: Ordering[] = []
  while (n) {
    const d = cmp(key, n.key)
    n_stack.push(n)
    d_stack.push(d)
    if (d <= 0) {
      n = n.left
    } else {
      n = n.right
    }
  }
  // Rebuild path to leaf node
  n_stack.push(new Node("Red", key, value, undefined, undefined, 1))
  for (let s = n_stack.length - 2; s >= 0; --s) {
    const n2 = n_stack[s]!
    if (d_stack[s]! <= 0) {
      n_stack[s] = new Node(
        n2.color,
        n2.key,
        n2.value,
        n_stack[s + 1],
        n2.right,
        n2.count + 1
      )
    } else {
      n_stack[s] = new Node(
        n2.color,
        n2.key,
        n2.value,
        n2.left,
        n_stack[s + 1],
        n2.count + 1
      )
    }
  }
  // Rebalance tree using rotations
  for (let s = n_stack.length - 1; s > 1; --s) {
    const p = n_stack[s - 1]!
    const n3 = n_stack[s]!
    if (p.color === "Black" || n3.color === "Black") {
      break
    }
    const pp = n_stack[s - 2]!
    if (pp.left === p) {
      if (p.left === n3) {
        const y = pp.right
        if (y && y.color === "Red") {
          p.color = "Black"
          pp.right = y.repaint("Black")
          pp.color = "Red"
          s -= 1
        } else {
          pp.color = "Red"
          pp.left = p.right
          p.color = "Black"
          p.right = pp
          n_stack[s - 2] = p
          n_stack[s - 1] = n3
          pp.recount()
          p.recount()
          if (s >= 3) {
            const ppp = n_stack[s - 3]!
            if (ppp.left === pp) {
              ppp.left = p
            } else {
              ppp.right = p
            }
          }
          break
        }
      } else {
        const y = pp.right
        if (y && y.color === "Red") {
          p.color = "Black"
          pp.right = y.repaint("Black")
          pp.color = "Red"
          s -= 1
        } else {
          p.right = n3.left
          pp.color = "Red"
          pp.left = n3.right
          n3.color = "Black"
          n3.left = p
          n3.right = pp
          n_stack[s - 2] = n3
          n_stack[s - 1] = p
          pp.recount()
          p.recount()
          n3.recount()
          if (s >= 3) {
            const ppp = n_stack[s - 3]!
            if (ppp.left === pp) {
              ppp.left = n3
            } else {
              ppp.right = n3
            }
          }
          break
        }
      }
    } else {
      if (p.right === n3) {
        const y = pp.left
        if (y && y.color === "Red") {
          p.color = "Black"
          pp.left = y.repaint("Black")
          pp.color = "Red"
          s -= 1
        } else {
          pp.color = "Red"
          pp.right = p.left
          p.color = "Black"
          p.left = pp
          n_stack[s - 2] = p
          n_stack[s - 1] = n3
          pp.recount()
          p.recount()
          if (s >= 3) {
            const ppp = n_stack[s - 3]!
            if (ppp.right === pp) {
              ppp.right = p
            } else {
              ppp.left = p
            }
          }
          break
        }
      } else {
        const y = pp.left
        if (y && y.color === "Red") {
          p.color = "Black"
          pp.left = y.repaint("Black")
          pp.color = "Red"
          s -= 1
        } else {
          p.left = n3.right
          pp.color = "Red"
          pp.right = n3.left
          n3.color = "Black"
          n3.right = p
          n3.left = pp
          n_stack[s - 2] = n3
          n_stack[s - 1] = p
          pp.recount()
          p.recount()
          n3.recount()
          if (s >= 3) {
            const ppp = n_stack[s - 3]!
            if (ppp.right === pp) {
              ppp.right = n3
            } else {
              ppp.left = n3
            }
          }
          break
        }
      }
    }
  }
  // Return new tree
  n_stack[0]!.color = "Black"
  return new RedBlackTreeInternal(self.ord, n_stack[0])
}

/**
 * Insert a new item into the tree.
 *
 * @tsplus static RedBlackTree/Aspects insert
 */
export const insert = Pipeable(insert_)
