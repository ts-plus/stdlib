/**
 * @tsplus operator Tree ==
 * @tsplus fluent Tree equals
 */
export function equals_<A, B>(self: Tree<A>, that: Tree<B>): boolean {
  return self.corresponds(that, Equals.equals);
}

/**
 * @tsplus static Tree/Aspects equals
 */
export const equals = Pipeable(equals_);
