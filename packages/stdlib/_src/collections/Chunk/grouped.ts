/**
 * Groups elements in chunks of up to `n` elements.
 *
 * @tsplus fluent Chunk grouped
 */
export function grouped_<A>(self: Chunk<A>, n: number): Chunk<Chunk<A>> {
  let gr = Chunk.empty<Chunk<A>>()
  let current = Chunk.empty<A>()

  self.forEach((a) => {
    current = current.append(a)
    if (current.size >= n) {
      gr = gr.append(current)
      current = Chunk.empty()
    }
  })

  if (current.size > 0) {
    gr = gr.append(current)
  }

  return gr
}

/**
 * Groups elements in chunks of up to `n` elements.
 *
 * @tsplus static Chunk/Aspects grouped
 */
export const grouped = Pipeable(grouped_)
