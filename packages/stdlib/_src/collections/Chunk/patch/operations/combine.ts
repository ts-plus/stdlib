import { AndThenChunkPatch } from "@tsplus/stdlib/collections/Chunk/patch/definition"

/**
 * Combines two chunk patches to produce a new chunk patch that describes
 * applying their changes sequentially.
 *
 * @tsplus static Differ.Chunk.Patch.Aspects combine
 * @tsplus pipeable Differ.Chunk.Patch combine
 */
export function combine<Value, Patch>(that: Differ.Chunk.Patch<Value, Patch>) {
  return (self: Differ.Chunk.Patch<Value, Patch>): Differ.Chunk.Patch<Value, Patch> =>
    new AndThenChunkPatch(self, that)
}
