export type NonEmptyArrayOrd = Array<Ord<any>> & { readonly 0: Ord<any> }

export type TupleOrd<T extends NonEmptyArrayOrd> = Readonly<
  {
    [K in keyof T]: [T[K]] extends [Ord<infer A>] ? A : never
  }
>

/**
 * Derives an Ord instance for a tuple
 *
 * @tsplus static Ord/Ops tuple
 */
export function tuple<T extends NonEmptyArrayOrd>(
  ...ords: T & {
    readonly 0: Ord<any>
  }
): Ord<TupleOrd<T>> {
  return Ord((first, second) => {
    let i = 0
    for (; i < ords.length - 1; i++) {
      const r = ords[i]!.compare(first[i], second[i])
      if (r !== 0) {
        return r
      }
    }
    return ords[i]!.compare(first[i], second[i])
  })
}
