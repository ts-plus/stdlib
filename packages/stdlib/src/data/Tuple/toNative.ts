import type { Tuple } from "@tsplus/stdlib/data/Tuple/definition"

/**
 * Converts to native tuple type.
 *
 * @tsplus fluent tsplus/Tuple toNative
 */
export function toNative<Ks extends readonly unknown[]>(self: Tuple<Ks>): Ks {
  return self.tuple
}
