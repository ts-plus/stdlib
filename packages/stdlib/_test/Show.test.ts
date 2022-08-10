describe.concurrent("Show", () => {
  it("boolean", () => {
    assert.strictEqual(Show.boolean.show(false), "false")
    assert.strictEqual(Show.boolean.show(true), "true")
  })

  it("number", () => {
    assert.strictEqual(Show.number.show(10), "10")
    assert.strictEqual(Show.number.show(-10), "-10")
    assert.strictEqual(Show.number.show(10.123), "10.123")
  })

  it("string", () => {
    assert.strictEqual(Show.string.show(""), "\"\"")
    assert.strictEqual(Show.string.show("a"), "\"a\"")
  })

  it("tuple", () => {
    const S = Show.tuple(Show.string, Show.number)
    assert.strictEqual(S.show(["a", 1]), "[\"a\", 1]")
  })

  it("struct", () => {
    assert.strictEqual(Show.struct({ a: Show.string }).show({ a: "a" }), "{ a: \"a\" }")
    assert.strictEqual(
      Show.struct({ a: Show.string, b: Show.number }).show({ a: "a", b: 1 }),
      "{ a: \"a\", b: 1 }"
    )
    // Should ignore non own properties
    const shows = Object.create({ a: 1 })
    const s = Show.struct(shows)
    assert.strictEqual(s.show({}), "{}")
  })
})
