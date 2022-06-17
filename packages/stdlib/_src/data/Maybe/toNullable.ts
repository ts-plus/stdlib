/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `null`.
 *
 * @tsplus getter Maybe toNullable
 */
export function toNullable<A>(self: Maybe<A>): A | null {
  return self.isNone() ? null : self.value
}
