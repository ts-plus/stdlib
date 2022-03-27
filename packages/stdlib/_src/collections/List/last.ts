import type { List } from "@tsplus/stdlib/collections/List/definition";
import { Option } from "@tsplus/stdlib/data/Option";

/**
 * @tsplus fluent List last
 */
export function last<A>(self: List<A>): Option<A> {
  return self.isNil() ? Option.none : Option.some(self.unsafeLast()!);
}
