import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Determines if two `HashSet`s are equivalent.
 *
 * @tsplus pipeable-operator HashSet ==
 * @tsplus static HashSet.Aspects equals
 * @tsplus pipeable HashSet equals
 */
export function equals<A>(that: HashSet<A>) {
  return (self: HashSet<A>): boolean => {
    if (self === that) {
      return true
    }
    realHashSet(self)
    realHashSet(that)
    if (self._keyMap.size !== that._keyMap.size) {
      return false
    }
    let eq = true
    for (const vx of self) {
      if (!that._keyMap.has(vx)) {
        eq = false
        break
      }
    }
    return eq
  }
}
