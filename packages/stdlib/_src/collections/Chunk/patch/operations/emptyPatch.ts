import { EmptyChunkPatch } from "@tsplus/stdlib/collections/Chunk/patch/definition"

/**
 * Constructs an empty chunk patch.
 *
 * @tsplus static Differ.Chunk.Patch.Ops empty
 */
export function emptyPatch<Value, Patch>(): Differ.Chunk.Patch<Value, Patch> {
  return new EmptyChunkPatch()
}
