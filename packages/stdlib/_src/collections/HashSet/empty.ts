import { HashSetInternal } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * @tsplus static HashSet/Ops empty
 */
export function empty<A>(): HashSet<A> {
  return new HashSetInternal(HashMap.empty<A, unknown>());
}
