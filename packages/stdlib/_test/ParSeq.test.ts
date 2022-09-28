describe.concurrent("ParSeq", () => {
  it("first", () => {
    assert.isTrue(ParSeq.empty().first == Maybe.none)
    assert.isTrue(ParSeq.single("ok").first == Maybe.some("ok"))
  })

  it("flatMap", () => {
    assert.isTrue(ParSeq.empty<string>().flatMap((s) => ParSeq.single(s.length)) == ParSeq.empty())
    assert.isTrue(ParSeq.single("ok").flatMap((s) => ParSeq.single(s.length)) == ParSeq.single(2))
  })

  it("flatten", () => {
    assert.isTrue(ParSeq.single(ParSeq.single("ok")).flatten == ParSeq.single("ok"))
  })

  it("fold", () => {
    const parSeq = ParSeq.combineSeq(
      ParSeq.single("ok"),
      ParSeq.combinePar(ParSeq.empty<string>(), ParSeq.single("ok"))
    )

    const result = parSeq.fold(
      0,
      (s) => s.length,
      (a, b) => a + b,
      (a, b) => a + b
    )

    assert.strictEqual(result, 4)
  })

  it("map", () => {
    assert.isTrue(ParSeq.empty<string>().map((s) => s.length) == ParSeq.empty())
    assert.isTrue(ParSeq.single("ok").map((s) => s.length) == ParSeq.single(2))
  })

  it("zip", () => {
    assert.isTrue(ParSeq.single("a").zip(ParSeq.single(0)) == ParSeq.single(["a", 0]))
    assert.isTrue(
      ParSeq.combinePar(ParSeq.single("a"), ParSeq.single("b")).zip(ParSeq.single("c")) ==
        ParSeq.combinePar(ParSeq.single(["b", "c"]), ParSeq.single(["a", "c"]))
    )
  })

  it("zipLeft", () => {
    assert.isTrue((ParSeq.single("a") < ParSeq.single(0)) == ParSeq.single("a"))
  })

  it("zipRight", () => {
    assert.isTrue((ParSeq.single("a") > ParSeq.single(0)) == ParSeq.single(0))
  })

  it("zipWith", () => {
    assert.isTrue(ParSeq.single(1).zipWith(ParSeq.single(2), (a, b) => a + b) == ParSeq.single(3))
  })

  it("equals", () => {
    assert.isTrue(ParSeq.empty() == ParSeq.empty())
    assert.isTrue(
      ParSeq.combineSeq(ParSeq.empty(), ParSeq.combineSeq(ParSeq.empty(), ParSeq.empty())) ==
        ParSeq.empty()
    )
    assert.isTrue(
      ParSeq.combineSeq(ParSeq.empty(), ParSeq.combinePar(ParSeq.empty(), ParSeq.empty())) ==
        ParSeq.empty()
    )
    assert.isTrue(
      ParSeq.combineSeq(ParSeq.single("ok"), ParSeq.combinePar(ParSeq.empty(), ParSeq.empty())) ==
        ParSeq.single("ok")
    )
    assert.isTrue(
      ParSeq.combineSeq(ParSeq.single("ok"), ParSeq.combinePar(ParSeq.empty(), ParSeq.empty())) ==
        ParSeq.single("ok")
    )
    assert.isTrue(
      ParSeq.combineSeq(
        ParSeq.single("ok"),
        ParSeq.combinePar(ParSeq.empty(), ParSeq.single("ok"))
      ) ==
        ParSeq.combineSeq(ParSeq.single("ok"), ParSeq.single("ok"))
    )
    assert.isTrue(
      ParSeq.combineSeq(
        ParSeq.single("ok"),
        ParSeq.combinePar(ParSeq.single("ok"), ParSeq.single("ok"))
      ) ==
        ParSeq.combineSeq(
          ParSeq.single("ok"),
          ParSeq.combinePar(ParSeq.single("ok"), ParSeq.single("ok"))
        )
    )
  })
})
