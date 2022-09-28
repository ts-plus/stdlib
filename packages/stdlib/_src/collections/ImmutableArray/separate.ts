/**
 * @tsplus getter ImmutableArray separate
 */
export function separate<A, B>(
  self: ImmutableArray<Either<A, B>>
): readonly [ImmutableArray<A>, ImmutableArray<B>] {
  const left: Array<A> = []
  const right: Array<B> = []
  for (const element of self) {
    if (element._tag === "Left") {
      left.push(element.left)
    } else {
      right.push(element.right)
    }
  }
  return [ImmutableArray.from(left), ImmutableArray.from(right)]
}
