describe("Equals", () => {
  it("object", () => {
    const a = { foo: "bar", bar: "foo" }
    const b = { bar: "foo", foo: "bar" }
    const c = { bar: "foo", foo: "bar", baz: "not" }
    assert.isTrue(Equals.equals(a, b))
    assert.isFalse(Equals.equals(a, c))
  })
  it("custom", () => {
    const a = {
      foo: "bar",
      bar: "foo",
      [Hash.sym]: () => 1337,
      [Equals.sym]: (a: any, b: any) => a === b
    }
    const b = {
      foo: "bar",
      bar: "foo",
      [Hash.sym]: () => 1337,
      [Equals.sym]: (a: any, b: any) => a === b
    }
    assert.isTrue(Equals.equals(a, a))
    assert.isFalse(Equals.equals(a, b))
  })
  it("array", () => {
    const a = [0, 1, 2]
    const b = [0, 1, 2]
    const c = [0, 1, 2, 3]
    assert.isTrue(Equals.equals(a, b))
    assert.isFalse(Equals.equals(a, c))
  })
  it("map", () => {
    const a = new Map([[0, 0], [1, 1]])
    const b = new Map([[1, 1], [0, 0]])
    const c = new Map([[0, 0], [1, 1], [2, 2]])
    assert.isTrue(Equals.equals(a, b))
    assert.isFalse(Equals.equals(a, c))
  })
  it("set", () => {
    const a = new Set([0, 1])
    const b = new Set([1, 0])
    const c = new Set([0, 1, 2])
    assert.isTrue(Equals.equals(a, b))
    assert.isFalse(Equals.equals(a, c))
  })
})
