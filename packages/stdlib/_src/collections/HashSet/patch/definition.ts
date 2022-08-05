export const HashSetPatchSym = Symbol.for("@Differ.HashSet.Patch")
export type HashSetPatchSym = typeof HashSetPatchSym

export const HashSetPatchValueSym = Symbol.for("@Differ.HashSet.Patch.Value")
export type HashSetPatchValueSym = typeof HashSetPatchValueSym

/**
 * A patch which describes updates to a set of values.
 *
 * @tsplus type Differ.HashSet.Patch
 */
export interface HashSetPatch<in out Value> {
  readonly [HashSetPatchSym]: HashSetPatchSym
  readonly [HashSetPatchValueSym]: (_: Value) => Value
}

/**
 * @tsplus type Differ.HashSet.Patch.Ops
 */
export interface HashSetPatchOps {
  readonly $: HashSetPatchAspects
}
/**
 * @tsplus static Differ.Ops HashSet
 */
export const HashSetPatch: HashSetPatchOps = {
  $: {}
}

/**
 * @tsplus type Differ.HashSet.Patch.Aspects
 */
export interface HashSetPatchAspects {}

/**
 * @tsplus unify Differ.HashSet.Patch
 */
export function unifyHashSetPatch<X extends HashSetPatch<any>>(self: X): HashSetPatch<
  [X] extends [{ [HashSetPatchValueSym]: (_: infer Value) => infer Value }] ? Value : never
> {
  return self
}

export abstract class BaseHashSetPatch<Value> implements HashSetPatch<Value> {
  readonly [HashSetPatchSym]: HashSetPatchSym = HashSetPatchSym
  readonly [HashSetPatchValueSym]!: (_: Value) => Value
}

export class AddHashSetPatch<Value> extends BaseHashSetPatch<Value> {
  readonly _tag = "Add"
  constructor(readonly value: Value) {
    super()
  }
}

export class AndThenHashSetPatch<Value> extends BaseHashSetPatch<Value> {
  readonly _tag = "AndThen"
  constructor(readonly first: HashSetPatch<Value>, readonly second: HashSetPatch<Value>) {
    super()
  }
}

export class EmptyHashSetPatch<Value> extends BaseHashSetPatch<Value> {
  readonly _tag = "Empty"
}

export class RemoveHashSetPatch<Value> extends BaseHashSetPatch<Value> {
  readonly _tag = "Remove"
  constructor(readonly value: Value) {
    super()
  }
}

export type HashSetPatchInstruction =
  | AddHashSetPatch<any>
  | AndThenHashSetPatch<any>
  | EmptyHashSetPatch<any>
  | RemoveHashSetPatch<any>

/**
 * @tsplus macro identity
 */
export function hashSetPatchInstruction<Value>(self: HashSetPatch<Value>): HashSetPatchInstruction {
  // @ts-expect-error
  return self
}
