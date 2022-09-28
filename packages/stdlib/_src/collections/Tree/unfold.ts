/**
 * Constructs a `Tree` by repeatedly applying the (possibly infinite) function `f`
 * in breadth-first order.
 *
 * @tsplus static Tree.Ops unfold
 */
export function unfold<A, S>(s: S, f: (s: S) => readonly [A, Chunk<S>]): Tree<A> {
  const next = f(s)
  const [a, s0] = [next[0], next[1]]
  return Tree(
    a,
    s0.map((b) => unfold(b, f))
  )
}
