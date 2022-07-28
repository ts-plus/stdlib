/**
 * @tsplus pipeable-operator ImmutableArray ==
 * @tsplus static ImmutableArray.Aspects equals
 * @tsplus pipeable ImmutableArray equals
 */
export function equals<A>(that: ImmutableArray<A>): (self: ImmutableArray<A>) => boolean
export function equals<B>(that: ImmutableArray<B>): <A>(self: ImmutableArray<A>) => boolean
export function equals<B>(that: ImmutableArray<B>) {
  return <A>(self: ImmutableArray<A>): boolean =>
    self.array.length === that.array.length &&
    self.array.every((v, i) => Equals.equals(v, that.array[i]))
}
