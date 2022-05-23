/**
 * @tsplus fluent Tree duplicate
 */
export function duplicate_<A>(self: Tree<A>): Tree<Tree<A>> {
  return self.extend(identity);
}
/**
 * @tsplus static Tree/Aspects duplicate
 */
export const duplicate = Pipeable(duplicate_);
