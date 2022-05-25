import { constFalse, constTrue } from "@tsplus/stdlib/data/Function"

describe.concurrent("Option", () => {
  it("value defined", () => {
    assert.strictEqual(Option.some(0).value, 0)
  })

  it("value undefined", () => {
    assert.isUndefined(Option.none.value)
  })

  it("ap", () => {
    assert.isTrue(Option.some((n: number) => n * 2).ap(Option.some(2)) == Option.some(4))
    assert.isTrue(Option.some((n: number) => n * 2).ap(Option.none) == Option.none)
    assert.isTrue(Option.none.ap(Option.some(2)) == Option.none)
    assert.isTrue(Option.none.ap(Option.none) == Option.none)
  })

  it("compactF", () => {
    const p = (n: number) => n > 2
    const compactF = Option.compactF(Either.Applicative)((n: number) =>
      Either.right(p(n) ? Option.some(n + 1) : Option.none)
    )

    assert.isTrue(compactF(Option.none) == Either.right(Option.none))
    assert.isTrue(compactF(Option.some(1)) == Either.right(Option.none))
    assert.isTrue(compactF(Option.some(3)) == Either.right(Option.some(4)))
  })

  it("do", () => {
    assert.deepStrictEqual(Option.Do.bind("a", () => Option.some("a")), Option.some({ a: "a" }))
    assert.deepStrictEqual(Option.Do.bind("a", () => Option.none), Option.none)
  })

  it("duplicate", () => {
    assert.isTrue(Option.some(1).duplicate() == Option.some(Option.some(1)))
  })

  it("equals", () => {
    assert.isTrue(
      Option.some(0) == Option.some(0)
    )
    assert.isFalse(
      Option.some(0) == Option.some(1)
    )
  })

  it("exists", () => {
    const p = (a: number) => a === 2

    assert.isFalse(Option.none.exists(p))
    assert.isFalse(Option.some(1).exists(p))
    assert.isTrue(Option.some(2).exists(p))
  })

  it("extend", () => {
    const f = Option.$.getOrElse(() => 0)

    assert.isTrue(Option.some(2).extend(f) == Option.some(2))
    assert.isTrue(Option.none.extend(f) == Option.none)
  })

  it("filter", () => {
    const p = (a: number) => a === 2

    assert.isTrue(Option.none.filter(p) == Option.none)
    assert.isTrue(Option.some(1).filter(p) == Option.none)
    assert.isTrue(Option.some(2).filter(p) == Option.some(2))
  })

  it("filterMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? Option.some(n + 1) : Option.none)

    assert.isTrue(Option.none.filterMap(f) == Option.none)
    assert.isTrue(Option.some(1).filterMap(f) == Option.none)
    assert.isTrue(Option.some(3).filterMap(f) == Option.some(4))
  })

  it("flatMap", () => {
    assert.isUndefined(Option.some(0).flatMap(() => Option.none).value)
    assert.strictEqual(Option.some(0).flatMap((n) => Option.some(n + 1)).value, 1)
  })

  it("flatten", () => {
    assert.isTrue(Option.some(Option.some(1)).flatten() == Option.some(1))
  })

  it("fold", () => {
    assert.isTrue(Option.some(true).fold(constFalse, constTrue))
    assert.isFalse(Option.none.fold(constFalse, constTrue))
  })

  it("forEachF", () => {
    const p = (n: number) => n > 2
    const forEachF = Option.forEachF(Either.Applicative)((n: number) => p(n) ? Either.right(n + 1) : Either.left(n - 1))

    assert.isTrue(forEachF(Option.some(1)) == Either.left(0))
    assert.isTrue(forEachF(Option.some(3)) == Either.right(Option.some(4)))
  })

  it("fromNullable", () => {
    assert.isTrue(Option.fromNullable(2) == Option.some(2))
    assert.isTrue(Option.fromNullable(null) == Option.none)
    assert.isTrue(Option.fromNullable(undefined) == Option.none)
  })

  it("fromPredicate", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => Option.fromPredicate(n, p)

    assert.isTrue(f(1) == Option.none)
    assert.isTrue(f(3) == Option.some(3))

    type Direction = "asc" | "desc"
    const parseDirection = (s: string) =>
      Option.fromPredicate(s, (s: string): s is Direction => s === "asc" || s === "desc")

    assert.isTrue(parseDirection("asc") == Option.some("asc"))
    assert.isTrue(parseDirection("foo") == Option.none)
  })

  it("gen", () => {
    assert.isTrue(
      Option.gen(function*($) {
        const s = yield* $(Option.some("hello"))
        return s.length
      }) == Option.some(5)
    )
    assert.isTrue(
      Option.gen(function*($) {
        const s = yield* $(Option.emptyOf<string>())
        return s.length
      }) == Option.none
    )
  })

  it("getApplyAssociative", () => {
    const S = Option.getApplyAssociative(Associative.sum)

    assert.isTrue(S.combine(Option.none, Option.none) == Option.none)
    assert.isTrue(S.combine(Option.some(1), Option.none) == Option.none)
    assert.isTrue(S.combine(Option.none, Option.some(1)) == Option.none)
    assert.isTrue(S.combine(Option.some(1), Option.some(2)) == Option.some(3))
  })

  it("getApplyAssociativeIdentity", () => {
    const M = Option.getApplyAssociativeIdentity(AssociativeIdentity.sum)

    assert.isTrue(M.combine(M.identity, Option.none) == Option.none)
    assert.isTrue(M.combine(Option.none, M.identity) == Option.none)
    assert.isTrue(M.combine(M.identity, Option.some(1)) == Option.some(1))
    assert.isTrue(M.combine(Option.some(1), M.identity) == Option.some(1))
  })

  it("getFirstAssociative", () => {
    const S = Option.getFirstAssociative<number>()

    assert.isTrue(S.combine(Option.none, Option.none) == Option.none)
    assert.isTrue(S.combine(Option.some(1), Option.none) == Option.some(1))
    assert.isTrue(S.combine(Option.none, Option.some(2)) == Option.some(2))
    assert.isTrue(S.combine(Option.some(1), Option.some(2)) == Option.some(1))
  })

  it("getFirstAssociativeIdentity", () => {
    const M = Option.getFirstAssociativeIdentity<number>()

    assert.isTrue(M.combine(Option.none, Option.none) == Option.none)
    assert.isTrue(M.combine(Option.some(1), Option.none) == Option.some(1))
    assert.isTrue(M.combine(Option.none, Option.some(2)) == Option.some(2))
    assert.isTrue(M.combine(Option.some(1), Option.some(2)) == Option.some(1))
  })

  it("getLastAssociative", () => {
    const S = Option.getLastAssociative<number>()

    assert.isTrue(S.combine(Option.none, Option.none) == Option.none)
    assert.isTrue(S.combine(Option.some(1), Option.none) == Option.some(1))
    assert.isTrue(S.combine(Option.none, Option.some(2)) == Option.some(2))
    assert.isTrue(S.combine(Option.some(1), Option.some(2)) == Option.some(1))
  })

  it("getLastAssociativeIdentity", () => {
    const M = Option.getLastAssociativeIdentity<number>()

    assert.isTrue(M.combine(Option.none, Option.none) == Option.none)
    assert.isTrue(M.combine(Option.some(1), Option.none) == Option.some(1))
    assert.isTrue(M.combine(Option.none, Option.some(2)) == Option.some(2))
    assert.isTrue(M.combine(Option.some(1), Option.some(2)) == Option.some(1))
  })

  it("getOrElse", () => {
    assert.strictEqual(Option.some(1).getOrElse(2), 1)
    assert.strictEqual(Option.none.getOrElse(2), 2)
  })

  it("getRefinement", () => {
    const f = (s: string | number): Option<string> => (typeof s === "string" ? Option.some(s) : Option.none)
    const isString = Option.getRefinement(f)

    assert.isTrue(isString("s"))
    assert.isFalse(isString(1))

    type A = { readonly type: "A" }
    type B = { readonly type: "B" }
    type C = A | B
    const isA = Option.getRefinement<C, A>((c) => (c.type === "A" ? Option.some(c) : Option.none))

    assert.isTrue(isA({ type: "A" }))
    assert.isFalse(isA({ type: "B" }))
  })

  it("if", () => {
    assert.isTrue(Option.if_(true, Option.some(1), Option.none) == Option.some(1))
    assert.isTrue(Option.if_(false, Option.some(1), Option.none) == Option.none)
  })

  it("map", () => {
    assert.strictEqual(Option.some(0).map((n) => n + 1).value, 1)
  })

  it("mapNullable", () => {
    assert.isTrue(Option.fromNullable(null).mapNullable((n) => n + 1) == Option.none)
    assert.isTrue(Option.fromNullable(0).mapNullable((n) => n + 1) == Option.some(1))
  })

  it("orElse", () => {
    assert.isTrue(Option.some(1).orElse(Option.some(2)) == Option.some(1))
    assert.isTrue(Option.none.orElse(Option.some(2)) == Option.some(2))
    assert.isTrue(Option.some(1).orElse(Option.none) == Option.some(1))
    assert.isTrue(Option.none.orElse(Option.none) == Option.none)
    assert.isTrue((Option.some(1) | Option.some(2)) == Option.some(1))
    assert.isTrue((Option.none | Option.some(2)) == Option.some(2))
  })

  it("partition", () => {
    const p = (n: number) => n > 2

    assert.isTrue(Option.none.partition(p) == Tuple(Option.none, Option.none))
    assert.isTrue(Option.some(1).partition(p) == Tuple(Option.some(1), Option.none))
    assert.isTrue(Option.some(3).partition(p) == Tuple(Option.none, Option.some(3)))
  })

  it("partitionMap", () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? Either.right(n + 1) : Either.left(n - 1))

    assert.isTrue(Option.none.partitionMap(f) == Tuple(Option.none, Option.none))
    assert.isTrue(Option.some(1).partitionMap(f) == Tuple(Option.some(0), Option.none))
    assert.isTrue(Option.some(3).partitionMap(f) == Tuple(Option.none, Option.some(4)))
  })

  it("separate", () => {
    assert.isTrue(Option.none.separate() == Tuple(Option.none, Option.none))
    assert.isTrue(Option.some(Either.left("123")).separate() == Tuple(Option.some("123"), Option.none))
    assert.isTrue(Option.some(Either.right("123")).separate() == Tuple(Option.none, Option.some("123")))
  })

  it("sequence", () => {
    const sequence = Option.sequence(Either.Applicative)

    assert.isTrue(sequence(Option.some(Either.right("a"))) == Either.right(Option.some("a")))
    assert.isTrue(sequence(Option.none) == Either.right(Option.none))
  })

  it("tap", () => {
    const log: Array<string> = []

    const result = Option.some("hello").tap((s) => {
      log.push(s)
      return Option.some(s.length)
    })

    assert.isTrue(result == Option.some("hello"))
    assert.deepStrictEqual(log, ["hello"])
  })

  it("toNullable", () => {
    assert.strictEqual(Option.some(1).toNullable(), 1)
    assert.isNull(Option.none.toNullable())
  })

  it("tryCatch", () => {
    assert.isTrue(Option.tryCatch(() => JSON.parse("2")) == Option.some(2))
    assert.isTrue(Option.tryCatch(() => JSON.parse("(")) == Option.none)
  })

  it("zip", () => {
    assert.isTrue((Option.some(1) + Option.some(2)) == Option.some(Tuple(1, 2)))
  })

  it("separateF", () => {
    const p = (n: number) => n > 2
    const separateF = Option.separateF(Either.Applicative)((n: number) =>
      Either.right(p(n) ? Either.right(n + 1) : Either.left(n - 1))
    )

    assert.isTrue(separateF(Option.none) == Either.right(Tuple(Option.none, Option.none)))
    assert.isTrue(separateF(Option.some(1)) == Either.right(Tuple(Option.some(0), Option.none)))
    assert.isTrue(separateF(Option.some(3)) == Either.right(Tuple(Option.none, Option.some(4))))
  })

  it("struct", () => {
    assert.deepStrictEqual(Option.struct({ a: Option.some("a") }), Option.some({ a: "a" }))
    assert.deepStrictEqual(Option.struct({ a: Option.none }), Option.none)
  })

  it("tuple", () => {
    assert.deepStrictEqual(Option.tuple(Option.some("a")), Option.some(["a"]))
    assert.deepStrictEqual(Option.tuple(Option.none), Option.none)
  })

  it("aspects", () => {
    const result = Option(0)(
      Option.$.map((n) => n + 1),
      Option.$.map((n) => n + 1),
      Option.$.flatMap((n) => Option(`ok: ${n}`))
    )

    assert.isTrue(
      result == Option("ok: 2")
    )
  })
})
