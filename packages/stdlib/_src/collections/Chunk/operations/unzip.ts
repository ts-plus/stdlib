/**
 * The function is reverse of `zip`. Takes an array of pairs and return two
 * corresponding arrays.
 *
 * @tsplus getter Chunk unzip
 */
export function unzip<A, B>(as: Chunk<readonly [A, B]>): readonly [Chunk<A>, Chunk<B>] {
  let fa: Chunk<A> = Chunk.empty()
  let fb: Chunk<B> = Chunk.empty()

  as.forEach(([a, b]) => {
    fa = fa.append(a)
    fb = fb.append(b)
  })

  return [fa, fb]
}
