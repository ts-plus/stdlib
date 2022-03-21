import { IterableWeakMap } from "@tsplus/stdlib/collections/weak/IterableWeakMap"
import { Option } from "@tsplus/stdlib/data/Option"
import { describe, expect, it } from "vitest"

describe("IterableWeakMap", () => {
  it("has", () => {
    const a = {}
    const b = {}
    const c = {}
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ])
    expect(map.has(a)).toEqual(true)
    expect(map.has(b)).toEqual(true)
    expect(map.has(c)).toEqual(false)
    map.set(c, 2)
    expect(map.has(c)).toEqual(true)
  })
  it("getOption", () => {
    const a = {}
    const b = {}
    const c = {}
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ])
    expect(map[a]).toEqual(Option.some(0))
    expect(map[b]).toEqual(Option.some(1))
    expect(map[c]).toEqual(Option.none)
  })
  it("keys", () => {
    const a = {}
    const b = {}
    const c = {}
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ])
    const keys = new Set(map.keys())
    expect(keys.has(a)).toEqual(true)
    expect(keys.has(b)).toEqual(true)
    expect(keys.has(c)).toEqual(false)
  })
  it("values", () => {
    const a = {}
    const b = {}
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ])
    const keys = new Set(map.values())
    expect(keys.has(0)).toEqual(true)
    expect(keys.has(1)).toEqual(true)
    expect(keys.has(2)).toEqual(false)
  })
})
