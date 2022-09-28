import { RedBlackTreeInternal } from "@tsplus/stdlib/collections/RedBlackTree/_internal/RedBlackTreeInternal"
import { Node } from "@tsplus/stdlib/collections/RedBlackTree/node"

/**
 * Removes the entry with the specified key, if it exists.
 *
 * @tsplus static RedBlackTree.Aspects removeFirst
 * @tsplus pipeable RedBlackTree removeFirst
 */
export function removeFirst<K>(key: K) {
  return <V>(self: RedBlackTree<K, V>): RedBlackTree<K, V> => {
    if (!self.has(key)) {
      return self
    }
    const cmp = self.ord.compare
    let node: Node<K, V> | undefined = self.root
    const stack = []
    while (node) {
      const d = cmp(key, node.key)
      stack.push(node)
      if (Equals.equals(key, node.key)) {
        node = undefined
      } else if (d <= 0) {
        node = node.left
      } else {
        node = node.right
      }
    }

    if (stack.length === 0) {
      return self
    }

    const cstack = new Array<Node<K, V>>(stack.length)

    let n = stack[stack.length - 1]!

    cstack[cstack.length - 1] = new Node(
      n.color,
      n.key,
      n.value,
      n.left,
      n.right,
      n.count
    )

    for (let i = stack.length - 2; i >= 0; --i) {
      n = stack[i]!
      if (n.left === stack[i + 1]) {
        cstack[i] = new Node(n.color, n.key, n.value, cstack[i + 1], n.right, n.count)
      } else {
        cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count)
      }
    }

    // Get node
    n = cstack[cstack.length - 1]!

    // If not leaf, then swap with previous node
    if (n.left && n.right) {
      // First walk to previous leaf
      const split = cstack.length
      n = n.left
      while (n.right) {
        cstack.push(n)
        n = n.right
      }
      // Copy path to leaf
      const v = cstack[split - 1]
      cstack.push(new Node(n.color, v!.key, v!.value, n.left, n.right, n.count))
      cstack[split - 1]!.key = n.key
      cstack[split - 1]!.value = n.value

      // Fix up stack
      for (let i = cstack.length - 2; i >= split; --i) {
        n = cstack[i]!
        cstack[i] = new Node(n.color, n.key, n.value, n.left, cstack[i + 1], n.count)
      }
      cstack[split - 1]!.left = cstack[split]
    }

    // Remove leaf node
    n = cstack[cstack.length - 1]!
    if (n.color === "Red") {
      // Easy case: removing red leaf
      const p = cstack[cstack.length - 2]!
      if (p.left === n) {
        p.left = undefined
      } else if (p.right === n) {
        p.right = undefined
      }
      cstack.pop()
      for (let i = 0; i < cstack.length; ++i) {
        cstack[i]!.count--
      }
      return new RedBlackTreeInternal(self.ord, cstack[0])
    } else {
      if (n.left || n.right) {
        // Second easy case:  Single child black parent
        if (n.left) {
          n.swap(n.left)
        } else if (n.right) {
          n.swap(n.right)
        }
        // Child must be red, so repaint it black to balance color
        n.color = "Black"
        for (let i = 0; i < cstack.length - 1; ++i) {
          cstack[i]!.count--
        }
        return new RedBlackTreeInternal(self.ord, cstack[0])
      } else if (cstack.length === 1) {
        // Third easy case: root
        return new RedBlackTreeInternal(self.ord, undefined)
      } else {
        // Hard case: Repaint n, and then do some nasty stuff
        for (let i = 0; i < cstack.length; ++i) {
          cstack[i]!.count--
        }
        const parent = cstack[cstack.length - 2]
        fixDoubleBlack(cstack)
        // Fix up links
        if (parent!.left === n) {
          parent!.left = undefined
        } else {
          parent!.right = undefined
        }
      }
    }
    return new RedBlackTreeInternal(self.ord, cstack[0])
  }
}

/**
 * Fix up a double black node in a Red-Black Tree.
 */
function fixDoubleBlack<K, V>(stack: Node<K, V>[]) {
  let n, p, s, z
  for (let i = stack.length - 1; i >= 0; --i) {
    n = stack[i]!
    if (i === 0) {
      n.color = "Black"
      return
    }
    p = stack[i - 1]!
    if (p.left === n) {
      s = p.right
      if (s && s.right && s.right.color === "Red") {
        s = p.right = s.clone()
        z = s.right = s.right!.clone()
        p.right = s.left
        s.left = p
        s.right = z
        s.color = p.color
        n.color = "Black"
        p.color = "Black"
        z.color = "Black"
        p.recount()
        s.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.left === p) {
            pp.left = s
          } else {
            pp.right = s
          }
        }
        stack[i - 1] = s
        return
      } else if (s && s.left && s.left.color === "Red") {
        s = p.right = s.clone()
        z = s.left = s.left!.clone()
        p.right = z.left
        s.left = z.right
        z.left = p
        z.right = s
        z.color = p.color
        p.color = "Black"
        s.color = "Black"
        n.color = "Black"
        p.recount()
        s.recount()
        z.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.left === p) {
            pp.left = z
          } else {
            pp.right = z
          }
        }
        stack[i - 1] = z
        return
      }
      if (s && s.color === "Black") {
        if (p.color === "Red") {
          p.color = "Black"
          p.right = s.repaint("Red")
          return
        } else {
          p.right = s.repaint("Red")
          continue
        }
      } else if (s) {
        s = s.clone()
        p.right = s.left
        s.left = p
        s.color = p.color
        p.color = "Red"
        p.recount()
        s.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.left === p) {
            pp.left = s
          } else {
            pp.right = s
          }
        }
        stack[i - 1] = s
        stack[i] = p
        if (i + 1 < stack.length) {
          stack[i + 1] = n
        } else {
          stack.push(n)
        }
        i = i + 2
      }
    } else {
      s = p.left
      if (s && s.left && s.left.color === "Red") {
        s = p.left = s.clone()
        z = s.left = s.left!.clone()
        p.left = s.right
        s.right = p
        s.left = z
        s.color = p.color
        n.color = "Black"
        p.color = "Black"
        z.color = "Black"
        p.recount()
        s.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.right === p) {
            pp.right = s
          } else {
            pp.left = s
          }
        }
        stack[i - 1] = s
        return
      } else if (s && s.right && s.right.color === "Red") {
        s = p.left = s.clone()
        z = s.right = s.right!.clone()
        p.left = z.right
        s.right = z.left
        z.right = p
        z.left = s
        z.color = p.color
        p.color = "Black"
        s.color = "Black"
        n.color = "Black"
        p.recount()
        s.recount()
        z.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.right === p) {
            pp.right = z
          } else {
            pp.left = z
          }
        }
        stack[i - 1] = z
        return
      }
      if (s && s.color === "Black") {
        if (p.color === "Red") {
          p.color = "Black"
          p.left = s.repaint("Red")
          return
        } else {
          p.left = s.repaint("Red")
          continue
        }
      } else if (s) {
        s = s.clone()
        p.left = s.right
        s.right = p
        s.color = p.color
        p.color = "Red"
        p.recount()
        s.recount()
        if (i > 1) {
          const pp = stack[i - 2]!
          if (pp.right === p) {
            pp.right = s
          } else {
            pp.left = s
          }
        }
        stack[i - 1] = s
        stack[i] = p
        if (i + 1 < stack.length) {
          stack[i + 1] = n
        } else {
          stack.push(n)
        }
        i = i + 2
      }
    }
  }
}
