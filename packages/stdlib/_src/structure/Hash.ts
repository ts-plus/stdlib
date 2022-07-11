// forked from https://github.com/frptools

/**
 * @tsplus type Hash.Ops
 */
export interface HashOps {
  readonly sym: unique symbol
}

export const Hash: HashOps = {
  sym: Symbol.for("tsplus/Hash") as HashOps["sym"]
}

/**
 * @tsplus type Hash
 */
export interface Hash {
  [Hash.sym](this: this): number
}

/**
 * @tsplus static Hash.Ops isHash
 */
export function isHash(u: unknown): u is Hash {
  return typeof u === "object" && u !== null && Hash.sym in u
}

/**
 * @tsplus static Hash.Ops optimize
 */
export function optimize(n: number) {
  return (n & 0xbfffffff) | ((n >>> 1) & 0x40000000)
}

/**
 * @tsplus static Hash.Ops unknown
 * @tsplus getter Hash hash
 */
export function hashUnknown<A>(arg: A): number {
  return optimize(_hash(arg))
}

/**
 * @tsplus static Hash.Ops array
 */
export function hashArray(arr: readonly unknown[]): number {
  return optimize(_hashArray(arr))
}

/**
 * @tsplus static Hash.Ops map
 */
export function hashMap(arr: Map<unknown, unknown>): number {
  return optimize(_hashMap(arr))
}

/**
 * @tsplus static Hash.Ops set
 */
export function hashSet(arr: Set<unknown>): number {
  return optimize(_hashSet(arr))
}

/**
 * @tsplus static Hash.Ops args
 */
export function hashArgs(...args: unknown[]): number
export function hashArgs(): number {
  let h = 5381
  for (let i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    h = _combineHash(h, hashUnknown(arguments[i]))
  }
  return optimize(h)
}

/**
 * @tsplus static Hash.Ops combine
 */
export function combine(a: number, b: number): number {
  return optimize(_combineHash(a, b))
}

/**
 * @tsplus static Hash.Ops object
 */
export function hashObject(value: object): number {
  return optimize(_hashObject(value))
}

/**
 * @tsplus static Hash.Ops miscRef
 */
export function hashMiscRef(o: Object): number {
  return optimize(_hashMiscRef(o))
}

/**
 * @tsplus static Hash.Ops iterator
 */
export function hashIterator(it: Iterator<any>): number {
  return optimize(_hashIterator(it))
}

/**
 * @tsplus static Hash.Ops plainObject
 */
export function hashPlainObject(o: object): number {
  return optimize(_hashPlainObject(o))
}

/**
 * @tsplus static Hash.Ops number
 */
export function hashNumber(n: number): number {
  return optimize(_hashNumber(n))
}

/**
 * @tsplus static Hash.Ops string
 */
export function hashString(str: string): number {
  return optimize(_hashString(str))
}

/**
 * @tsplus static Hash.Ops random
 */
export function hashRandom(): number {
  return optimize(randomInt())
}

/**
 * @tsplus static Hash.Ops randomCached
 */
export function hashRandomCached(o: object): number {
  if (CACHE.has(o)) {
    return CACHE.get(o)!
  }
  const h = optimize(randomInt())
  CACHE.set(o, h)
  return h
}

function isZero(value: any): boolean {
  return value === null || value === void 0 || value === false
}

const RANDOM = new PCGRandom((Math.random() * 4294967296) >>> 0)
const CACHE = new WeakMap<Object, number>()

function randomInt() {
  return RANDOM.integer(0x7fffffff)
}

function _hash(arg: any): number {
  if (isZero(arg)) return 0
  if (typeof arg.valueOf === "function" && arg.valueOf !== Object.prototype.valueOf) {
    arg = arg.valueOf()
    if (isZero(arg)) return 0
  }
  switch (typeof arg) {
    case "number":
      return _hashNumber(arg)
    case "string":
      return _hashString(arg)
    case "function":
      return _hashMiscRef(arg)
    case "object":
      return _hashObject(arg)
    case "boolean":
      return arg === true ? 1 : 0
    case "symbol":
      return _hashString(String(arg))
    case "bigint":
      return _hashString(arg.toString(10))
    case "undefined": {
      return 0
    }
  }
}

function _hashArray(arr: readonly any[]): number {
  let h = 6151
  for (let i = 0; i < arr.length; i++) {
    h = _combineHash(h, _hash(arr[i]))
  }
  return h
}

function _hashMap(arr: Map<any, any>): number {
  let h = 9744
  arr.forEach((v, k) => {
    h ^= _combineHash(_hash(k), _hash(v))
  })
  return h
}

function _hashSet(arr: Set<any>): number {
  let h = 2362
  arr.forEach((v) => {
    h ^= _hash(v)
  })
  return h
}

function _combineHash(a: number, b: number): number {
  return (a * 53) ^ b
}

const protoMap = new Map<any, (_: any) => number>([
  [Array.prototype, hashArray],
  [Map.prototype, hashMap],
  [Set.prototype, hashSet],
  [Object.prototype, hashPlainObject]
])

function _hashObject(value: object): number {
  let h = CACHE.get(value)
  if (isDefined(h)) return h
  if (isHash(value)) {
    h = value[Hash.sym]()
  } else {
    const primitiveHash = protoMap.get(Object.getPrototypeOf(value))
    if (primitiveHash) {
      h = primitiveHash(value as any)
    } else {
      h = hashRandom()
    }
  }
  CACHE.set(value, h)
  return h
}

function _hashMiscRef(o: Object): number {
  let h = CACHE.get(o)
  if (isDefined(h)) return h
  h = randomInt()
  CACHE.set(o, h)
  return h
}

function _hashIterator(it: Iterator<any>): number {
  let h = 6151
  let current: IteratorResult<any>
  while (!(current = it.next()).done) {
    h = _combineHash(h, hashUnknown(current.value))
  }
  return h
}

function _hashPlainObject(o: object): number {
  CACHE.set(o, randomInt())
  const keys = Object.keys(o)
  let h = 12289
  for (let i = 0; i < keys.length; i++) {
    h ^= _combineHash(_hashString(keys[i]!), hashUnknown((o as any)[keys[i]!]))
  }
  return h
}

function _hashNumber(n: number): number {
  if (n !== n || n === Infinity) return 0
  let h = n | 0
  if (h !== n) h ^= n * 0xffffffff
  while (n > 0xffffffff) h ^= n /= 0xffffffff
  return n
}

function _hashString(str: string): number {
  let h = 5381,
    i = str.length
  while (i) h = (h * 33) ^ str.charCodeAt(--i)
  return h
}
