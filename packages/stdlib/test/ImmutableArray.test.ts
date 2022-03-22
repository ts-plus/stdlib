import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"
import { describe, expect, it } from "vitest"

describe("ImmutableArray", () => {
  it("mapImmutable", () => {
    expect(ImmutableArray(0, 1).map((n) => n + 1)).toEqual([1, 2].immutable())
  })
})
