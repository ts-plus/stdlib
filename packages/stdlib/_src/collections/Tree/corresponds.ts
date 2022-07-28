/**
 * @tsplus static Tree.Aspects corresponds
 * @tsplus pipeable Tree corresponds
 */
export function corresponds<A, B>(
  that: Tree<B>,
  f: (a: A, b: B) => boolean
) {
  return (self: Tree<A>): boolean => (
    f(self.value, that.value) &&
    self.forest.corresponds(that.forest, (a, b) => a.corresponds(b, f))
  )
}
