export const ChunkPatchSym = Symbol.for("@Differ.Chunk.Patch")
export type ChunkPatchSym = typeof ChunkPatchSym

export const ChunkPatchValueSym = Symbol.for("@Differ.Chunk.Patch.Value")
export type ChunkPatchValueSym = typeof ChunkPatchValueSym

export const ChunkPatchPatchSym = Symbol.for("@Differ.Chunk.Patch.Patch")
export type ChunkPatchPatchSym = typeof ChunkPatchPatchSym

/**
 * A patch which describes updates to a chunk of values.
 *
 * @tsplus type Differ.Chunk.Patch
 */
export interface ChunkPatch<in out Value, in out Patch> {
  readonly [ChunkPatchSym]: ChunkPatchSym
  readonly [ChunkPatchValueSym]: (_: Value) => Value
  readonly [ChunkPatchPatchSym]: (_: Patch) => Patch
}

/**
 * @tsplus type Differ.Chunk.Patch.Ops
 */
export interface ChunkPatchOps {
  readonly $: ChunkPatchAspects
}
/**
 * @tsplus static Differ.Ops Chunk
 */
export const ChunkPatch: ChunkPatchOps = {
  $: {}
}

/**
 * @tsplus type Differ.Chunk.Patch.Aspects
 */
export interface ChunkPatchAspects {}

/**
 * @tsplus unify Differ.Chunk.Patch
 */
export function unifyChunkPatch<X extends ChunkPatch<any, any>>(self: X): ChunkPatch<
  [X] extends [{ [ChunkPatchValueSym]: (_: infer Value) => infer Value }] ? Value : never,
  [X] extends [{ [ChunkPatchPatchSym]: (_: infer Patch) => infer Patch }] ? Patch : never
> {
  return self
}

export abstract class BaseChunkPatch<Value, Patch> implements ChunkPatch<Value, Patch> {
  readonly [ChunkPatchSym]: ChunkPatchSym = ChunkPatchSym
  readonly [ChunkPatchValueSym]!: (_: Value) => Value
  readonly [ChunkPatchPatchSym]!: (_: Patch) => Patch
}

export class AppendChunkPatch<Value, Patch> extends BaseChunkPatch<Value, Patch> {
  readonly _tag = "Append"
  constructor(readonly values: Chunk<Value>) {
    super()
  }
}

export class SliceChunkPatch<Value, Patch> extends BaseChunkPatch<Value, Patch> {
  readonly _tag = "Slice"
  constructor(readonly from: number, readonly until: number) {
    super()
  }
}

export class UpdateChunkPatch<Value, Patch> extends BaseChunkPatch<Value, Patch> {
  readonly _tag = "Update"
  constructor(readonly index: number, readonly patch: Patch) {
    super()
  }
}

export class AndThenChunkPatch<Value, Patch> extends BaseChunkPatch<Value, Patch> {
  readonly _tag = "AndThen"
  constructor(readonly first: ChunkPatch<Value, Patch>, readonly second: ChunkPatch<Value, Patch>) {
    super()
  }
}

export class EmptyChunkPatch<Value, Patch> extends BaseChunkPatch<Value, Patch> {
  readonly _tag = "Empty"
}

export type ChunkPatchInstruction =
  | AppendChunkPatch<any, any>
  | SliceChunkPatch<any, any>
  | UpdateChunkPatch<any, any>
  | AndThenChunkPatch<any, any>
  | EmptyChunkPatch<any, any>

/**
 * @tsplus macro identity
 */
export function chunkPatchInstruction<Value, Patch>(
  self: ChunkPatch<Value, Patch>
): ChunkPatchInstruction {
  // @ts-expect-error
  return self
}
