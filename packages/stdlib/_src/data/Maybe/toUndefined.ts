/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `undefined`.
 *
 * @tsplus getter Maybe value
 */
export function toUndefined<A>(self: Maybe<A>): A | undefined {
  return self.isNone() ? undefined : self.value
}
