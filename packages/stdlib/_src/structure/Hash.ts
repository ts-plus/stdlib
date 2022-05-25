// forked from https://github.com/frptools

/**
 * @tsplus type HashOps
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
 * @tsplus static HashOps isHash
 */
export function isHash(u: unknown): u is Hash {
  return typeof u === "object" && u !== null && Hash.sym in u
}

/**
 * @tsplus static HashOps optimize
 */
export function optimize(n: number) {
  return (n & 0xbfffffff) | ((n >>> 1) & 0x40000000)
}

/**
 * @tsplus static HashOps unknown
 * @tsplus fluent Hash hash
 */
export function hashUnknown<A>(arg: A): number {
  return optimize(_hash(arg))
}

/**
 * @tsplus static HashOps array
 */
export function hashArray(arr: readonly unknown[]): number {
  return optimize(_hashArray(arr))
}

/**
 * @tsplus static HashOps args
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
 * @tsplus static HashOps combine
 */
export function combine(a: number, b: number): number {
  return optimize(_combineHash(a, b))
}

/**
 * @tsplus static HashOps object
 */
export function hashObject(value: object): number {
  return optimize(_hashObject(value))
}

/**
 * @tsplus static HashOps miscRef
 */
export function hashMiscRef(o: Object): number {
  return optimize(_hashMiscRef(o))
}

/**
 * @tsplus static HashOps iterator
 */
export function hashIterator(it: Iterator<any>): number {
  return optimize(_hashIterator(it))
}

/**
 * @tsplus static HashOps plainObject
 */
export function hashPlainObject(o: object): number {
  return optimize(_hashPlainObject(o))
}

/**
 * @tsplus static HashOps number
 */
export function hashNumber(n: number): number {
  return optimize(_hashNumber(n))
}

/**
 * @tsplus static HashOps string
 */
export function hashString(str: string): number {
  return optimize(_hashString(str))
}

/**
 * @tsplus static HashOps random
 */
export function hashRandom(): number {
  return optimize(randomInt())
}

function isZero(value: any): boolean {
  return value === null || value === void 0 || value === false
}

const RANDOM = new RandomPCG((Math.random() * 4294967296) >>> 0)
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

function _combineHash(a: number, b: number): number {
  return (a * 53) ^ b
}

function _hashObject(value: object): number {
  let h = CACHE.get(value)
  if (isDefined(h)) return h
  if (isHash(value)) {
    h = value[Hash.sym]()
  } else {
    h = hashRandom()
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
  const keys = Object.keys(o).sort()
  let h = 12289
  for (let i = 0; i < keys.length; i++) {
    h = _combineHash(h, _hashString(keys[i]!))
    h = _combineHash(h, hashUnknown((o as any)[keys[i]!]))
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
