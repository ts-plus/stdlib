/**
 * @tsplus static Tree.Aspects foldMap
 * @tsplus pipeable Tree foldMap
 */
export function foldMap<M, A>(M: AssociativeIdentity<M>, f: (a: A) => M) {
  return (self: Tree<A>): M => self.reduce<A, M>(M.identity, (m, a) => M.combine(m, f(a)))
}
