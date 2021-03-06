/**
 * joins the elements together with "sep" in the middle.
 *
 * @tsplus fluent Chunk join
 */
export function join_(self: Chunk<string>, sep: string): string {
  return self.reduce("", (s, a) => (s.length > 0 ? `${s}${sep}${a}` : a))
}

/**
 * joins the elements together with "sep" in the middle.
 *
 * @tsplus static Chunk/Aspects join
 */
export const join = Pipeable(join_)
