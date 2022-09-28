describe.concurrent("Either", () => {
  it("value right", () => {
    assert.isTrue(Either.right(0).right == Maybe.some(0))
    assert.isTrue(Either.right(0).left == Maybe.none)
  })

  it("value left", () => {
    assert.isTrue(Either.left(0).left == Maybe.some(0))
    assert.isTrue(Either.left(0).right == Maybe.none)
  })

  it("ap", () => {
    const f = (s: string): number => s.length

    assert.isTrue(Either.right(f).ap(Either.right("abc")) == Either.right(3))
    assert.isTrue(Either.right(f).ap(Either.left("error")) == Either.left("error"))
    assert.isTrue(
      Either.leftW<string, (s: string) => number>("error").ap(Either.right("abc")) ==
        Either.left("error")
    )
    assert.isTrue(Either.left("error").ap(Either.left("error")) == Either.left("error"))
  })

  it("catchAll", () => {
    assert.isTrue(
      (Either.rightW<number, string>(0).catchAll((s) => Either.right(s.length))) == Either.right(0)
    )
    assert.isTrue(
      (Either.leftW<string, number>("hello").catchAll((s) => Either.right(s.length))) ==
        Either.right(5)
    )
  })

  it("chainRec", () => {
    const chainRec = Either.ChainRec.chainRec

    assert.isTrue(chainRec((_: number) => Either.left("foo"))(1) == Either.left("foo"))
    assert.isTrue(chainRec((_: number) => Either.right(Either.right(1)))(1) == Either.right(1))
    assert.isTrue(
      chainRec((n: number) => {
        return n < 5
          ? Either.right(Either.left(n + 1))
          : Either.right(Either.right(n))
      })(1) == Either.right(5)
    )
  })

  it("compactOption", () => {
    assert.isTrue(
      Either.left("hello").compactMaybe(AssociativeIdentity.string) == Either.left("hello")
    )
    assert.isTrue(
      Either.right(Maybe.none).compactMaybe(AssociativeIdentity.string) == Either.left("")
    )
    assert.isTrue(
      Either.right(Maybe.some(0)).compactMaybe(AssociativeIdentity.string) == Either.right(0)
    )
  })

  it("do", () => {
    assert.deepStrictEqual(
      Either.Do
        .bind("a", () => Either.right(0))
        .bind("b", () => Either.right(1)),
      Either.right({ a: 0, b: 1 })
    )
    assert.deepStrictEqual(
      Either.Do
        .bind("a", () => Either.right(0))
        .bind("b", () => Either.left("error")),
      Either.left("error")
    )
  })

  it("duplicate", () => {
    assert.isTrue(
      Either.right(0).duplicate == Either.right(Either.right(0))
    )
    assert.isTrue(
      Either.left(0).duplicate == Either.left(0)
    )
  })

  it("equals", () => {
    assert.isTrue(
      Either.right(0) == Either.right(0)
    )
    assert.isFalse(
      Either.right(0) == Either.left(0)
    )
    assert.isFalse(
      Either.right(0) == Either.right(1)
    )
    assert.isFalse(
      Either.left(0) == Either.left(1)
    )
  })

  it("exists", () => {
    assert.isTrue(Either.right(0).exists(n => n <= 0))
    assert.isFalse(
      Either.leftW<string, number>("hello").exists((n) => n <= 0)
    )
  })

  it("extend", () => {
    assert.isTrue(
      Either.right(0).extend((either) => either.right) == Either.right(Maybe.some(0))
    )
    assert.isTrue(
      Either.left(0).extend((either) => either.left) == Either.left(0)
    )
  })

  it("filterOrElse", () => {
    assert.isTrue(
      Either.right(0).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.right(0)
    )
    assert.isTrue(
      Either.right(1).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.left(2)
    )
    assert.isTrue(
      Either.left(0).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.left(0)
    )
  })

  it("flatMap", () => {
    assert.isTrue(Either.right(0).flatMap((n) => Either.right(n + 1)) == Either.right(1))
    assert.isTrue(Either.right(0).flatMap((n) => Either.left(n + 1)) == Either.left(1))
    assert.isTrue(Either.left(0).flatMap((n) => Either.right(n + 1)) == Either.left(0))
    assert.isTrue(Either.left(0).flatMap((n) => Either.left(n + 1)) == Either.left(0))
  })

  it("flatten", () => {
    assert.isTrue(
      Either.right(Either.right(0)).flatten == Either.right(0)
    )
    assert.isTrue(
      Either.right(Either.left(0)).flatten == Either.left(0)
    )
    assert.isTrue(
      Either.left(Either.left(0)).flatten == Either.left(Either.left(0))
    )
  })

  it("fold", () => {
    assert.isTrue(Either.right(0).fold(() => false, () => true))
    assert.isTrue(Either.left(0).fold(() => true, () => false))
  })

  it("foldMap", () => {
    assert.strictEqual(Either.right("a").foldMap(AssociativeIdentity.string, identity), "a")
    assert.strictEqual(Either.left(1).foldMap(AssociativeIdentity.string, identity), "")
  })

  it("forEachF", () => {
    const forEach = Either.forEachF(Maybe.Applicative)
    const f = forEach((n: number) => Maybe.some(n))

    assert.isTrue(f(Either.right(0)) == Maybe.some(Either.right(0)))
    assert.isTrue(f(Either.left("error")) == Maybe.some(Either.left("error")))
  })

  it("fromNullable", () => {
    assert.isTrue(Either.fromNullable(0, () => 1) == Either.right(0))
    assert.isTrue(Either.fromNullable(undefined, () => 1) == Either.left(1))
  })

  it("fromOption", () => {
    assert.isTrue(Either.fromMaybe(Maybe.some(0), () => 1) == Either.right(0))
    assert.isTrue(Either.fromMaybe(Maybe.none, () => 1) == Either.left(1))
  })

  it("fromPredicate", () => {
    assert.isTrue(Either.fromPredicate(0, (n) => n <= 0, (n) => n + 1) == Either.right(0))
    assert.isTrue(Either.fromPredicate(1, (n) => n <= 0, (n) => n + 1) == Either.left(2))
  })

  it("gen", () => {
    assert.deepStrictEqual(
      Either.gen(function*($) {
        const a = yield* $(Either.right(0))
        const b = yield* $(Either.right(1))
        return a + b
      }),
      Either.right(1)
    )
    assert.deepStrictEqual(
      Either.gen(function*($) {
        yield* $(Either.left("error"))
      }),
      Either.left("error")
    )
  })

  it("getAssociative", () => {
    const S = Either.getAssociative(Associative.sum)

    assert.isTrue(S.combine(Either.left("a"), Either.left("b")) == Either.left("a"))
    assert.isTrue(S.combine(Either.left("a"), Either.right(2)) == Either.right(2))
    assert.isTrue(S.combine(Either.right(1), Either.left("b")) == Either.right(1))
    assert.isTrue(S.combine(Either.right(1), Either.right(2)) == Either.right(3))
  })

  it("getCompactF", () => {
    const compactF = Either.getCompactF(AssociativeIdentity.string)(Maybe.Applicative)
    const p = (n: number) => n > 2
    const f = compactF((n: number) => Maybe.some(p(n) ? Maybe.some(n + 1) : Maybe.none))

    assert.isTrue(f(Either.left("foo")) == Maybe.some(Either.left("foo")))
    assert.isTrue(f(Either.right(1)) == Maybe.some(Either.left("")))
    assert.isTrue(f(Either.right(3)) == Maybe.some(Either.right(4)))
  })

  it("getSeparateF", () => {
    const separateF = Either.getSeparateF(AssociativeIdentity.string)(Maybe.Applicative)
    const p = (n: number) => n > 2
    const f = separateF((n: number) => Maybe.some(p(n) ? Either.right(n + 1) : Either.left(n - 1)))

    assert.isTrue(
      f(Either.left("foo")) == Maybe.some([Either.left("foo"), Either.left("foo")])
    )
    assert.isTrue(f(Either.right(1)) == Maybe.some([Either.right(0), Either.left("")]))
    assert.isTrue(f(Either.right(3)) == Maybe.some([Either.left(""), Either.right(4)]))
  })

  it("getOrElse", () => {
    assert.strictEqual(Either.rightW<number, string>(0).getOrElse((s) => s.length), 0)
    assert.strictEqual(Either.leftW<string, number>("hello").getOrElse((s) => s.length), 5)
  })

  it("getValidationApplicative", () => {
    const A = Either.getValidationApplicative(AssociativeIdentity.string)

    assert.isTrue(A.both(Either.left("b"))(Either.left("a")) == Either.left("ab"))
  })

  it("getValidationAssociative", () => {
    const VS = Either.getValidationAssociative(Associative.string, Associative.sum)

    assert.isTrue(VS.combine(Either.right(1), Either.right(2)) == Either.right(3))
    assert.isTrue(VS.combine(Either.right(1), Either.left("foo")) == Either.left("foo"))
    assert.isTrue(VS.combine(Either.left("foo"), Either.right(1)) == Either.left("foo"))
    assert.isTrue(VS.combine(Either.left("foo"), Either.left("bar")) == Either.left("foobar"))
  })

  it("if", () => {
    assert.isTrue(Either.if_(true, Either.right(0), Either.right(1)) == Either.right(0))
    assert.isTrue(Either.if_(false, Either.right(0), Either.right(1)) == Either.right(1))
  })

  it("map", () => {
    assert.isTrue(Either.right(0).map((n) => n + 1) == Either.right(1))
    assert.isTrue(Either.left(0).map(n => n + 1) == Either.left(0))
  })

  it("mapLeft", () => {
    assert.isTrue(Either.rightW<number, string>(0).mapLeft((s) => s.length) == Either.right(0))
    assert.isTrue(Either.leftW<string, number>("hello").mapLeft((s) => s.length) == Either.left(5))
  })

  it("mapBoth", () => {
    const left: Either<string, number> = Either.left("hello")
    const right: Either<string, number> = Either.right(0)
    assert.isTrue(left.mapBoth((s) => s.length, (n) => n + 1) == Either.left(5))
    assert.isTrue(right.mapBoth((s) => s.length, (n) => n + 1) == Either.right(1))
  })

  it("merge", () => {
    assert.strictEqual(Either.right(0).merge, 0)
    assert.strictEqual(Either.left("hello").merge, "hello")
  })

  it("orElse", () => {
    assert.isTrue(
      (Either.right(0) | Either.right(1)) == Either.right(0)
    )
    assert.isTrue(
      (Either.left(0) | Either.right(1)) == Either.right(1)
    )
  })

  it("parseJSON", () => {
    assert.deepEqual(Either.parseJSON("{\"foo\":\"bar\"}", () => 0), Either.right({ foo: "bar" }))
    assert.deepEqual(Either.parseJSON("{\"foo:\"bar\"}", () => 0), Either.left(0))
  })

  it("reduce", () => {
    assert.strictEqual(Either.right(0).reduce("", (b, a) => b + a), "0")
    assert.strictEqual(Either.left(0).reduce("", (b, a) => b + a), "")
  })

  it("reduceRight", () => {
    assert.strictEqual(Either.right(0).reduceRight("", (b, a) => b + a), "0")
    assert.strictEqual(Either.left(0).reduceRight("", (b, a) => b + a), "")
  })

  it("sequence", () => {
    const sequence = Either.sequence(Maybe.Applicative)

    assert.isTrue(sequence(Either.right(Maybe.some(1))) == Maybe.some(Either.right(1)))
    assert.isTrue(sequence(Either.left("a")) == Maybe.some(Either.left("a")))
    assert.isTrue(sequence(Either.right(Maybe.none)) == Maybe.none)
  })

  it("stringifyJSON", () => {
    assert.isTrue(
      Either.stringifyJSON({ foo: "bar" }, () => 0) == Either.right("{\"foo\":\"bar\"}")
    )
  })

  it("struct", () => {
    assert.deepStrictEqual(
      Either.struct({
        a: Either.right(0),
        b: Either.right(1)
      }),
      Either.right({ a: 0, b: 1 })
    )
    assert.isTrue(Either.struct({ a: Either.left("error") }) == Either.left("error"))
  })

  it("swap", () => {
    assert.isTrue(Either.right(0).swap == Either.left(0))
    assert.isTrue(Either.left(0).swap == Either.right(0))
  })

  it("tap", () => {
    assert.isTrue(Either.right(0).tap((n) => Either.right(n + 1)) == Either.right(0))
    assert.isTrue(Either.right(0).tap((n) => Either.left(n + 1)) == Either.left(1))
  })

  it("tryCatch", () => {
    assert.isTrue(Either.tryCatch(0, () => 1) == Either.right(0))
    assert.isTrue(
      Either.tryCatch(() => {
        throw new Error("woops")
      }, (e) => (e as Error).message) == Either.left("woops")
    )
  })

  it("tuple", () => {
    assert.deepStrictEqual(Either.tuple(Either.right(0), Either.right(1)), Either.right([0, 1]))
    assert.deepStrictEqual(Either.tuple(Either.left("error")), Either.left("error"))
  })

  it("zip", () => {
    assert.isTrue(Either.right(0).zip(Either.right(1)) == Either.right([0, 1]))
    assert.isTrue(Either.right(0).zip(Either.left(1)) == Either.left(1))
  })

  it("zipLeft", () => {
    assert.isTrue((Either.right(0) < Either.right(1)) == Either.right(0))
    assert.isTrue((Either.right(0) < Either.left(1)) == Either.left(1))
  })

  it("zipRight", () => {
    assert.isTrue((Either.right(0) > Either.right(1)) == Either.right(1))
    assert.isTrue((Either.right(0) > Either.left(1)) == Either.left(1))
  })
})
