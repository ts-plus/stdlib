import type { ChunkPatch } from "@tsplus/stdlib/collections/Chunk/patch/definition"
import type { HashMapPatch } from "@tsplus/stdlib/collections/HashMap/patch/definition"
import type { HashSetPatch } from "@tsplus/stdlib/collections/HashSet/patch/definition"
import type { OrPatch } from "@tsplus/stdlib/data/Differ/OrPatch/definition"

export const DifferSym = Symbol.for("@Differ")
export type DifferSym = typeof DifferSym

/**
 * A `Differ<Value, Patch>` knows how to compare an old value and new value of
 * type `Value` to produce a patch of type `Patch` that describes the
 * differences between those values. A `Differ` also knows how to apply a patch
 * to an old value to produce a new value that represents the old value updated
 * with the changes described by the patch.
 *
 * A `Differ` can be used to construct a `FiberRef` supporting compositional
 * updates using the `FiberRef.makePatch` constructor.
 *
 * The `Differ` companion object contains constructors for `Differ` values for
 * common data types such as `Chunk`, `HashMap`, and `HashSet``. In addition,
 * `Differ`values can be transformed using the `transform` operator and combined
 * using the `orElseEither` and `zip` operators. This allows creating `Differ`
 * values for arbitrarily complex data types compositionally.
 *
 * @tsplus type Differ
 */
export interface Differ<Value, Patch> {
  readonly [DifferSym]: DifferSym
  /**
   * An empty patch that describes no changes.
   */
  readonly empty: Patch
  /**
   * Constructs a patch describing the updates to a value from an old value and
   * a new value.
   */
  readonly diff: (oldValue: Value, newValue: Value) => Patch
  /**
   * Combines two patches to produce a new patch that describes the updates of
   * the first patch and then the updates of the second patch. The combine
   * operation should be associative. In addition, if the combine operation is
   * commutative then joining multiple fibers concurrently will result in
   * deterministic `FiberRef` values.
   */
  readonly combine: (first: Patch, second: Patch) => Patch
  /**
   * Applies a patch to an old value to produce a new value that is equal to the
   * old value with the updates described by the patch.
   */
  readonly patch: (patch: Patch, oldValue: Value) => Value
}

export declare namespace Differ {
  export namespace Or {
    export type Patch<Value, Value2, Patch, Patch2> = OrPatch<Value, Value2, Patch, Patch2>
  }

  export namespace Chunk {
    export type Patch<Value, Patch> = ChunkPatch<Value, Patch>
  }

  export namespace HashMap {
    export type Patch<Key, Value, Patch> = HashMapPatch<Key, Value, Patch>
  }

  export namespace HashSet {
    export type Patch<Value> = HashSetPatch<Value>
  }
}

/**
 * @tsplus type Differ.Ops
 */
export interface DifferOps {
  readonly $: DifferAspects
}
export const Differ: DifferOps = {
  $: {}
}

/**
 * @tsplus type Differ.Aspects
 */
export interface DifferAspects {}
