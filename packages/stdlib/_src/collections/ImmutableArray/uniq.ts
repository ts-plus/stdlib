/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @tsplus static ImmutableArray.Aspects uniq
 * @tsplus pipeable ImmutableArray uniq
 */
export function uniq<A>(E: Equivalence<A>) {
  return (self: ImmutableArray<A>): ImmutableArray<A> => {
    const includes = arrayIncludes(E)
    const result: Array<A> = []
    const length = self.array.length
    let i = 0
    for (; i < length; i = i + 1) {
      const a = self.array[i]!
      if (!includes(result, a)) {
        result.push(a)
      }
    }
    return length === result.length ? self : new ImmutableArray(result)
  }
}

function arrayIncludes<A>(E: Equivalence<A>) {
  return (array: Array<A>, value: A): boolean => {
    for (let i = 0; i < array.length; i = i + 1) {
      const element = array[i]!
      if (E.equals(value, element)) {
        return true
      }
    }
    return false
  }
}
