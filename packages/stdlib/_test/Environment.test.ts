interface A {
  readonly _tag: "A";
}
const A = Service<A>(Symbol());
interface B {
  readonly _tag: "B";
}
const B = Service<B>(Symbol());
interface C {
  readonly _tag: "C";
}
const C = Service<C>(Symbol());

describe("Environment", () => {
  it("get/put/has/merge", () => {
    const env = Environment.empty.put(A, { _tag: "A" }).put(B, { _tag: "B" });

    assert.deepEqual(env.get(A), { _tag: "A" });
    assert.deepEqual(env.get(B), { _tag: "B" });

    assert.isTrue(env.has(A));
    assert.isFalse(env.has(C));

    // @ts-expect-error
    env.get(C);

    const final = env + Environment.empty.put(C, { _tag: "C" });

    assert.isTrue(final.has(A));
    assert.isTrue(final.has(B));
    assert.isTrue(final.has(C));
  });
});
