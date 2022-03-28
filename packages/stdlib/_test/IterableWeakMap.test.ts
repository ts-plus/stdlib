import { assert, describe, it } from "vitest";

describe("IterableWeakMap", () => {
  it("has", () => {
    const a = {};
    const b = {};
    const c = {};
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ]);
    assert.isTrue(map.has(a));
    assert.isTrue(map.has(b));
    assert.isFalse(map.has(c));
    map.set(c, 2);
    assert.isTrue(map.has(c));
  });
  it("getOption", () => {
    const a = {};
    const b = {};
    const c = {};
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ]);
    assert.isTrue(map[a] == Option.some(0));
    assert.isTrue(map[b] == Option.some(1));
    assert.isTrue(map[c] == Option.none);
  });
  it("keys", () => {
    const a = {};
    const b = {};
    const c = {};
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ]);
    const keys = new Set(map.keys());
    assert.isTrue(keys.has(a));
    assert.isTrue(keys.has(b));
    assert.isFalse(keys.has(c));
  });
  it("values", () => {
    const a = {};
    const b = {};
    const map = IterableWeakMap([
      [a, 0],
      [b, 1]
    ]);
    const keys = new Set(map.values());
    assert.isTrue(keys.has(0));
    assert.isTrue(keys.has(1));
    assert.isFalse(keys.has(2));
  });
});
