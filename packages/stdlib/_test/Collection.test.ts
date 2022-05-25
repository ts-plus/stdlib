describe.concurrent("Collection", () => {
  it("append", () => {
    assert.isTrue(List(0, 1, 2) == List(0) + 1 + 2)
    assert.isTrue(List(0, 1, 2) == List(0) < 1 < 2)
  })
  it("prepend", () => {
    assert.isTrue(0 + Collection(1) == Collection(0, 1))
    assert.isTrue(0 > Collection(1) == Collection(0, 1))
  })
})
