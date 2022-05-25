/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @tsplus fluent HashSet toggle
 */
export function toggle_<A>(self: HashSet<A>, value: A): HashSet<A> {
  return self.has(value) ? self - value : self + value
}

/**
 * Checks if a value is present in the `HashSet`. If it is present, the value
 * will be removed from the `HashSet`, otherwise the value will be added to the
 * `HashSet`.
 *
 * @tsplus static HashSet/Aspects toggle
 */
export const toggle = Pipeable(toggle_)
