import { Option } from "@tsplus/stdlib/data/Option"
import { Tuple } from "@tsplus/stdlib/data/Tuple"
import { assert, describe, it } from "vitest"

describe("Option", () => {
  it("equals", () => {
    assert.isTrue(Option.some(0) == Option.some(0))
    assert.isFalse(Option.some(0) == Option.some(1))
  })
  it("value defined", () => {
    assert.strictEqual(Option.some(0).value, 0)
  })
  it("value undefined", () => {
    assert.isUndefined(Option.none.value)
  })
  it("map", () => {
    assert.strictEqual(Option.some(0).map((n) => n + 1).value, 1)
  })
  it("flatMap", () => {
    assert.isUndefined(Option.some(0).flatMap(() => Option.none).value)
    assert.strictEqual(Option.some(0).flatMap((n) => Option.some(n + 1)).value, 1)
  })
  it("zip", () => {
    assert.isTrue(Option.some(1) + Option.some(2) == Option.some(Tuple(1, 2)))
  })
  it("orElse", () => {
    assert.isTrue((Option.some(1) | Option.some(2)) == Option.some(1))
    assert.isTrue((Option.none | Option.some(2)) == Option.some(2))
  })
})
