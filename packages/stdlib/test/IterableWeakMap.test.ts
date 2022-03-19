import { IterableWeakMap } from "../src/collections/weak/IterableWeakMap.js"
import { Option } from "../src/data.js"

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
    expect(map.getOption(a)).toEqual(Option.some(0))
    expect(map.getOption(b)).toEqual(Option.some(1))
    expect(map.getOption(c)).toEqual(Option.none)
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
