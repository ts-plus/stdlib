describe.concurrent("Covariant", () => {
  it("map", () => {
    const result = pipe(10, Identity.Covariant.map((n) => `ok: ${n + 1}`));
    assert.strictEqual(result, "ok: 11");
  });
});
