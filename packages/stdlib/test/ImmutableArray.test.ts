import { ImmutableArray } from "@tsplus/stdlib/collections/ImmutableArray"
import { describe, expect, it } from "vitest"

describe("ImmutableArray", () => {
  it("mapImmutable", () => {
    expect(ImmutableArray(0, 1).mapImmutable((n) => n + 1)).toEqual([1, 2])
  })
})
