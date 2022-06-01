import type * as P from "@tsplus/stdlib/prelude/Covariant"
import { Recursive } from "@tsplus/stdlib/prelude/Recursive"
import type { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"

describe.concurrent("Recursive", () => {
  const succ = (n: NatR): NatR => Recursive(new Succ(n))
  const zero: NatR = Recursive(Zero.value)
  const one = succ(zero)
  const two = succ(one)
  const three = succ(two)
  const four = succ(three)
  const five = succ(four)

  describe("fold", () => {
    it("Recursive.fold", () => {
      const natsum = Recursive.fold(Covariant, sumAlgebra)
      assert.equal(natsum(zero), 0)
      assert.equal(natsum(one), 1)
      assert.equal(natsum(two), 2)
      assert.equal(natsum(three), 3)
    })
    it("fold", () => {
      assert.equal(five.fold(Covariant, sumAlgebra), 5)
    })

    it("fib", () => {
      const fib = Recursive.fold(Covariant, tupleFib)
      assert.equal(fib(zero).get(0), 0)
      assert.equal(fib(one).get(0), 1)
      assert.equal(fib(two).get(0), 1)
      assert.equal(fib(three).get(0), 2)
      assert.equal(fib(four).get(0), 3)
      assert.equal(fib(five).get(0), 5)
    })

    function sumAlgebra(c: Nat<number>): number {
      return Match.tag(c, {
        Zero: () => 0,
        Succ: (_) => 1 + _.value
      })
    }

    function tupleFib(r: Nat<Tuple<[number, number]>>): Tuple<[number, number]> {
      return Match.tag(r, {
        Zero: () => Tuple(0, 1),
        Succ: (m) =>
          Tuple(
            m.value.get(0) + m.value.get(1),
            m.value.get(0)
          )
      })
    }
  })

  describe("foldAnnotated", () => {
    it("Recursive.foldAnnotated", () => {
      const folder = Recursive.foldAnnotated(Covariant, annotatedSum)
      assert.equal(folder(zero), 0)
      assert.equal(folder(one), 1)
      assert.equal(folder(two), 2)
      assert.equal(folder(three), 3)
      assert.equal(folder(four), 4)
      assert.equal(folder(five), 5)
    })

    it("foldAnnotated", () => {
      assert.equal(five.foldAnnotated(Covariant, annotatedSum), 5)
    })

    it("fib", () => {
      const fib = Recursive.foldAnnotated(Covariant, annotatedFib)
      assert.equal(fib(one), 1)
      assert.equal(fib(two), 1)
      assert.equal(fib(three), 2)
      assert.equal(fib(four), 3)
      assert.equal(fib(five), 5)
    })

    function annotatedFib(r: Nat<Annotated<NatF, number>>): number {
      return Match.tag(r, {
        Zero: () => 0,
        Succ: (r) => r.value.annotations + lookup(1, r.value)
      })

      function lookup(n: number, cache: Annotated<NatF, number>): number {
        if (n == 0) return cache.annotations
        return Match.tag(cache.caseValue, {
          Zero: () => 1,
          Succ: (h) => lookup(n - 1, h.value)
        })
      }
    }

    function annotatedSum(r: Nat<Annotated<NatF, number>>): number {
      return Match.tag(r, {
        Zero: (_) => 0,
        Succ: (m) => 1 + m.value.annotations
      })
    }
  })
})

type Nat<A> = Succ<A> | Zero<A>
type NatR = Recursive<NatF>

interface NatF extends HKT {
  readonly type: Nat<this["A"]>
}

class Succ<A> {
  readonly _tag = "Succ"
  constructor(public value: A) {}
  map<B>(f: (a: A) => B): Nat<B> {
    return new Succ(f(this.value))
  }
}
export class Zero<A> {
  static value = new Zero<any>()
  public value!: never
  readonly _tag = "Zero"
  map<B>(_: (a: A) => B): Nat<B> {
    return this as any
  }
}
export const Covariant = HKT.instance<P.Covariant<NatF>>({
  map: (f) => (self) => self.map(f)
})
