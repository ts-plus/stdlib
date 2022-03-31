describe("Either", () => {
  it("equals", () => {
    assert.isTrue(
      Either.right(0) == Either.right(0)
    );
    assert.isFalse(
      Either.right(0) == Either.left(0)
    );
    assert.isFalse(
      Either.right(0) == Either.right(1)
    );
    assert.isFalse(
      Either.left(0) == Either.left(1)
    );
  });
  it("value right", () => {
    assert.isTrue(Either.right(0).right == Option.some(0));
    assert.isTrue(Either.right(0).left == Option.none);
  });
  it("value left", () => {
    assert.isTrue(Either.left(0).left == Option.some(0));
    assert.isTrue(Either.left(0).right == Option.none);
  });
  it("map", () => {
    assert.isTrue(Either.right(0).map((n) => n + 1) == Either.right(1));
    assert.isTrue(Either.left(0).map(n => n + 1) == Either.left(0));
  });
  it("mapLeft", () => {
    assert.isTrue(Either.rightW<number, string>(0).mapLeft((s) => s.length) == Either.right(0));
    assert.isTrue(Either.leftW<string, number>("hello").mapLeft((s) => s.length) == Either.left(5));
  });
  it("mapBoth", () => {
    const left: Either<string, number> = Either.left("hello");
    const right: Either<string, number> = Either.right(0);
    assert.isTrue(left.mapBoth((s) => s.length, (n) => n + 1) == Either.left(5));
    assert.isTrue(right.mapBoth((s) => s.length, (n) => n + 1) == Either.right(1));
  });
  it("flatMap", () => {
    assert.isTrue(Either.right(0).flatMap((n) => Either.right(n + 1)) == Either.right(1));
    assert.isTrue(Either.right(0).flatMap((n) => Either.left(n + 1)) == Either.left(1));
    assert.isTrue(Either.left(0).flatMap((n) => Either.right(n + 1)) == Either.left(0));
    assert.isTrue(Either.left(0).flatMap((n) => Either.left(n + 1)) == Either.left(0));
  });
  it("catchAll", () => {
    assert.isTrue(
      (Either.rightW<number, string>(0).catchAll((s) => Either.right(s.length))) == Either.right(0)
    );
    assert.isTrue(
      (Either.leftW<string, number>("hello").catchAll((s) => Either.right(s.length))) == Either.right(5)
    );
  });
  it("duplicate", () => {
    assert.isTrue(
      Either.right(0).duplicate() == Either.right(Either.right(0))
    );
    assert.isTrue(
      Either.left(0).duplicate() == Either.left(0)
    );
  });
  it("exists", () => {
    assert.isTrue(Either.right(0).exists(n => n <= 0));
    assert.isFalse(
      Either.leftW<string, number>("hello").exists((n) => n <= 0)
    );
  });
  it("extend", () => {
    assert.isTrue(
      Either.right(0).extend((either) => either.right) == Either.right(Option.some(0))
    );
    assert.isTrue(
      Either.left(0).extend((either) => either.left) == Either.left(0)
    );
  });
  it("filterOrElse", () => {
    assert.isTrue(
      Either.right(0).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.right(0)
    );
    assert.isTrue(
      Either.right(1).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.left(2)
    );
    assert.isTrue(
      Either.left(0).filterOrElse((n) => n <= 0, (n) => n + 1) == Either.left(0)
    );
  });
  it("flatten", () => {
    assert.isTrue(
      Either.right(Either.right(0)).flatten() == Either.right(0)
    );
    assert.isTrue(
      Either.right(Either.left(0)).flatten() == Either.left(0)
    );
    assert.isTrue(
      Either.left(Either.left(0)).flatten() == Either.left(Either.left(0))
    );
  });
  it("fold", () => {
    assert.isTrue(Either.right(0).fold(() => false, () => true));
    assert.isTrue(Either.left(0).fold(() => true, () => false));
  });
  it("fromNullable", () => {
    assert.isTrue(Either.fromNullable(0, () => 1) == Either.right(0));
    assert.isTrue(Either.fromNullable(undefined, () => 1) == Either.left(1));
  });
  it("fromOption", () => {
    assert.isTrue(Either.fromOption(Option.some(0), () => 1) == Either.right(0));
    assert.isTrue(Either.fromOption(Option.none, () => 1) == Either.left(1));
  });
  it("fromPredicate", () => {
    assert.isTrue(Either.fromPredicate(0, (n) => n <= 0, (n) => n + 1) == Either.right(0));
    assert.isTrue(Either.fromPredicate(1, (n) => n <= 0, (n) => n + 1) == Either.left(2));
  });
  it("getOrElse", () => {
    assert.strictEqual(Either.rightW<number, string>(0).getOrElse((s) => s.length), 0);
    assert.strictEqual(Either.leftW<string, number>("hello").getOrElse((s) => s.length), 5);
  });
  it("merge", () => {
    assert.strictEqual(Either.right(0).merge(), 0);
    assert.strictEqual(Either.left("hello").merge(), "hello");
  });
  it("orElse", () => {
    assert.isTrue(
      (Either.right(0) | Either.right(1)) == Either.right(0)
    );
    assert.isTrue(
      (Either.left(0) | Either.right(1)) == Either.right(1)
    );
  });
  it("parseJSON", () => {
    assert.deepEqual(Either.parseJSON("{\"foo\":\"bar\"}", () => 0), Either.right({ foo: "bar" }));
    assert.deepEqual(Either.parseJSON("{\"foo:\"bar\"}", () => 0), Either.left(0));
  });
  it("reduce", () => {
    assert.strictEqual(Either.right(0).reduce("", (b, a) => b + a), "0");
    assert.strictEqual(Either.left(0).reduce("", (b, a) => b + a), "");
  });
  it("stringifyJSON", () => {
    assert.isTrue(Either.stringifyJSON({ foo: "bar" }, () => 0) == Either.right("{\"foo\":\"bar\"}"));
  });
  it("swap", () => {
    assert.isTrue(Either.right(0).swap() == Either.left(0));
    assert.isTrue(Either.left(0).swap() == Either.right(0));
  });
  it("tap", () => {
    assert.isTrue(Either.right(0).tap((n) => Either.right(n + 1)) == Either.right(0));
    assert.isTrue(Either.right(0).tap((n) => Either.left(n + 1)) == Either.left(1));
  });
  it("tryCatch", () => {
    assert.isTrue(Either.tryCatch(0, () => 1) == Either.right(0));
    assert.isTrue(
      Either.tryCatch(() => {
        throw new Error("woops");
      }, (e) => (e as Error).message) == Either.left("woops")
    );
  });
  it("zip", () => {
    assert.isTrue(Either.right(0).zip(Either.right(1)) == Either.right(Tuple(0, 1)));
    assert.isTrue(Either.right(0).zip(Either.left(1)) == Either.left(1));
  });
  it("zipLeft", () => {
    assert.isTrue((Either.right(0) < Either.right(1)) == Either.right(0));
    assert.isTrue((Either.right(0) < Either.left(1)) == Either.left(1));
  });
  it("zipRight", () => {
    assert.isTrue((Either.right(0) > Either.right(1)) == Either.right(1));
    assert.isTrue((Either.right(0) > Either.left(1)) == Either.left(1));
  });
});
