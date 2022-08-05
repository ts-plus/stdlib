export const OrPatchSym = Symbol.for("@Differ.Or.Patch")
export type OrPatchSym = typeof OrPatchSym

export const OrPatchValueSym = Symbol.for("@Differ.Or.Patch.Value")
export type OrPatchValueSym = typeof OrPatchValueSym

export const OrPatchValue2Sym = Symbol.for("@Differ.Or.Patch.Value2")
export type OrPatchValue2Sym = typeof OrPatchValueSym

export const OrPatchPatchSym = Symbol.for("@Differ.Or.Patch.Patch")
export type OrPatchPatchSym = typeof OrPatchPatchSym

export const OrPatchPatch2Sym = Symbol.for("@Differ.Or.Patch.Patch2")
export type OrPatchPatch2Sym = typeof OrPatchPatch2Sym

/**
 * A patch which describes updates to either one value or another.
 *
 * @tsplus type Differ.Or.Patch
 */
export interface OrPatch<in out Value, in out Value2, in out Patch, in out Patch2> {
  readonly [OrPatchSym]: OrPatchSym
  readonly [OrPatchValueSym]: (_: Value) => Value
  readonly [OrPatchValue2Sym]: (_: Value2) => Value2
  readonly [OrPatchPatchSym]: (_: Patch) => Patch
  readonly [OrPatchPatch2Sym]: (_: Patch2) => Patch2
}

/**
 * @tsplus type Differ.Or.Patch.Ops
 */
export interface OrPatchOps {
  readonly $: OrPatchAspects
}
/**
 * @tsplus static Differ.Ops Or
 */
export const OrPatch: OrPatchOps = {
  $: {}
}

/**
 * @tsplus type Differ.Or.Patch.Aspects
 */
export interface OrPatchAspects {}

/**
 * @tsplus unify Differ.Or.Patch
 */
export function unifyOrPatch<X extends OrPatch<any, any, any, any>>(self: X): OrPatch<
  [X] extends [{ [OrPatchValueSym]: (_: infer Value) => infer Value }] ? Value : never,
  [X] extends [{ [OrPatchValue2Sym]: (_: infer Value2) => infer Value2 }] ? Value2 : never,
  [X] extends [{ [OrPatchPatchSym]: (_: infer Patch) => infer Patch }] ? Patch : never,
  [X] extends [{ [OrPatchPatch2Sym]: (_: infer Patch2) => infer Patch2 }] ? Patch2 : never
> {
  return self
}

export abstract class BaseOrPatch<Value, Value2, Patch, Patch2>
  implements OrPatch<Value, Value2, Patch, Patch2>
{
  readonly [OrPatchSym]: OrPatchSym = OrPatchSym
  readonly [OrPatchValueSym]!: (_: Value) => Value
  readonly [OrPatchValue2Sym]!: (_: Value2) => Value2
  readonly [OrPatchPatchSym]!: (_: Patch) => Patch
  readonly [OrPatchPatch2Sym]!: (_: Patch2) => Patch2
}

export class AndThenOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "AndThen"
  constructor(
    readonly first: OrPatch<Value, Value2, Patch, Patch2>,
    readonly second: OrPatch<Value, Value2, Patch, Patch2>
  ) {
    super()
  }
}

export class EmptyOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "Empty"
}

export class SetLeftOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "SetLeft"
  constructor(readonly value: Value) {
    super()
  }
}

export class SetRightOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "SetRight"
  constructor(readonly value: Value2) {
    super()
  }
}

export class UpdateLeftOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "UpdateLeft"
  constructor(readonly patch: Patch) {
    super()
  }
}

export class UpdateRightOrPatch<Value, Value2, Patch, Patch2>
  extends BaseOrPatch<Value, Value2, Patch, Patch2>
{
  readonly _tag = "UpdateRight"
  constructor(readonly patch: Patch2) {
    super()
  }
}

export type OrPatchInstruction =
  | AndThenOrPatch<any, any, any, any>
  | EmptyOrPatch<any, any, any, any>
  | SetLeftOrPatch<any, any, any, any>
  | SetRightOrPatch<any, any, any, any>
  | UpdateLeftOrPatch<any, any, any, any>
  | UpdateRightOrPatch<any, any, any, any>

/**
 * @tsplus macro identity
 */
export function orPatchInstruction<Value, Value2, Patch, Patch2>(
  self: OrPatch<Value, Value2, Patch, Patch2>
): OrPatchInstruction {
  // @ts-expect-error
  return self
}
