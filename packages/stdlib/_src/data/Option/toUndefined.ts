/**
 * Extracts the value out of the structure, if it exists. Otherwise returns
 * `undefined`.
 *
 * @tsplus getter Option value
 */
export function toUndefined<A>(self: Option<A>): A | undefined {
  return self.isNone() ? undefined : self.value;
}
