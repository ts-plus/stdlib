import type * as P from "@tsplus/stdlib/prelude/Covariant"
import type { Annotated } from "@tsplus/stdlib/prelude/Recursive"
import { Recursive } from "@tsplus/stdlib/prelude/Recursive"
import type { Unfolder } from "@tsplus/stdlib/prelude/Recursive/Unfolder"

function main() {
  const [s, t] = ["amnesia", "analysis"]
  console.time(`${s} => ${t}`)
  const value = editDistance(s, t)
  console.timeEnd(`${s} => ${t}`)
  console.log(`${s} => ${t} = ${value}`)
}
// From https://www.researchgate.net/publication/221440162_Recursion_Schemes_for_Dynamic_Programming
// Typically, edit distance uses a matrix of substrings to store best previous value
// eg the "ate" vs "pit" matrix.  To find the previous values corresponding to insertion,
// deletion and substitution for the cell labeled "*" are marked
//     _ a t e _
//     p . . . .
//     i . * I .
//     t . D S .
// We emulate this using a "walk-of-value" matrix -- one stored as a list.
// For example
// ("ate", "pit"), ("te", pit"), ("e", "pit"), ("", "pit"), ("ate", "it"), ("te", "it") ....
//
// We use an annotated fold over the matrix to store each "cells" edit distance and
// use the string's length to lookup neighboring cells and the answer pops out at the head
function editDistance(s: string, t: string) {
  return pipe(
    [s, t],
    Recursive.unfold(Functor, substrings(s)),
    Recursive.$.foldAnnotated(Functor, editDistanceAnnotatedAlgebra(s.length))
  )
}
function substrings(s0: string): Unfolder.Fn<ListF, Carrier> {
  return ([s, t]) => {
    const [, ...ss] = s
    const [, ...ts] = t
    switch (s.length) {
      case 0:
        return t.length == 0 ?
          new Leaf(["", ""]) :
          new Node(["", t], [s0, ts.join("")])
      default:
        return new Node([s, t], [ss.join(""), t])
    }
  }
}

function editDistanceAnnotatedAlgebra(len: number): Annotated.Fn<ListF, number> {
  type AnnotatedNode = Node<Annotated<ListF, number>>
  return (fa) =>
    Match.tag(fa, {
      "nil": () => 0,
      "cons": minDistance
    })

  function minDistance({ head: [[a], [b]], tail }: AnnotatedNode): number {
    return Math.min(
      lookup(0, tail) + 1, // insert
      lookup(len, tail) + 1, // delete
      lookup(len + 1, tail) + (a == b ? 0 : 1) // substitute
    )
  }
  function lookup(n: number, cache: Annotated<ListF, number>): number {
    return n <= 0 ?
      cache.annotations :
      Match.tag(cache.caseValue, {
        "nil": () => cache.annotations,
        "cons": ({ tail }) => lookup(n - 1, tail)
      })
  }
}
// Type definitions
type MyNonEmptyList<A> = Leaf<A> | Node<A>
type Carrier = readonly [string, string]
interface ListF extends HKT {
  readonly type: MyNonEmptyList<this["A"]>
}
export const Functor: Covariant<ListF> = HKT.instance<P.Covariant<ListF>>({
  map: (f) => (fa) => fa.map(f)
})
class Leaf<A> {
  readonly _tag = "nil"
  readonly "_A": A
  constructor(readonly value: Carrier) {
    return this
  }
  map<B>(_: (a: A) => B): MyNonEmptyList<B> {
    return this as any
  }
}
class Node<A> {
  readonly _tag = "cons"
  readonly "_A": A
  constructor(readonly head: Carrier, readonly tail: A) {}
  map<B>(f: (r: A) => B): MyNonEmptyList<B> {
    return new Node(this.head, f(this.tail))
  }
}
main()
