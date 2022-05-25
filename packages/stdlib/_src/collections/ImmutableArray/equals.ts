/**
 * @tsplus operator ImmutableArray ==
 * @tsplus fluent ImmutableArray equals
 */
export function equals_<A>(self: ImmutableArray<A>, that: ImmutableArray<A>): boolean
export function equals_<A, B>(self: ImmutableArray<A>, that: ImmutableArray<B>): boolean
export function equals_<A, B>(self: ImmutableArray<A>, that: ImmutableArray<B>): boolean {
  return self.array.length === that.array.length &&
    self.array.every((v, i) => Equals.equals(v, that.array[i]))
}

/**
 * @tsplus static ImmutableArray/Aspects equals
 */
export const equals = Pipeable(equals_)
