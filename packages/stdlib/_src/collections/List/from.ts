/**
 * Constructs a new `List` from an `Iterable`
 *
 * @tsplus static List.Ops from
 * @tsplus getter Collection toList
 */
export function from<A>(prefix: Collection<A>): List<A> {
  const iter = prefix[Symbol.iterator]()
  let a: IteratorResult<A>
  if (!(a = iter.next()).done) {
    const result = List.cons(a.value, List.nil())
    let curr = result
    while (!(a = iter.next()).done) {
      const temp = List.cons(a.value, List.nil())
      curr.tail = temp
      curr = temp
    }
    return result
  } else {
    return List.nil()
  }
}

/**
 * Constructs a new `List` from an `Iterable`
 *
 * @tsplus static List.Ops __call
 * @tsplus static List.Ops make
 */
export function make<As extends readonly any[]>(...prefix: As): List<As[number]> {
  return from(prefix)
}
