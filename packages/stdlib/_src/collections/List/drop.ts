/**
 * Drops the first `n` elements.
 *
 * @tsplus fluent List drop
 */
export function drop_<A, B>(self: List<A>, n: number): List<A> {
  if (n <= 0) {
    return self
  } else if (n >= self.length()) {
    return List.nil<A>()
  } else {
    let these = self

    let i = 0
    while (!these.isNil() && i < n) {
      these = these.tail

      i += 1
    }

    return these
  }
}

export const drop = Pipeable(drop_)
