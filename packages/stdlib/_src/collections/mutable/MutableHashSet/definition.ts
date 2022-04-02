/**
 * @tsplus type MutableHashSet
 * @tsplus companion MutableHashSet/Ops
 */
export class MutableHashSet<A> implements Collection<A> {
  #hashMap: MutableHashMap<A, boolean>;

  constructor() {
    this.#hashMap = MutableHashMap.empty();
  }

  get size(): number {
    return this.#hashMap.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  contains(value: A): boolean {
    return this.#hashMap.has(value);
  }

  add(value: A): boolean {
    this.#hashMap.set(value, true);
    return this.#hashMap.has(value);
  }

  remove(value: A): boolean {
    this.#hashMap.remove(value);

    return !this.#hashMap.has(value);
  }

  [Symbol.iterator](): Iterator<A> {
    return this.#hashMap.map(({ tuple: [a] }) => a)[Symbol.iterator]();
  }
}
