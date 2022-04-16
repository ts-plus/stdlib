describe.concurrent("ImmutableMap", () => {
  it("compact", () => {
    const map = ImmutableMap(Tuple(1, Option.some("a")), Tuple(2, Option.none));

    const result = map.compact();

    assert.isTrue(result == ImmutableMap(Tuple(1, "a")));
  });

  it("copy", () => {
    const map = ImmutableMap(Tuple(1, "a"));

    const result = map.copy();

    assert.notStrictEqual(map, result);
  });

  it("empty", () => {
    const map = ImmutableMap.empty<number, string>();

    assert.strictEqual(map.size, 0);
  });

  it("filter", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.filter((char) => char === "b");

    assert.isTrue(result == ImmutableMap(Tuple(2, "b")));
  });

  it("filterWithIndex", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.filterWithIndex((key, char) => key < 2 || char === "b");

    assert.isTrue(result == ImmutableMap(Tuple(1, "a"), Tuple(2, "b")));
  });

  it("filterMap", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.filterMap((char) => char === "b" ? Option.some(char.toUpperCase()) : Option.none);

    assert.isTrue(result == ImmutableMap(Tuple(2, "B")));
  });

  it("filterMapWithIndex", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.filterMapWithIndex((key, char) =>
      key < 2 || char === "b" ? Option.some(char.toUpperCase()) : Option.none
    );

    assert.isTrue(result == ImmutableMap(Tuple(1, "A"), Tuple(2, "B")));
  });

  it("get", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    assert.isTrue(map.get(1) == Option.some("a"));
    assert.isTrue(map.get(4) == Option.none);
  });

  it("has", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    assert.isTrue(map.has(1));
    assert.isFalse(map.has(4));
  });

  it("isEmpty", () => {
    assert.isTrue(ImmutableMap.empty<number, string>().isEmpty());
    assert.isFalse(ImmutableMap(Tuple(1, "a")).isEmpty());
  });

  it("map", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.map((v) => v.toUpperCase());

    assert.isTrue(result == ImmutableMap(Tuple(1, "A"), Tuple(2, "B"), Tuple(3, "C")));
  });

  it("mapWithIndex", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.mapWithIndex((k, v) => k + v.toUpperCase());

    assert.isTrue(result == ImmutableMap(Tuple(1, "1A"), Tuple(2, "2B"), Tuple(3, "3C")));
  });

  it("remove", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result1 = map.remove(1);
    const result2 = result1.remove(1);

    assert.isTrue(result1 == ImmutableMap(Tuple(2, "b"), Tuple(3, "c")));
    assert.isTrue(result2 == ImmutableMap(Tuple(2, "b"), Tuple(3, "c")));
  });

  it("removeMany", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result = map.removeMany([1, 2, 3]);

    assert.isTrue(result == ImmutableMap.empty<number, string>());
  });

  it("set", () => {
    const map = ImmutableMap.empty<number, string>();

    const result = map.set(1, "a");

    assert.isTrue(result == ImmutableMap(Tuple(1, "a")));
  });

  it("size", () => {
    assert.strictEqual(ImmutableMap.empty<number, string>().size, 0);
    assert.strictEqual(ImmutableMap(Tuple(1, "a")).size, 1);
  });

  it("update", () => {
    const map = ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"));

    const result1 = map.update(1, Option.$.fold(Option.some("-"), (char) => Option.some(char.toUpperCase())));
    const result2 = map.update(4, Option.$.fold(Option.some("-"), (char) => Option.some(char.toUpperCase())));

    assert.isTrue(result1 == ImmutableMap(Tuple(2, "b"), Tuple(3, "c")));
    assert.isTrue(result2 == ImmutableMap(Tuple(1, "a"), Tuple(2, "b"), Tuple(3, "c"), Tuple(4, "-")));
  });
});
