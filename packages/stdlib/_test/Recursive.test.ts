import { Recursive } from "@tsplus/stdlib/prelude/Recursive"
import type { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"

describe.concurrent("Recursive", () => {
  type Nat<A> = Option<A>
  type NatF = Option.HKT
  type NatR = Recursive<NatF>
  const Covariant = Option.Covariant
  const succ = (a: NatR): NatR => Recursive(Option(a))
  const zero: NatR = Recursive(Option.none as any)
  const one = succ(zero)
  const two = succ(one)
  const three = succ(two)
  const four = succ(three)
  const five = succ(four)
  const sumAlgebra = (r: Nat<number>): number =>
    r.fold(
      () => 0,
      (r0) => 1 + r0
    )
  const natsum = Recursive.fold(Option.Covariant, sumAlgebra)

  describe.concurrent("fold", () => {
    it("sum", () => {
      assert.equal(natsum(zero), 0)
      assert.equal(natsum(five), 5)
      assert.equal(five.fold(Covariant, sumAlgebra), 5)
    })

    it("fib", () => {
      type T = Tuple<[number, number]>
      type NatT = Nat<T>
      const fibAlgebra = (r: NatT): T =>
        r.fold(
          () => Tuple(0, 1),
          ({ tuple: [n1, n2] }) => Tuple(n1 + n2, n1)
        )
      const fib = Recursive.fold(Covariant, fibAlgebra)
      assert.equal(fib(zero).get(0), 0)
      assert.equal(fib(one).get(0), 1)
      assert.equal(fib(five).get(0), 5)
      assert.equal(five.fold(Covariant, fibAlgebra).get(0), 5)
    })
  })

  describe.concurrent("foldAnnotated", () => {
    type NatAnnotated<A> = Nat<Annotated<NatF, A>>
    type Cache<A> = Annotated<NatF, A>
    it("sum", () => {
      const sumAlgebra = (r: NatAnnotated<number>): number =>
        r.fold(
          () => 0,
          (r0) => 1 + r0.annotations
        )
      const natsum = Recursive.foldAnnotated(Covariant, sumAlgebra)
      assert.equal(natsum(zero), 0)
      assert.equal(natsum(one), 1)
      assert.equal(natsum(five), 5)
      assert.equal(five.foldAnnotated(Covariant, sumAlgebra), 5)
    })

    it("fib", () => {
      const fibAlgebra = (r: NatAnnotated<number>): number =>
        r.fold(
          () => 0,
          (r0) => r0.annotations + lookup(1, r0)
        )

      const fib = Recursive.foldAnnotated(Covariant, fibAlgebra)
      assert.equal(fib(one), 1)
      assert.equal(fib(five), 5)
      assert.equal(five.foldAnnotated(Covariant, fibAlgebra), 5)

      function lookup(n: number, cache: Cache<number>): number {
        return (n == 0) ?
          cache.annotations :
          cache.caseValue.fold(
            () => 1,
            (h) => lookup(n - 1, h)
          )
      }
    })
  })

  describe.concurrent("unfold", () => {
    const Zero = Option.none
    const Succ = Option
    it("natural numbers", () => {
      const coalgebra = (a: number): Nat<number> => a == 0 ? Zero : Succ(a - 1)
      const expand = Recursive.unfold(Covariant, coalgebra)

      assert.equal(natsum(expand(0)), 0)
      assert.equal(natsum(expand(5)), 5)
    })
  })

  describe.concurrent("foldDown", () => {
    it("sum", () => {
      const sumAlgebra = (accum: number, r: Nat<NatR>) =>
        r.fold(
          () => accum,
          (_) => accum + 1
        )
      const sum = Recursive.foldDown(Option.Foldable, 0, sumAlgebra)
      assert.equal(sum(zero), 0)
      assert.equal(sum(one), 1)
      assert.equal(sum(five), 5)
      assert.equal(five.foldDown(Option.Foldable, 0, sumAlgebra), 5)
    })
    it("fib", () => {
      const fibAlgebra: Recursive.FoldDownFn<NatF, Tuple<[number, number]>> = ({ tuple: [n1, n2] }, r) =>
        r.fold(
          () => Tuple(n1, n2),
          (_) => Tuple(n1 + n2, n1)
        )
      const fib = Recursive.foldDown(Option.Foldable, Tuple(0, 1), fibAlgebra)
      assert.equal(fib(zero).get(0), 0)
      assert.equal(fib(one).get(0), 1)
      assert.equal(fib(five).get(0), 5)
    })
  })
})
