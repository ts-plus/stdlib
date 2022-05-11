/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @tsplus fluent ImmutableArray uniq
 */
export function uniq_<A>(self: ImmutableArray<A>, E: Equivalence<A>): ImmutableArray<A> {
  const includes = arrayIncludes(E);
  const result: Array<A> = [];
  const length = self.array.length;
  let i = 0;
  for (; i < length; i = i + 1) {
    const a = self.array[i]!;
    if (!includes(result, a)) {
      result.push(a);
    }
  }
  return length === result.length ? self : new ImmutableArray(result);
}

/**
 * @tsplus static ImmutableArray/Aspects uniq
 */
export const uniq = Pipeable(uniq_);

function arrayIncludes<A>(E: Equivalence<A>) {
  return (array: Array<A>, value: A): boolean => {
    for (let i = 0; i < array.length; i = i + 1) {
      const element = array[i]!;
      if (E.equals(value, element)) {
        return true;
      }
    }
    return false;
  };
}
