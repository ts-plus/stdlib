describe.concurrent("LazyValue", () => {
  it("is lazy", () => {
    const lazyValue = LazyValue.make(() => ({ value: "test" }));

    const first = lazyValue.value;
    const second = lazyValue.value;

    assert.strictEqual(first, second);
  });
});
