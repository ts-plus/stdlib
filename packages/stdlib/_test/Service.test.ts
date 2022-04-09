interface A {
  a: number;
}
const A = Service.Tag<A>();

interface B {
  b: number;
}
const B = Service.Tag<B>();

interface C {
  c: number;
}
const C = Service.Tag<C>();

describe.concurrent("Environment", () => {
  it("adds and retrieve services", () => {
    const env = Service.Env().add(A, { a: 0 }).add(B, { b: 1 });
    assert.deepEqual(env.get(A), { a: 0 });
    assert.deepEqual(env.getOption(B).value, { b: 1 });
    assert.isTrue(env.getOption(C).isNone());
    assert.throw(() => env.unsafeGet(C));
  });
  it("prunes services in env and merges", () => {
    const env = Service.Env().add(A, { a: 0 }).merge(Service.Env().add(B, { b: 1 }).add(C, { c: 2 }));
    const pruned = env.prune(A, B);
    assert.deepEqual(pruned.get(A), { a: 0 });
    assert.deepEqual(pruned.getOption(B).value, { b: 1 });
    assert.isTrue(pruned.getOption(C).isNone());
    assert.throw(() => pruned.unsafeGet(C));
    assert.deepEqual(env.get(C), { c: 2 });
  });
});
