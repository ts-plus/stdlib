import { ImmutableArray } from "../src/collections/ImmutableArray.js"

describe("ImmutableArray", () => {
  it("mapImmutable", () => {
    expect(ImmutableArray(0, 1).mapImmutable((n) => n + 1)).toEqual([1, 2])
  })
})
