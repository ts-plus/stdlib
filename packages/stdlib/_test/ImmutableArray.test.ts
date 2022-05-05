describe.concurrent("ImmutableArray", () => {
  it("equals", () => {
    assert.isTrue(
      [1, 2].immutable()
        == ImmutableArray(1, 2)
    );
    assert.isFalse(
      [1, 2].immutable()
        == ImmutableArray(1, 3)
    );
  });
  it("map", () => {
    assert.isTrue(
      ImmutableArray(0, 1).map((n) => n + 1)
        == ImmutableArray(1, 2)
    );
  });
  it("index", () => {
    const array = ImmutableArray(0, 1, 2);
    assert.isTrue(array[0] == Option(0));
    assert.isTrue(array[1] == Option(1));
    assert.isTrue(array[2] == Option(2));
    assert.isTrue(array[3] == Option.none);
  });
  it("append", () => {
    assert.isTrue(
      ImmutableArray(0, 1) + 2
        == NonEmptyImmutableArray(0, 1, 2)
    );
  });
  it("prepend", () => {
    assert.isTrue(
      0 + ImmutableArray(1)
        == NonEmptyImmutableArray(0, 1)
    );
  });
  it("concat", () => {
    assert.isTrue(
      ImmutableArray(0, 1) + ImmutableArray(2, 3)
        == ImmutableArray(0, 1, 2, 3)
    );
  });
  it("flatMap", () => {
    assert.isTrue(
      ImmutableArray(0, 1)
        .flatMap((n) => ImmutableArray(n + 1)) == ImmutableArray(1, 2)
    );
  });
  it("flatMap from collection", () => {
    assert.isTrue(
      ImmutableArray(0, 1)
        .flatMap((n) => [n + 1])
        .asImmutableArray() == ImmutableArray(1, 2)
    );
  });
  it("size", () => {
    assert.equal(ImmutableArray(0, 1, 2).size, 3);
  });
});
