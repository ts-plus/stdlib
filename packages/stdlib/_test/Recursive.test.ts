import { Recursive } from "@tsplus/stdlib/prelude/Recursive"
import type { Annotated } from "@tsplus/stdlib/prelude/Recursive/Annotated"

describe.concurrent("Recursive", () => {
  type Nat<A> = Maybe<A>
  type NatF = Maybe.HKT
  type NatR = Recursive<NatF>
  const Covariant = Maybe.Covariant
  const Foldable = Maybe.Foldable
  const succ = (a: NatR): NatR => Recursive(Maybe(a))
  const zero: NatR = Recursive(Maybe.none as any)
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
  const natsum = Recursive.fold(Maybe.Covariant, sumAlgebra)

  describe("fold", () => {
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

    it("depth first", () => {
      const f = (r: Nat<number[]>) =>
        r.fold(
          () => [-1],
          (accum) => accum.concat([accum.length + 1])
        )
      assert.deepEqual(two.fold(Covariant, f), [-1, 2, 3])
    })
  })

  describe("foldAnnotated", () => {
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

  describe("unfold", () => {
    const Zero = Maybe.none
    const Succ = Maybe
    it("natural numbers", () => {
      const coalgebra = (a: number): Nat<number> => a == 0 ? Zero : Succ(a - 1)
      const expand = Recursive.unfold(Covariant, coalgebra)

      assert.equal(natsum(expand(0)), 0)
      assert.equal(natsum(expand(5)), 5)
    })
  })

  describe("foldDown", () => {
    it("sum", () => {
      const sumAlgebra = (accum: number, r: Recursive<NatF>) =>
        r.caseValue.fold(
          () => accum,
          () => accum + 1
        )
      const sum = Recursive.foldDown(Maybe.Foldable, 0, sumAlgebra)
      assert.equal(sum(zero), 0)
      assert.equal(sum(one), 1)
      assert.equal(sum(five), 5)
      assert.equal(five.foldDown(Maybe.Foldable, 0, sumAlgebra), 5)
    })

    it("breadth first", () => {
      const f = (accum: number[], r: Recursive<NatF>) =>
        r.caseValue.fold(
          () => accum.concat([-1]),
          () => accum.concat([accum.length + 1])
        )

      assert.deepEqual(five.foldDown(Foldable, [], f), [1, 2, 3, 4, 5, -1])
    })

    it("fib", () => {
      type FibDownR = Recursive.FoldDownFn<NatF, Tuple<[number, number]>>
      const fibAlgebra: FibDownR = ({ tuple: [n1, n2] }, r) =>
        r.caseValue.fold(
          () => Tuple(n1, n2),
          (_) => Tuple(n1 + n2, n1)
        )
      const fib = Recursive.foldDown(Maybe.Foldable, Tuple(0, 1), fibAlgebra)
      assert.equal(fib(zero).get(0), 0)
      assert.equal(fib(one).get(0), 1)
      assert.equal(fib(five).get(0), 5)
    })
  })

  describe("foldDownSome", () => {
    it("max", () => {
      const maxNumber = (max: number) =>
        (accum: number, r: Nat<NatR>): Maybe<number> =>
          r.fold(
            () => Maybe.some(accum),
            () => accum < max ? Maybe.some(accum + 1) : Maybe.none
          )
      assert.equal(five.foldDownSome(Foldable, 0, maxNumber(3)), 3)
      assert.equal(two.foldDownSome(Foldable, 0, maxNumber(3)), 2)
    })

    it("breadth-first", () => {
      const maxCollect = (max: number) =>
        (accum: number[], r: Nat<NatR>) =>
          r.fold(
            () => Maybe.some(accum.concat(-1)),
            () => accum.length < max ? Maybe.some(accum.concat(accum.length)) : Maybe.none
          )
      assert.deepEqual(two.foldDownSome(Foldable, [], maxCollect(5)), [0, 1, -1])
      assert.deepEqual(five.foldDownSome(Foldable, [], maxCollect(4)), [0, 1, 2, 3, -1])
    })
  })

  describe("foldUp", () => {
    it("sum", () => {
      const sum = (accum: number, r: NatR) =>
        r.caseValue.fold(
          () => accum,
          () => accum + 1
        )

      assert.equal(five.foldUp(Foldable, 0, sum), 5)
    })

    it("depth-first", () => {
      const toList = (accum: number[], r: NatR) => {
        return r.caseValue.fold(
          () => accum.concat([-1]),
          () => accum.concat([accum.length])
        )
      }
      assert.deepEqual(five.foldUp(Foldable, [], toList), [-1, 1, 2, 3, 4, 5])
    })
  })

  describe('foldM', () => {
    // Need an HKT<Eval>
    it.todo('sumAndPrint', () => {
    })
  })
})
