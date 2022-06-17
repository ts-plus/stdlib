/**
 * @tsplus static Maybe/Ops getOrd
 */
export function getOrd<A>(O: Ord<A>): Ord<Maybe<A>> {
  return Ord((x, y) => x === y ? 0 : x.isSome() ? y.isSome() ? O.compare(x.value, y.value) : 1 : -1)
}
