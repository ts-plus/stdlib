import type { List } from "@tsplus/stdlib/collections/List/definition";
import { Option } from "@tsplus/stdlib/data/Option";

/**
 * @tsplus fluent List tail
 */
export function tail<A>(self: List<A>): Option<List<A>> {
  return self.isNil() ? Option.none : Option.some(self.tail);
}
