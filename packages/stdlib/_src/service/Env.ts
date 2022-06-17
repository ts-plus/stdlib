import type { Tag } from "@tsplus/stdlib/service/Tag"

/**
 * @tsplus type Env/Ops
 */
export interface EnvOps {
  readonly sym: unique symbol
  readonly empty: Env<never>

  <S, H>(tag: Tag<S>, service: H): Env<S>
  new(unsafeMap: Env<unknown>["unsafeMap"]): Env<never>
}

function methodAdd<R, S, H>(this: Env<R>, tag: Tag<S>, service: H): Env<R | S> {
  const map = new Map(this.unsafeMap)
  map.set(tag, service)
  return new Env(map) as Env<R | S>
}

function methodGet<R, S>(this: Env<R>, tag: Tag<S>): S {
  if (!this.unsafeMap.has(tag)) {
    throw new NoSuchElement()
  }
  return this.unsafeMap.get(tag)! as S
}

function methodGetOption<R, S>(this: Env<R>, tag: Tag<S>): Maybe<S> {
  return this.unsafeMap.has(tag) ? Maybe.some(this.unsafeMap.get(tag)! as S) : Maybe.none
}

function methodMerge<R, R1>(this: Env<R>, that: Env<R1>): Env<R | R1> {
  const map = new Map(this.unsafeMap)
  for (const [tag, s] of that.unsafeMap) {
    map.set(tag, s)
  }
  return new Env(map) as Env<R | R1>
}

function pruneMethod<R, S extends Tags<R>[]>(
  this: Env<R>,
  ...tags: S
): Env<{ [k in keyof S]: Tag.TagType<S[k]> }[number]> {
  const tagSet = new Set(tags)
  const newEnv = new Map()
  for (const [tag, s] of this.unsafeMap.entries()) {
    // @ts-expect-error
    if (tagSet.has(tag)) {
      newEnv.set(tag, s)
    }
  }
  return new Env(newEnv)
}

const sym = Symbol("@tsplus/stdlib/Env/Env") as EnvOps["sym"]

export const Env: EnvOps = Object.assign(
  function self(this: any, a: any, b: any) {
    if (this != null && this.constructor === self) {
      return createEnv(a)
    }
    return Env.empty.add(a, b)
  } as any as EnvOps,
  {
    sym,
    empty: createEnv(new Map())
  }
)

function createEnv<R>(unsafeMap: Env<R>["unsafeMap"]) {
  return {
    [sym]: identity,
    add: methodAdd,
    get: methodGet,
    unsafeGet: methodGet,
    getOption: methodGetOption,
    merge: methodMerge,
    prune: pruneMethod,
    unsafeMap
  }
}

export type Tags<R> = R extends infer S ? Tag<S> : never

/**
 * @tsplus type Env
 */
export interface Env<R> {
  readonly [Env.sym]: (_: never) => R
  readonly unsafeMap: Map<Tag<unknown>, unknown>
  add<R, S, H extends S = S>(this: Env<R>, tag: Tag<S>, service: H): Env<R | S>
  get<R, T extends Tags<R>>(this: Env<R>, tag: T): T extends Tag<infer S> ? S : never
  unsafeGet<R, S>(this: Env<R>, tag: Tag<S>): S
  getOption<R, S>(this: Env<R>, tag: Tag<S>): Maybe<S>
  merge<R, R1>(this: Env<R>, that: Env<R1>): Env<R | R1>
  prune<R, S extends Tags<R>[]>(this: Env<R>, ...tags: S): Env<{ [k in keyof S]: Tag.TagType<S[k]> }[number]>
}
