import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Determines if two `HashSet`s are equivalent.
 *
 * @tsplus operator HashSet ==
 * @tsplus fluent HashSet equals
 */
export function equals_<A>(self: HashSet<A>, that: HashSet<A>): boolean {
  if (self === that) {
    return true;
  }
  realHashSet(self);
  realHashSet(that);
  if (self._keyMap.size !== that._keyMap.size) {
    return false;
  }
  let eq = true;
  for (const vx of self) {
    if (!that._keyMap.has(vx)) {
      eq = false;
      break;
    }
  }
  return eq;
}
