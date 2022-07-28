/**
 * @tsplus pipeable-operator Tree ==
 * @tsplus static Tree.Aspects equals
 * @tsplus pipeable Tree equals
 */
export function equals<B>(that: Tree<B>) {
  return <A>(self: Tree<A>): boolean => self.corresponds(that, Equals.equals)
}
