/**
 * @tsplus fluent Tree foldMap
 */
export function foldMap_<M, A>(self: Tree<A>, M: AssociativeIdentity<M>, f: (a: A) => M): M {
  return self.reduce<A, M>(M.identity, (m, a) => M.combine(m, f(a)));
}

/**
 * @tsplus static Tree/Aspects foldMap
 */
export const foldMap = Pipeable(foldMap_);
