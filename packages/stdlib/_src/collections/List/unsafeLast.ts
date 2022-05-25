/**
 * @tsplus fluent List unsafeLast
 */
export function unsafeLast<A>(self: List<A>): A | undefined {
  if (self.isNil()) {
    return undefined
  }
  let these = self
  let scout = self.tail
  while (!scout.isNil()) {
    these = scout
    scout = scout.tail
  }
  return these.head
}
