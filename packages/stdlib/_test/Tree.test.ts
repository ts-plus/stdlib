import { expect, vi } from "vitest"

describe.concurrent("Tree", () => {
  it("drawTree", () => {
    const tree = Tree("15", Chunk(Tree("1"))).draw
    assert.isTrue(tree.indexOf("15") >= 0)
    assert.isTrue(tree.indexOf("1") >= 0)
  })

  it("map", () => {
    const tree = Tree(12, Chunk(Tree(1)))
    const tree0 = tree.map((a) => a.toFixed(0))
    const expected = Tree("12", Chunk(Tree("1")))
    assert.equal(tree0.draw, expected.draw)
  })

  it("getEquivalnce", () => {
    const eq = Tree.getEquivalence(Equivalence.number)
    const x = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
    const y = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
    const z = Tree(14, Chunk(Tree(1)))
    const x0 = Tree(15, Chunk(x, Tree(5)))
    const y0 = Tree(15, Chunk(y, Tree(4)))
    const z0 = Tree(14, Chunk(z, Tree(5)))
    assert.isTrue(eq.equals(x, y))
    assert.isFalse(eq.equals(x0, y0))
    assert.isFalse(eq.equals(y, z))
    assert.isFalse(eq.equals(x, z))
    assert.isFalse(eq.equals(x0, z0))
    assert.isFalse(eq.equals(y0, z0))
  })

  it("elem", () => {
    // `needle` inferred as literal 4 without `as`
    const needle = 4 as number
    const haystack = Tree(
      0,
      Chunk(Tree(1), Tree(2, Chunk(Tree(3, Chunk(Tree(4))), Tree(5))))
    )
    assert.isTrue(haystack.elem(Equivalence.number, needle))
    assert.isTrue(pipe(haystack, Tree.$.elem(Equivalence.number, needle)))
    assert.isFalse(haystack.elem(Equivalence.number, 6))
  })

  it("corresponds", () => {
    const x = Tree(2, Chunk(Tree(1)))
    const y = x.map((n) => n.toFixed())
    assert.isTrue(x.corresponds(y, (a, b) => a.toFixed() == b))
  })

  it("flatMap", () => {
    const x = Tree(2, Chunk(Tree(1))).flatMap((n: number) => Tree(n, Chunk(Tree(n - 1))))
    const y = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
    assert.isTrue(Tree.getEquivalence(Equivalence.number).equals(x, y))
  })

  it("flatten", () => {
    assert.isTrue(
      Tree(Tree(2), Chunk(Tree(Tree(1)), Tree(Tree(2)))).flatten ==
        Tree(2, Chunk(Tree(1), Tree(2)))
    )
  })

  describe("equals", () => {
    it("works", () => {
      const y = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
      const x = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
      assert.isTrue(x.equals(y))
      assert.isTrue(x == y)
      assert.isTrue(pipe(x, Tree.$.equals(y)))
    })

    it("implicit", () => {
      const y = Tree(2, Chunk(Tree(1)) + Chunk(Tree(1, Chunk(Tree(0)))))
      assert.isTrue(Maybe(y) == Maybe(y))
    })
  })

  it("unfold", () => {
    const y = Tree.unfold(2, (a) => [a, a > 1 ? Chunk.range(0, a - 1) : Chunk.empty()])
    const x = Tree(2, Chunk(Tree(0)) + Chunk(Tree(1)))
    assert.isTrue(x == y)
  })

  it("show", () => {
    const S = Tree.getShow(Show.number)
    const x = Tree(
      2,
      Chunk(Tree(0, Chunk(Tree(-1, Chunk()), Tree(1, Chunk()))))
    )
    const expected = `Tree(2, Chunk(Tree(0, Chunk(Tree(-1, Chunk()), Tree(1, Chunk())))))`
    assert.equal(S.show(x), expected)
  })

  it("fold", () => {
    const t = Tree(1, Chunk(Tree(2), Tree(3)))
    assert.equal(
      t.fold(
        (a, bs: Chunk<number>) => a + bs.reduce(0, (accum, n) => accum + n)
      ),
      6
    )
  })

  it("extend", () => {
    const t = Tree(1, Chunk(Tree(2), Tree(3)))
    const f = (wa: Tree<number>): number =>
      wa.fold((a, bs) => bs.reduce(a, Associative.sum.combine))

    const expected = Tree(6, Chunk(Tree(2), Tree(3)))
    assert.isTrue(t.extend(f) == expected)
  })

  it("duplicate", () => {
    const t = Tree("a")
    const expected = Tree(Tree("a", Chunk()), Chunk())
    assert.isTrue(t.duplicate == expected)
  })

  it("reduce", () => {
    const t = Tree(1, Chunk(Tree(2)))
    assert.equal(t.reduce(0, Associative.sum.combine), 3)
    assert.equal(pipe(t, Tree.$.reduce(0, Associative.sum.combine)), 3)
  })

  it("foldMap", () => {
    const t = Tree(1, Chunk(Tree(2)))
    assert.equal(t.foldMap(AssociativeIdentity.sum, identity), 3)
    assert.equal(pipe(t, Tree.$.foldMap(AssociativeIdentity.sum, identity)), 3)
  })

  it("forEach", () => {
    const t = Tree("first", Chunk(Tree("second")))
    const fn = vi.fn()
    t.forEach(fn)
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith("second")
    expect(fn).toHaveBeenCalledWith("first")
    fn.mockReset()
    pipe(t, Tree.$.forEach(fn))
    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenLastCalledWith("second")
    expect(fn).toHaveBeenCalledWith("first")
  })

  it("forEachF", () => {
    const forEachF = Tree.forEachF(Maybe.Applicative)(
      (n: number) => n % 2 === 0 ? Maybe.none : Maybe.some(n)
    )
    assert.isTrue(forEachF(Tree(1, Chunk(Tree(2)))) == Maybe.none)
    assert.isTrue(
      forEachF(Tree(1, Chunk(Tree(3)))) ==
        Maybe.some(Tree(1, Chunk(Tree(3))))
    )
  })

  it("zip", () => {
    const a = Tree("a", Chunk(Tree("b"), Tree("c")))
    const b = Tree("a", Chunk(Tree("b"), Tree("c"), Tree("d")))
    const expected = Tree(
      ["a", "a"],
      Chunk(Tree(["b", "b"]), Tree(["c", "c"]))
    )
    assert.isTrue(a.zip(b) == b.zip(a))
    assert.isTrue(a.zip(b) == expected)
  })

  it("zipWith", () => {
    const a = Tree("a", Chunk(Tree("b"), Tree("c")))
    const b = Tree("a", Chunk(Tree("b"), Tree("c"), Tree("d")))
    const expected = Tree(
      ["a", "a"],
      Chunk(Tree(["b", "b"]), Tree(["c", "c"]))
    )
    assert.isTrue(a.zipWith(b, (a, b) => [a, b]) == expected)
    assert.isTrue(pipe(a, Tree.$.zipWith(b, (a, b) => [a, b])) == expected)
  })

  it("isTree", () => {
    assert.isTrue(Tree.isTree(Tree(0)))
    assert.isFalse(Tree.isTree(0))
    assert.isTrue(Tree.isTree(Tree(Tree(5))))
  })
})
