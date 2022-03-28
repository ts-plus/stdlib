describe("List", () => {
  it("equals", () => {
    assert.isTrue(
      List(0, 1, 2)
        == List(0, 1, 2)
    );
  });
  it("concat", () => {
    assert.isTrue(
      List(0, 1, 2) + List(3, 4, 5)
        == List(0, 1, 2, 3, 4, 5)
    );
  });
  it("prepend", () => {
    assert.isTrue(2 + List(3, 4, 5) == List(2, 3, 4, 5));
  });
  it("builder", () => {
    const builder = List.builder<number>();
    builder.append(0);
    builder.append(1);
    builder.append(2);
    assert.isTrue(
      builder.build()
        == List(0, 1, 2)
    );
  });
  it("map", () => {
    assert.isTrue(
      List(1, 2, 3).map((n) => n + 1)
        == List(2, 3, 4)
    );
  });
  it("flatMap", () => {
    assert.isTrue(
      List(1, 2, 3).flatMap((n) => List(n + 1))
        == List(2, 3, 4)
    );
  });
  it("flatMap Iterable", () => {
    assert.isTrue(
      List(0, 1).flatMap((n) => [n + 1]).asList()
        == List(1, 2)
    );
  });
});
