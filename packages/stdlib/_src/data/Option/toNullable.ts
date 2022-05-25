/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `null`.
 *
 * @tsplus fluent Option toNullable
 */
export function toNullable<A>(self: Option<A>): A | null {
  return self.isNone() ? null : self.value
}
