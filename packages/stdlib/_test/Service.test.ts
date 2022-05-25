interface A {
  a: number
}
const A = Service.Tag<A>()

interface B {
  b: number
}
const B = Service.Tag<B>()

interface C {
  c: number
}
const C = Service.Tag<C>()

describe.concurrent("Environment", () => {
  it("adds and retrieve services", () => {
    const env = Service.Env(A, { a: 0 }).add(B, { b: 1 })
    assert.deepEqual(env.get(A), { a: 0 })
    assert.deepEqual(env.getOption(B).value, { b: 1 })
    assert.isTrue(env.getOption(C).isNone())
    assert.throw(() => env.unsafeGet(C))
  })

  it("prunes services in env and merges", () => {
    const env = Service.Env(A, { a: 0 }).merge(Service.Env(B, { b: 1 }).add(C, { c: 2 }))
    const pruned = env.prune(A, B)
    assert.deepEqual(pruned.get(A), { a: 0 })
    assert.deepEqual(pruned.getOption(B).value, { b: 1 })
    assert.isTrue(pruned.getOption(C).isNone())
    assert.throw(() => pruned.unsafeGet(C))
    assert.deepEqual(env.get(C), { c: 2 })
  })

  describe.concurrent("Patch", () => {
    it("applies a patch to the environment", () => {
      const a: A = { a: 0 }
      const b: B = { b: 1 }
      const c: C = { c: 2 }
      const oldEnv = Service.Env(A, a).add(B, b).add(C, c)
      const newEnv = Service.Env(A, a).add(B, { b: 3 })
      const patch = Service.Patch.diff(oldEnv, newEnv)

      const result = patch.patch(oldEnv)

      assert.isTrue(result.getOption(A).isSome())
      assert.isTrue(result.getOption(B).isSome())
      assert.isTrue(result.getOption(C).isNone())
      assert.strictEqual(result.get(B).b, 3)
    })

    it("creates a proper diff", () => {
      const a: A = { a: 0 }
      const b: B = { b: 1 }
      const c: C = { c: 2 }
      const oldEnv = Service.Env(A, a).add(B, b).add(C, c)
      const newEnv = Service.Env(A, a).add(B, { b: 3 })

      const result = Service.Patch.diff(oldEnv, newEnv)

      assert.deepNestedPropertyVal(result, "first._tag", "AndThen")
      assert.deepNestedPropertyVal(result, "first.first._tag", "Empty")
      assert.deepNestedPropertyVal(result, "first.second._tag", "UpdateService")
      assert.deepNestedPropertyVal(result, "first.second.tag", B)
      assert.deepNestedPropertyVal(result, "second._tag", "RemoveService")
      assert.deepNestedPropertyVal(result, "second.tag", C)
    })
  })
})
