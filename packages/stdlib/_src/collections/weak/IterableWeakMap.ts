import type { Iterable } from "@tsplus/stdlib/collections/Iterable";

/**
 * An implementation of a weak map that supports the iterable protocol.
 *
 * NOTE: this is truly weak only in the case FinalizationRegistry is available,
 * otherwise it is backed by a classical map and will not be weak (i.e. in
 * engines that don't natively support ES2021).
 *
 * @tsplus type IterableWeakMap
 */
export interface IterableWeakMap<K extends object, V> extends Iterable<[K, V]> {
  set(this: this, key: K, value: V): void;

  get(this: this, key: K): V | undefined;

  has(this: this, key: K): boolean;

  delete(this: this, key: K): boolean;

  [Symbol.iterator](this: this): IterableIterator<[K, V]>;

  entries(this: this): IterableIterator<[K, V]>;

  keys(this: this): IterableIterator<K>;

  values(this: this): IterableIterator<V>;
}

/**
 * @tsplus type IterableWeakMapOps
 */
export interface IterableWeakMapOps {}
export const IterableWeakMap: IterableWeakMapOps = {};

/**
 * @tsplus index IterableWeakMap
 * @tsplus fluent IterableWeakMap getOption
 */
export function getOption_<K extends object, V>(
  self: IterableWeakMap<K, V>,
  key: K
): Option<V> {
  return self.has(key) ? Option.some(self.get(key)!) : Option.none;
}

export const getOption = Pipeable(getOption_);

/**
 * @tsplus static IterableWeakMapOps make
 * @tsplus static IterableWeakMapOps __call
 */
export function make<K extends object, V>(
  iterable: Iterable<[K, V]>
): IterableWeakMap<K, V> {
  return new ConcreteImpl(iterable);
}

class WeakImpl<K extends object, V> {
  private weakMap = new WeakMap<K, { value: V; ref: WeakRef<K>; }>();
  private refSet = new Set<WeakRef<K>>();
  private finalizationGroup = new FinalizationRegistry<{
    ref: WeakRef<K>;
    set: Set<WeakRef<K>>;
  }>(WeakImpl.cleanup);

  private static cleanup<K extends object>({
    ref,
    set
  }: {
    ref: WeakRef<K>;
    set: Set<WeakRef<K>>;
  }) {
    set.delete(ref);
  }

  constructor(iterable: Iterable<[K, V]>) {
    for (const [key, value] of iterable) {
      this.set(key, value);
    }
  }

  set(this: this, key: K, value: V): this {
    const ref = new WeakRef(key);

    this.weakMap.set(key, { value, ref });
    this.refSet.add(ref);
    this.finalizationGroup.register(
      key,
      {
        set: this.refSet,
        ref
      },
      ref
    );

    return this;
  }

  get(this: this, key: K): V | undefined {
    const entry = this.weakMap.get(key);
    return entry && entry.value;
  }

  delete(this: this, key: K): boolean {
    const entry = this.weakMap.get(key);
    if (!entry) {
      return false;
    }

    this.weakMap.delete(key);
    this.refSet.delete(entry.ref);
    this.finalizationGroup.unregister(entry.ref);
    return true;
  }

  [Symbol.iterator](this: this): IterableIterator<[K, V]> {
    return this.entries();
  }

  *iterator(this: this): IterableIterator<[K, V]> {
    for (const ref of this.refSet) {
      const key = ref.deref();
      if (!key) continue;
      const { value } = this.weakMap.get(key)!;
      yield [key, value];
    }
  }

  *entries(this: this): IterableIterator<[K, V]> {
    for (const ref of this.refSet) {
      const key = ref.deref();
      if (!key) continue;
      const { value } = this.weakMap.get(key)!;
      yield [key, value];
    }
  }

  *keys(this: this): IterableIterator<K> {
    for (const [key] of this) {
      yield key;
    }
  }

  *values(this: this): IterableIterator<V> {
    for (const [, value] of this) {
      yield value;
    }
  }

  has(this: this, key: K) {
    return this.weakMap.has(key);
  }
}

const ConcreteImpl: {
  new<K extends object, V>(iterable: Iterable<[K, V]>): IterableWeakMap<K, V>;
} = typeof FinalizationRegistry !== "undefined" ? WeakImpl : Map;
