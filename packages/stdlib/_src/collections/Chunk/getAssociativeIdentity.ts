/**
 * @tsplus static Chunk/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(): AssociativeIdentity<Chunk<A>> {
  return AssociativeIdentity(Chunk.empty<A>(), (x, y) => x.concat(y));
}
