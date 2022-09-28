describe.concurrent("ImmutableMap", () => {
  it("compact", () => {
    const map = ImmutableMap([1, Maybe.some("a")], [2, Maybe.none])

    const result = map.compact

    assert.isTrue(result == ImmutableMap([1, "a"]))
  })

  it("copy", () => {
    const map = ImmutableMap([1, "a"])

    const result = map.copy

    assert.notStrictEqual(map, result)
  })

  it("empty", () => {
    const map = ImmutableMap.empty<number, string>()

    assert.strictEqual(map.size, 0)
  })

  it("filter", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.filter((char) => char === "b")

    assert.isTrue(result == ImmutableMap([2, "b"]))
  })

  it("filterWithIndex", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.filterWithIndex((key, char) => key < 2 || char === "b")

    assert.isTrue(result == ImmutableMap([1, "a"], [2, "b"]))
  })

  it("filterMap", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.filterMap((char) =>
      char === "b" ? Maybe.some(char.toUpperCase()) : Maybe.none
    )

    assert.isTrue(result == ImmutableMap([2, "B"]))
  })

  it("filterMapWithIndex", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.filterMapWithIndex((key, char) =>
      key < 2 || char === "b" ? Maybe.some(char.toUpperCase()) : Maybe.none
    )

    assert.isTrue(result == ImmutableMap([1, "A"], [2, "B"]))
  })

  it("get", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    assert.isTrue(map.get(1) == Maybe.some("a"))
    assert.isTrue(map.get(4) == Maybe.none)
  })

  it("has", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    assert.isTrue(map.has(1))
    assert.isFalse(map.has(4))
  })

  it("isEmpty", () => {
    assert.isTrue(ImmutableMap.empty<number, string>().isEmpty)
    assert.isFalse(ImmutableMap([1, "a"]).isEmpty)
  })

  it("map", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.map((v) => v.toUpperCase())

    assert.isTrue(result == ImmutableMap([1, "A"], [2, "B"], [3, "C"]))
  })

  it("mapWithIndex", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.mapWithIndex((k, v) => k + v.toUpperCase())

    assert.isTrue(result == ImmutableMap([1, "1A"], [2, "2B"], [3, "3C"]))
  })

  it("remove", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result1 = map.remove(1)
    const result2 = result1.remove(1)

    assert.isTrue(result1 == ImmutableMap([2, "b"], [3, "c"]))
    assert.isTrue(result2 == ImmutableMap([2, "b"], [3, "c"]))
  })

  it("removeMany", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result = map.removeMany([1, 2, 3])

    assert.isTrue(result == ImmutableMap.empty<number, string>())
  })

  it("set", () => {
    const map = ImmutableMap.empty<number, string>()

    const result = map.set(1, "a")

    assert.isTrue(result == ImmutableMap([1, "a"]))
  })

  it("size", () => {
    assert.strictEqual(ImmutableMap.empty<number, string>().size, 0)
    assert.strictEqual(ImmutableMap([1, "a"]).size, 1)
  })

  it("update", () => {
    const map = ImmutableMap([1, "a"], [2, "b"], [3, "c"])

    const result1 = map.update(
      1,
      Maybe.$.fold(Maybe.some("-"), (char) => Maybe.some(char.toUpperCase()))
    )
    const result2 = map.update(
      4,
      Maybe.$.fold(Maybe.some("-"), (char) => Maybe.some(char.toUpperCase()))
    )

    assert.isTrue(result1 == ImmutableMap([2, "b"], [3, "c"]))
    assert.isTrue(
      result2 == ImmutableMap([1, "a"], [2, "b"], [3, "c"], [4, "-"])
    )
  })
})
