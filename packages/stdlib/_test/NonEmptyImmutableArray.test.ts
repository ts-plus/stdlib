describe.concurrent("NonEmptyImmutableArray", () => {
  it("from", () => {
    assert.isTrue(NonEmptyImmutableArray.from([]) == Option.none)
    assert.isTrue(NonEmptyImmutableArray.from([1, 2]) == Option.some(NonEmptyImmutableArray(1, 2)))
  })

  it("head", () => {
    const array = NonEmptyImmutableArray(0, 1, 2, 3, 4, 5)

    assert.strictEqual(array.head, 0)
  })

  it("tail", () => {
    const array = NonEmptyImmutableArray(0, 1, 2, 3, 4, 5)

    assert.strictEqual(array.last, 5)
  })

  it("equals", () => {
    assert.isTrue(NonEmptyImmutableArray(1, 2) == NonEmptyImmutableArray(1, 2))
    assert.isFalse(NonEmptyImmutableArray(1, 2) == NonEmptyImmutableArray(1, 3))
  })
})
