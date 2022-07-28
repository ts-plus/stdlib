/**
 * @tsplus static Tree.Aspects reduce
 * @tsplus pipeable Tree reduce
 */
export function reduce<A, B>(b: B, f: (b: B, a: A) => B) {
  return (self: Tree<A>): B => self.forest.reduce(f(b, self.value), (s, a) => a.reduce(s, f))
}
