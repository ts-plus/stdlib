/**
 * @tsplus fluent Tree corresponds
 */
export function corresponds_<A, B>(
  self: Tree<A>,
  that: Tree<B>,
  f: (a: A, b: B) => boolean
): boolean {
  return (
    f(self.value, that.value) &&
    self.forest.corresponds(that.forest, (a, b) => corresponds_(a, b, f))
  )
}
/**
 * @tsplus static Tree/Aspects corresponds
 */
export const corresponds = Pipeable(corresponds_)
