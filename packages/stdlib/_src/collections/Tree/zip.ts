/**
 * @tsplus fluent Tree zip
 */
export function zip_<A, B>(self: Tree<A>, that: Tree<B>): Tree<Tuple<[A, B]>> {
  return self.zipWith(that, Tuple.make);
}

/**
 * @tsplus static Tree/Aspects zip
 */
export const zip = Pipeable(zip_);
