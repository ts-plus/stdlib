import { chunkPatchInstruction } from "@tsplus/stdlib/collections/Chunk/patch/definition"

/**
 * Applies a chunk patch to a chunk of values to produce a new chunk of
 * values which represents the original chunk of values updated with the
 * changes described by this patch.
 *
 * @tsplus static Differ.Chunk.Patch.Aspects apply
 * @tsplus pipeable Differ.Chunk.Patch apply
 */
export function apply<Value, Patch>(oldValue: Chunk<Value>, differ: Differ<Value, Patch>) {
  return (self: Differ.Chunk.Patch<Value, Patch>): Chunk<Value> =>
    applyLoop(differ, oldValue, List(self))
}

/**
 * @tsplus tailRec
 */
function applyLoop<Value, Patch>(
  differ: Differ<Value, Patch>,
  chunk: Chunk<Value>,
  patches: List<Differ.Chunk.Patch<Value, Patch>>
): Chunk<Value> {
  if (patches.isNil()) {
    return chunk
  }
  const patch = chunkPatchInstruction(patches.head)
  const nextPatches = patches.tail
  switch (patch._tag) {
    case "Append": {
      return applyLoop(differ, chunk.concat(patch.values), nextPatches)
    }
    case "AndThen": {
      return applyLoop(differ, chunk, nextPatches.prepend(patch.second).prepend(patch.first))
    }
    case "Empty": {
      return applyLoop(differ, chunk, nextPatches)
    }
    case "Slice": {
      return applyLoop(
        differ,
        Chunk.from(chunk.toArray.slice(patch.from, patch.until)),
        nextPatches
      )
    }
    case "Update": {
      const array = chunk.toArray
      array[patch.index] = differ.patch(patch.patch, array[patch.index]!)
      return applyLoop(differ, Chunk.from(array), nextPatches)
    }
  }
}
