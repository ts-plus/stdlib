/**
 * @tsplus static Option/Ops getShow
 */
export function getShow<A>(S: Show<A>): Show<Option<A>> {
  return Show((option) => option.isNone() ? "None" : `Some(${S.show(option.value)})`)
}
