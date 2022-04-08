import { HashSet, HashSetSym } from "@tsplus/stdlib/collections/HashSet/definition";

export class HashSetInternal<A> implements HashSet<A> {
  readonly [HashSetSym]: HashSetSym = HashSetSym;

  constructor(readonly _keyMap: HashMap<A, unknown>) {}

  [Symbol.iterator](): Iterator<A> {
    return this._keyMap.keys();
  }

  [Hash.sym](): number {
    return Hash.combine(Hash.string("HashSet"), Hash.unknown(this._keyMap));
  }

  [Equals.sym](that: unknown): boolean {
    if (HashSet.isHashSet(that)) {
      realHashSet(that);
      return (
        this._keyMap.size === that._keyMap.size &&
        this._keyMap == that._keyMap
      );
    }
    return false;
  }
}

/**
 * @tsplus macro remove
 */
export function realHashSet<A>(_: HashSet<A>): asserts _ is HashSetInternal<A> {
  //
}
