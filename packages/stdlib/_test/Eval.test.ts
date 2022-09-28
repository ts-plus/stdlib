describe.concurrent("Eval", () => {
  it("flatMap", () => {
    const program = Eval(0).flatMap((n) => Eval(n + 1))

    const result = program.run

    assert.strictEqual(result, 1)
  })

  it("gen", () => {
    const program = Eval.gen(function*($) {
      const a = yield* $(Eval(0))
      const b = yield* $(Eval(1))
      const c = yield* $(Eval(2))
      return a + b + c
    })

    const result = program.run

    assert.strictEqual(result, 3)
  })

  it("do", () => {
    const program = Do(($) => {
      const a = $(Eval(0))
      const b = $(Eval(1))
      const c = $(Eval(2))
      return a + b + c
    })

    const result = program.run

    assert.strictEqual(result, 3)
  })

  it("map", () => {
    const program = Eval(0).map((n) => n + 1)

    const result = program.run

    assert.strictEqual(result, 1)
  })

  it("reduce", () => {
    const program = Eval.reduce([1, 2, 3, 4, 5], 0, (acc, a) => Eval.succeed(acc + a))

    const result = program.run

    assert.strictEqual(result, 15)
  })

  it("struct", () => {
    const program = Eval.struct({
      a: Eval("a"),
      b: Eval("b"),
      c: Eval("c")
    })

    const result = program.run

    assert.deepEqual(result, { a: "a", b: "b", c: "c" })
  })

  it("tap", () => {
    const program = Eval(0).tap((n) => Eval(n + 1))

    const result = program.run

    assert.strictEqual(result, 0)
  })

  it("tuple", () => {
    const program = Eval.tuple(Eval(0), Eval("a"), Eval(true))

    const result = program.run

    assert.isTrue(result == [0, "a", true])
  })

  it("unit", () => {
    const result = Eval.unit.run

    assert.isUndefined(result)
  })

  it("zip", () => {
    const program = Eval(0).zip(Eval(1))

    const result = program.run

    assert.isTrue(result == [0, 1])
  })

  it("zipLeft", () => {
    const program = Eval(0).zipLeft(Eval(1))

    const result = program.run

    assert.strictEqual(result, 0)
  })

  it("zipRight", () => {
    const program = Eval(0).zipRight(Eval(1))

    const result = program.run

    assert.strictEqual(result, 1)
  })

  it("zipWith", () => {
    const program = Eval(0).zipWith(Eval(1), (a, b) => a + b)

    const result = program.run

    assert.strictEqual(result, 1)
  })

  it("stack safety", () => {
    function fib(n: number): Eval<number> {
      if (n <= 1) {
        return Eval.succeed(n)
      }
      return Eval.suspend(fib(n - 1)).zipWith(Eval.suspend(fib(n - 2)), (a, b) => a + b)
    }

    const result = fib(20).run

    assert.strictEqual(result, 6765)
  })
})
