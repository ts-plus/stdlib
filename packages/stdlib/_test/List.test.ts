describe.concurrent("List", () => {
  it("equals", () => {
    assert.isTrue(
      List(0, 1, 2)
        == List(0, 1, 2)
    )
  })
  it("concat", () => {
    assert.isTrue(
      List(0, 1, 2) + List(3, 4, 5)
        == List(0, 1, 2, 3, 4, 5)
    )
  })
  it("prepend", () => {
    assert.isTrue(2 + List(3, 4, 5) == List(2, 3, 4, 5))
  })
  it("toHashSet", () => {
    assert.isTrue(List(3, 4, 5).toHashSet == HashSet(3, 4, 5))
  })
  it("builder", () => {
    const builder = List.builder<number>()
    builder.append(0)
    builder.append(1)
    builder.append(2)
    assert.isTrue(
      builder.build()
        == List(0, 1, 2)
    )
  })
  it("splitAt", () => {
    const list = List(0, 1, 2, 3, 4, 5)

    const [left, right] = list.splitAt(3)

    assert.isTrue(left == List(0, 1, 2))
    assert.isTrue(right == List(3, 4, 5))
  })
  it("drop", () => {
    const list = List(1, 2, 3, 4, 5) + List(6, 7, 8, 9, 10)

    const result = list.drop(5).toImmutableArray

    assert.isTrue(result == ImmutableArray(6, 7, 8, 9, 10))
  })
  it("map", () => {
    assert.isTrue(
      List(1, 2, 3).map((n) => n + 1)
        == List(2, 3, 4)
    )
  })
  it("flatMap", () => {
    assert.isTrue(
      List(1, 2, 3).flatMap((n) => List(n + 1))
        == List(2, 3, 4)
    )
  })
  it("flatMap Iterable", () => {
    assert.isTrue(
      List(0, 1).flatMap((n) => [n + 1]).toList
        == List(1, 2)
    )
  })
  it("toCollection", () => {
    assert.isTrue(List(0, 1).toCollection == List(0, 1))
  })
  it("partition", () => {
    assert.isTrue(
      List.empty<number>().partition((n) => n > 2) ==
        [List.empty<number>(), List.empty<number>()]
    )
    assert.isTrue(List(1, 3).partition((n) => n > 2) == [List(1), List(3)])
  })

  it("partitionMap", () => {
    assert.isTrue(
      List.empty<Either<string, number>>().partitionMap(identity) ==
        [List.empty<string>(), List.empty<number>()]
    )
    assert.isTrue(
      List(Either.right(1), Either.left("foo"), Either.right(2)).partitionMap(identity) ==
        [List("foo"), List(1, 2)]
    )
  })
})
