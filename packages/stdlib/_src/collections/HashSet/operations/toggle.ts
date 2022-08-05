/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @tsplus static HashSet.Aspects toggle
 * @tsplus pipeable HashSet toggle
 */
export function toggle<A>(value: A) {
  return (self: HashSet<A>): HashSet<A> => self.has(value) ? self - value : self + value
}
