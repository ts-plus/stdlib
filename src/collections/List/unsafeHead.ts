import type { List } from "./definition.js"

/**
 * @tsplus fluent List unsafeHead
 */
export function unsafeHead<A>(self: List<A>): A | undefined {
  if (self.isNil()) {
    return undefined
  }
  return self.head
}
