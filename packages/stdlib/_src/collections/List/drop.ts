/**
 * Drops the first `n` elements.
 *
 * @tsplus static List.Aspects drop
 * @tsplus pipeable List drop
 */
export function drop(n: number) {
  return <A>(self: List<A>): List<A> => {
    if (n <= 0) {
      return self
    }

    if (n >= self.length) {
      return List.nil<A>()
    }

    let these = self

    let i = 0
    while (!these.isNil() && i < n) {
      these = these.tail

      i += 1
    }

    return these
  }
}
