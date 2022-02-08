import { Option } from "../../data/Option.js"
import type { List } from "./definition.js"

/**
 * @tsplus fluent List last
 */
export function last<A>(self: List<A>): Option<A> {
  return self.isNil() ? Option.none : Option.some(self.unsafeLast()!)
}
