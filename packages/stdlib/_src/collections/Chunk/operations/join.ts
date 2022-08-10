/**
 * joins the elements together with "sep" in the middle.
 *
 * @tsplus static Chunk.Aspects join
 * @tsplus pipeable Chunk join
 */
export function join(sep: string) {
  return (self: Chunk<string>): string =>
    self.reduce("", (s, a) => (s.length > 0 ? `${s}${sep}${a}` : a))
}
