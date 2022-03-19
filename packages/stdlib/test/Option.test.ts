import { Option } from "@tsplus/stdlib/data/Option"
import { describe, expect, it } from "vitest"

describe("Option", () => {
  it("value defined", () => {
    expect(Option.some(0).value).toEqual(0)
  })
  it("value undefined", () => {
    expect(Option.none.value).toEqual(void 0)
  })
  it("map", () => {
    expect(Option.some(0).map((n) => n + 1).value).toEqual(1)
  })
  it("flatMap", () => {
    expect(Option.some(0).flatMap(() => Option.none).value).toEqual(void 0)
    expect(Option.some(0).flatMap((n) => Option.some(n + 1)).value).toEqual(1)
  })
})
