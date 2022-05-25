/**
 * Gets an element from the tuple.
 *
 * @tsplus fluent tsplus/Tuple at
 */
export function at<Ks extends unknown[], I extends keyof Ks>(
  self: Tuple<Ks>,
  i: I
): Ks[I] {
  return self.get(i)
}
