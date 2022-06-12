describe.concurrent("AssociativeIdentity", () => {
  it("all", () => {
    assert.strictEqual(AssociativeIdentity.all.identity, true)
    assert.strictEqual(AssociativeIdentity.all.combine(true, true), true)
    assert.strictEqual(AssociativeIdentity.all.combine(false, true), false)
    assert.strictEqual(AssociativeIdentity.all.combine(true, false), false)
    assert.strictEqual(AssociativeIdentity.all.combine(false, false), false)
  })

  it("any", () => {
    assert.strictEqual(AssociativeIdentity.any.identity, false)
    assert.strictEqual(AssociativeIdentity.any.combine(true, true), true)
    assert.strictEqual(AssociativeIdentity.any.combine(false, true), true)
    assert.strictEqual(AssociativeIdentity.any.combine(true, false), true)
    assert.strictEqual(AssociativeIdentity.any.combine(false, false), false)
  })

  it("endomorphism", () => {
    const M = AssociativeIdentity.endomorphism<number>()
    const f = M.combine((n) => n * 2, (n) => n + 1)

    assert.strictEqual(f(3), 8)
  })

  it("function", () => {
    const M = AssociativeIdentity.function(AssociativeIdentity.sum)<string>()

    assert.strictEqual(M.combine((s) => s.length - 1, (s) => s.length + 1)("hello"), 10)
  })

  it("inverted", () => {
    const M = AssociativeIdentity.string.inverted

    assert.strictEqual(M.combine("a", "b"), "ba")
    assert.strictEqual(M.combine("a", M.identity), "a")
    assert.strictEqual(M.combine(M.identity, "a"), "a")
  })

  it("max", () => {
    const M = AssociativeIdentity.max({ top: Infinity, bottom: Infinity, ...Ord.number })

    assert.strictEqual(M.combine(1, 0), 1)
    assert.strictEqual(M.combine(1, -1), 1)
  })

  it("min", () => {
    const M = AssociativeIdentity.min({ top: Infinity, bottom: Infinity, ...Ord.number })

    assert.strictEqual(M.combine(1, 0), 0)
    assert.strictEqual(M.combine(1, -1), -1)
  })

  it("product", () => {
    assert.strictEqual(AssociativeIdentity.product.combine(2, 3), 6)
  })

  it("string", () => {
    assert.strictEqual(AssociativeIdentity.string.combine("a", "b"), "ab")
  })

  it("struct", () => {
    assert.deepStrictEqual(
      AssociativeIdentity.struct({ a: AssociativeIdentity.string }).combine({ a: "a" }, { a: "b" }),
      { a: "ab" }
    )
    // Should ignore non own properties
    const M = AssociativeIdentity.struct(Object.create({ a: 1 }))
    assert.deepStrictEqual(M.combine({}, {}), {})
  })

  it("sum", () => {
    assert.strictEqual(AssociativeIdentity.sum.combine(2, 3), 5)
  })

  it("tuple", () => {
    const M1 = AssociativeIdentity.tuple(AssociativeIdentity.string, AssociativeIdentity.sum)
    const M2 = AssociativeIdentity.tuple(AssociativeIdentity.string, AssociativeIdentity.sum, AssociativeIdentity.all)

    assert.deepStrictEqual(M1.combine(["a", 1], ["b", 2]), ["ab", 3])
    assert.deepStrictEqual(M2.combine(["a", 1, true], ["b", 2, false]), ["ab", 3, false])
  })

  it("void", () => {
    assert.isUndefined(AssociativeIdentity.void.identity)
    assert.isUndefined(AssociativeIdentity.void.combine(undefined, undefined))
  })
})
