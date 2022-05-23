/**
 * @tsplus fluent Tree reduce
 */
export function reduce_<A, B>(self: Tree<A>, b: B, f: (b: B, a: A) => B): B {
  return self.forest.reduce(f(b, self.value), (s, a) => a.reduce(s, f));
}

/**
 * @tsplus static Tree/Aspects reduce
 */
export const reduce = Pipeable(reduce_);
