describe("Eval", () => {
  it("flatMap", () => {
    const program = Eval(0).flatMap((n) => Eval(n + 1));

    const result = program.run();

    assert.strictEqual(result, 1);
  });

  it("gen", () => {
    const program = Eval.gen(function*($) {
      const a = yield* $(Eval(0));
      const b = yield* $(Eval(1));
      const c = yield* $(Eval(2));
      return a + b + c;
    });

    const result = program.run();

    assert.strictEqual(result, 3);
  });

  it("map", () => {
    const program = Eval(0).map((n) => n + 1);

    const result = program.run();

    assert.strictEqual(result, 1);
  });

  it("tap", () => {
    const program = Eval(0).tap((n) => Eval(n + 1));

    const result = program.run();

    assert.strictEqual(result, 0);
  });

  it("unit", () => {
    const result = Eval.unit.run();

    assert.isUndefined(result);
  });

  it("zip", () => {
    const program = Eval(0).zip(Eval(1));

    const result = program.run();

    assert.isTrue(result == Tuple(0, 1));
  });

  it("zipLeft", () => {
    const program = Eval(0).zipLeft(Eval(1));

    const result = program.run();

    assert.strictEqual(result, 0);
  });

  it("zipRight", () => {
    const program = Eval(0).zipRight(Eval(1));

    const result = program.run();

    assert.strictEqual(result, 1);
  });

  it("zipWith", () => {
    const program = Eval(0).zipWith(Eval(1), (a, b) => a + b);

    const result = program.run();

    assert.strictEqual(result, 1);
  });

  it("stack safety", () => {
    function fib(n: number): Eval<number> {
      if (n <= 1) {
        return Eval.succeed(n);
      }
      return Eval.suspend(fib(n - 1)).zipWith(Eval.suspend(fib(n - 2)), (a, b) => a + b);
    }

    const result = fib(20).run();

    assert.strictEqual(result, 6765);
  });
});
