/**
 * Build a chunk with an integer range with both min/max included.
 *
 * @tsplus static Chunk.Ops range
 */
export function range(min: number, max: number): Chunk<number> {
  let builder = Chunk.empty<number>()
  for (let i = min; i <= max; i++) {
    builder = builder.append(i)
  }
  return builder
}
