/**
 * Converts to native tuple type.
 *
 * @tsplus getter Tuple toNative
 */
export function toNative<Ks extends readonly unknown[]>(self: Tuple<Ks>): Ks {
  return self.tuple
}
