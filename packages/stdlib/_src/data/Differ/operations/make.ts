import { DifferSym } from "@tsplus/stdlib/data/Differ/definition"

/**
 * Constructs a new `Differ`.
 *
 * @tsplus static Differ.Ops __call
 * @tsplus static Differ.Ops make
 */
export function make<Value, Patch>(params: {
  readonly empty: Patch
  readonly diff: (oldValue: Value, newValue: Value) => Patch
  readonly combine: (first: Patch, second: Patch) => Patch
  readonly patch: (patch: Patch, oldValue: Value) => Value
}): Differ<Value, Patch> {
  return {
    [DifferSym]: DifferSym,
    ...params
  }
}
