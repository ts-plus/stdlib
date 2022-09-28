import { constFalse, constTrue } from "@tsplus/stdlib/data/Function"

describe.concurrent("Maybe", () => {
  it("value defined", () => {
    assert.strictEqual(Maybe.some(0).value, 0)
  })

  it("value undefined", () => {
    assert.isUndefined(Maybe.none.value)
  })

  it("ap", () => {
    assert.isTrue(Maybe.some((n: number) => n * 2).ap(Maybe.some(2)) == Maybe.some(4))
    assert.isTrue(Maybe.some((n: number) => n * 2).ap(Maybe.none) == Maybe.none)
    assert.isTrue(Maybe.none.ap(Maybe.some(2)) == Maybe.none)
    assert.isTrue(Maybe.none.ap(Maybe.none) == Maybe.none)
  })

  it("compactF", () => {
    const p = (n: number) => n > 2
    const compactF = Maybe.compactF(Either.Applicative)((n: number) =>
      Either.right(p(n) ? Maybe.some(n + 1) : Maybe.none)
    )

    assert.isTrue(compactF(Maybe.none) == Either.right(Maybe.none))
    assert.isTrue(compactF(Maybe.some(1)) == Either.right(Maybe.none))
    assert.isTrue(compactF(Maybe.some(3)) == Either.right(Maybe.some(4)))
  })

  it("do", () => {
    assert.deepStrictEqual(Maybe.Do.bind("a", () => Maybe.some("a")), Maybe.some({ a: "a" }))
    assert.deepStrictEqual(Maybe.Do.bind("a", () => Maybe.none), Maybe.none)
  })

  it("duplicate", () => {
    assert.isTrue(Maybe.some(1).duplicate == Maybe.some(Maybe.some(1)))
  })

  it("equals", () => {
    assert.isTrue(
      Maybe.some(0) == Maybe.some(0)
    )
    assert.isFalse(
      Maybe.some(0) == Maybe.some(1)
    )
  })

  it("exists", () => {
    const p = (a: number) => a === 2

    assert.isFalse(Maybe.none.exists(p))
    assert.isFalse(Maybe.some(1).exists(p))
    assert.isTrue(Maybe.some(2).exists(p))
  })

  it("extend", () => {
    const f = Maybe.$.getOrElse(() => 0)

    assert.isTrue(Maybe.some(2).extend(f) == Maybe.some(2))
    assert.isTrue(Maybe.none.extend(f) == Maybe.none)
  })

  it("filter", () => {
    const p = (a: number) => a === 2

    assert.isTrue(Maybe.none.filter(p) == Maybe.none)
    assert.isTrue(Maybe.some(1).filter(p) == Maybe.none)
    assert.isTrue(Maybe.some(2).filter(p) == Maybe.some(2))
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? Maybe.some(n + 1) : Maybe.none)

    assert.isTrue(Maybe.none.filterMap(f) == Maybe.none)
    assert.isTrue(Maybe.some(1).filterMap(f) == Maybe.none)
    assert.isTrue(Maybe.some(3).filterMap(f) == Maybe.some(4))
  })

  it("flatMap", () => {
    assert.isUndefined(Maybe.some(0).flatMap(() => Maybe.none).value)
    assert.strictEqual(Maybe.some(0).flatMap((n) => Maybe.some(n + 1)).value, 1)
  })

  it("flatten", () => {
    assert.isTrue(Maybe.some(Maybe.some(1)).flatten == Maybe.some(1))
  })

  it("fold", () => {
    assert.isTrue(Maybe.some(true).fold(constFalse, constTrue))
    assert.isFalse(Maybe.none.fold(constFalse, constTrue))
  })

  it("forEachF", () => {
    const p = (n: number) => n > 2
    const forEachF = Maybe.forEachF(Either.Applicative)((n: number) =>
      p(n) ? Either.right(n + 1) : Either.left(n - 1)
    )

    assert.isTrue(forEachF(Maybe.some(1)) == Either.left(0))
    assert.isTrue(forEachF(Maybe.some(3)) == Either.right(Maybe.some(4)))
  })

  it("fromNullable", () => {
    assert.isTrue(Maybe.fromNullable(2) == Maybe.some(2))
    assert.isTrue(Maybe.fromNullable(null) == Maybe.none)
    assert.isTrue(Maybe.fromNullable(undefined) == Maybe.none)
  })

  it("fromPredicate", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => Maybe.fromPredicate(n, p)

    assert.isTrue(f(1) == Maybe.none)
    assert.isTrue(f(3) == Maybe.some(3))

    type Direction = "asc" | "desc"
    const parseDirection = (s: string) =>
      Maybe.fromPredicate(s, (s: string): s is Direction => s === "asc" || s === "desc")

    assert.isTrue(parseDirection("asc") == Maybe.some("asc"))
    assert.isTrue(parseDirection("foo") == Maybe.none)
  })

  it("gen", () => {
    assert.isTrue(
      Maybe.gen(function*($) {
        const s = yield* $(Maybe.some("hello"))
        return s.length
      }) == Maybe.some(5)
    )
    assert.isTrue(
      Maybe.gen(function*($) {
        const s = yield* $(Maybe.empty<string>())
        return s.length
      }) == Maybe.none
    )
  })

  describe("getAssociativeIdentity", () => {
    it("Apply", () => {
      const M = Maybe.getAssociativeIdentity(AssociativeIdentity.sum)

      assert.isTrue(M.combine(M.identity, Maybe.none) == Maybe.none)
      assert.isTrue(M.combine(Maybe.none, M.identity) == Maybe.none)
      assert.isTrue(M.combine(M.identity, Maybe.some(1)) == Maybe.some(1))
      assert.isTrue(M.combine(Maybe.some(1), M.identity) == Maybe.some(1))
    })

    it("First", () => {
      const M = Maybe.getAssociativeIdentity<number>("First")

      assert.isTrue(M.combine(Maybe.none, Maybe.none) == Maybe.none)
      assert.isTrue(M.combine(Maybe.some(1), Maybe.none) == Maybe.some(1))
      assert.isTrue(M.combine(Maybe.none, Maybe.some(2)) == Maybe.some(2))
      assert.isTrue(M.combine(Maybe.some(1), Maybe.some(2)) == Maybe.some(1))
    })

    it("Last", () => {
      const M = Maybe.getAssociativeIdentity<number>("Last")

      assert.isTrue(M.combine(Maybe.none, Maybe.none) == Maybe.none)
      assert.isTrue(M.combine(Maybe.some(1), Maybe.none) == Maybe.some(1))
      assert.isTrue(M.combine(Maybe.none, Maybe.some(2)) == Maybe.some(2))
      assert.isTrue(M.combine(Maybe.some(1), Maybe.some(2)) == Maybe.some(2))
    })
  })

  it("getOrElse", () => {
    assert.strictEqual(Maybe.some(1).getOrElse(2), 1)
    assert.strictEqual(Maybe.none.getOrElse(2), 2)
  })

  it("getRefinement", () => {
    const f = (
      s: string | number
    ): Maybe<string> => (typeof s === "string" ? Maybe.some(s) : Maybe.none)
    const isString = Maybe.getRefinement(f)

    assert.isTrue(isString("s"))
    assert.isFalse(isString(1))

    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = Maybe.getRefinement<C, A>((c) => (c.type === "A" ? Maybe.some(c) : Maybe.none))

    assert.isTrue(isA({ type: "A" }))
    assert.isFalse(isA({ type: "B" }))
  })

  it("if", () => {
    assert.isTrue(Maybe.if_(true, Maybe.some(1), Maybe.none) == Maybe.some(1))
    assert.isTrue(Maybe.if_(false, Maybe.some(1), Maybe.none) == Maybe.none)
  })

  it("map", () => {
    assert.strictEqual(Maybe.some(0).map((n) => n + 1).value, 1)
  })

  it("mapNullable", () => {
    assert.isTrue(Maybe.fromNullable(null).mapNullable((n) => n + 1) == Maybe.none)
    assert.isTrue(Maybe.fromNullable(0).mapNullable((n) => n + 1) == Maybe.some(1))
  })

  it("orElse", () => {
    assert.isTrue(Maybe.some(1).orElse(Maybe.some(2)) == Maybe.some(1))
    assert.isTrue(Maybe.none.orElse(Maybe.some(2)) == Maybe.some(2))
    assert.isTrue(Maybe.some(1).orElse(Maybe.none) == Maybe.some(1))
    assert.isTrue(Maybe.none.orElse(Maybe.none) == Maybe.none)
    assert.isTrue((Maybe.some(1) | Maybe.some(2)) == Maybe.some(1))
    assert.isTrue((Maybe.none | Maybe.some(2)) == Maybe.some(2))
  })

  it("partition", () => {
    const p = (n: number) => n > 2

    assert.isTrue(Maybe.none.partition(p) == [Maybe.none, Maybe.none])
    assert.isTrue(Maybe.some(1).partition(p) == [Maybe.some(1), Maybe.none])
    assert.isTrue(Maybe.some(3).partition(p) == [Maybe.none, Maybe.some(3)])
  })

  it("partitionMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? Either.right(n + 1) : Either.left(n - 1))

    assert.isTrue(Maybe.none.partitionMap(f) == [Maybe.none, Maybe.none])
    assert.isTrue(Maybe.some(1).partitionMap(f) == [Maybe.some(0), Maybe.none])
    assert.isTrue(Maybe.some(3).partitionMap(f) == [Maybe.none, Maybe.some(4)])
  })

  it("separate", () => {
    assert.isTrue(Maybe.none.separate == [Maybe.none, Maybe.none])
    assert.isTrue(Maybe.some(Either.left("123")).separate == [Maybe.some("123"), Maybe.none])
    assert.isTrue(Maybe.some(Either.right("123")).separate == [Maybe.none, Maybe.some("123")])
  })

  it("sequence", () => {
    const sequence = Maybe.sequence(Either.Applicative)

    assert.isTrue(sequence(Maybe.some(Either.right("a"))) == Either.right(Maybe.some("a")))
    assert.isTrue(sequence(Maybe.none) == Either.right(Maybe.none))
  })

  it("tap", () => {
    const log: Array<string> = []

    const result = Maybe.some("hello").tap((s) => {
      log.push(s)
      return Maybe.some(s.length)
    })

    assert.isTrue(result == Maybe.some("hello"))
    assert.deepStrictEqual(log, ["hello"])
  })

  it("toNullable", () => {
    assert.strictEqual(Maybe.some(1).toNullable, 1)
    assert.isNull(Maybe.none.toNullable)
  })

  it("tryCatch", () => {
    assert.isTrue(Maybe.tryCatch(() => JSON.parse("2")) == Maybe.some(2))
    assert.isTrue(Maybe.tryCatch(() => JSON.parse("(")) == Maybe.none)
  })

  it("zip", () => {
    assert.isTrue((Maybe.some(1) + Maybe.some(2)) == Maybe.some([1, 2]))
  })

  it("separateF", () => {
    const p = (n: number) => n > 2
    const separateF = Maybe.separateF(Either.Applicative)((n: number) =>
      Either.right(p(n) ? Either.right(n + 1) : Either.left(n - 1))
    )

    assert.isTrue(separateF(Maybe.none) == Either.right([Maybe.none, Maybe.none]))
    assert.isTrue(separateF(Maybe.some(1)) == Either.right([Maybe.some(0), Maybe.none]))
    assert.isTrue(separateF(Maybe.some(3)) == Either.right([Maybe.none, Maybe.some(4)]))
  })

  it("struct", () => {
    assert.deepStrictEqual(Maybe.struct({ a: Maybe.some("a") }), Maybe.some({ a: "a" }))
    assert.deepStrictEqual(Maybe.struct({ a: Maybe.none }), Maybe.none)
  })

  it("tuple", () => {
    assert.deepStrictEqual(Maybe.tuple(Maybe.some("a")), Maybe.some(["a"]))
    assert.deepStrictEqual(Maybe.tuple(Maybe.none), Maybe.none)
  })

  it("aspects", () => {
    const result = pipe(
      Maybe(0),
      Maybe.$.map((n) => n + 1),
      Maybe.$.map((n) => n + 1),
      Maybe.$.flatMap((n) => Maybe(`ok: ${n}`))
    )
    assert.isTrue(
      result == Maybe("ok: 2")
    )
  })
})
