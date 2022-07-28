/**
 * @tsplus static Chunk.Ops getShow
 */
export function getShow<A>(S: Show<A>): Show<Chunk<A>> {
  return Show((chunk) => `Chunk(${chunk.map(S.show).join(", ")})`)
}
