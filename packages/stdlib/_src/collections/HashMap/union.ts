/**
 * Performs a union of this `HashMap` and that `HashMap`.
 *
 * @tsplus pipeable-operator HashMap +
 * @tsplus static HashMap.Aspects union
 * @tsplus pipeable HashMap union
 */
export function union<K1, V1>(that: HashMap<K1, V1>) {
  return <K0, V0>(self: HashMap<K0, V0>): HashMap<K0 | K1, V0 | V1> => {
    const result: HashMap<K0 | K1, V0 | V1> = self.beginMutation
    that.forEachWithIndex((k, v) => {
      result.set(k, v)
    })
    return result.endMutation
  }
}
