/**
 * @tsplus static Maybe/Ops getShow
 */
export function getShow<A>(S: Show<A>): Show<Maybe<A>> {
  return Show((maybe) => maybe.isNone() ? "None" : `Some(${S.show(maybe.value)})`)
}
