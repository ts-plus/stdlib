import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"
import { Option } from "@tsplus/stdlib/data/Option"
import { describe, expect, it } from "vitest"

describe("ImmutableArray", () => {
  it("map", () => {
    expect(ImmutableArray(0, 1).map((n) => n + 1)).toEqual([1, 2].immutable())
  })
  it("index", () => {
    const array = ImmutableArray(0, 1, 2)
    expect(array[0] == Option(0)).toEqual(true)
    expect(array[1] == Option(1)).toEqual(true)
    expect(array[2] == Option(2)).toEqual(true)
    expect(array[3] == Option.none).toEqual(true)
  })
})
