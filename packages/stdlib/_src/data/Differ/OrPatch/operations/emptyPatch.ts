import { EmptyOrPatch } from "@tsplus/stdlib/data/Differ/OrPatch/definition"

/**
 * Constructs an empty or patch.
 *
 * @tsplus static Differ.Or.Patch.Ops empty
 */
export function emptyPatch<Value, Value2, Patch, Patch2>(): Differ.Or.Patch<
  Value,
  Value2,
  Patch,
  Patch2
> {
  return new EmptyOrPatch()
}
