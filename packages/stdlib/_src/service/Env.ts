import type { Has } from "@tsplus/stdlib/service/Has";
import type { Tag } from "@tsplus/stdlib/service/Tag";

/**
 * @tsplus type Env/Ops
 */
export interface EnvOps {
  readonly sym: unique symbol;
  readonly empty: Env<unknown>;

  <S, H>(tag: Tag<S>, service: H): Env<Has<S>>;
  new(unsafeMap: Env<unknown>["unsafeMap"], index: number): Env<unknown>;
}

function methodAdd<R, S, H>(this: Env<R>, tag: Tag<S>, service: H): Env<R & Has<S>> {
  return new Env(this.unsafeMap.set(tag, [service, this.index]), this.index + 1) as Env<R & Has<S>>;
}

function methodGet<R, S>(this: Env<R>, tag: Tag<S>): S {
  return this.unsafeMap.unsafeGet(tag)[0] as S;
}

function methodGetOption<R, S>(this: Env<R>, tag: Tag<S>): Option<S> {
  return this.unsafeMap.get(tag).map(([_]) => _) as Option<S>;
}

function methodMerge<R, R1>(this: Env<R>, that: Env<R1>): Env<R & R1> {
  return new Env(
    this.unsafeMap + that.unsafeMap.map(([s, i]) => [s, i + this.index] as [unknown, number]),
    this.index + that.index
  ) as Env<
    R & R1
  >;
}

function pruneMethod<
  R extends UnionToIntersection<
    {
      [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never;
    }[number]
  >,
  S extends Tag<any>[]
>(this: Env<R>, ...tags: S): Env<
  UnionToIntersection<
    {
      [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never;
    }[number]
  >
> {
  const newEnv = new Map();
  for (const tag of tags) {
    newEnv.set(tag, this.unsafeMap.internalMap.get(tag));
  }
  return new Env(new ImmutableMap(newEnv), this.index) as Env<
    UnionToIntersection<
      {
        [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never;
      }[number]
    >
  >;
}
const sym = Symbol("@tsplus/stdlib/Env/Env") as EnvOps["sym"];
export const Env: EnvOps = Object.assign(
  function self(this: any, a: any, b: any) {
    if (this.constructor === self) {
      return {
        [Env.sym]: identity,
        add: methodAdd,
        get: methodGet,
        unsafeGet: methodGet,
        getOption: methodGetOption,
        merge: methodMerge,
        prune: pruneMethod,
        index: b,
        unsafeMap: a
      };
    }
    return Env.empty.add(a, b);
  } as any as EnvOps,
  {
    sym,
    empty: {
      [sym]: identity,
      add: methodAdd,
      get: methodGet,
      unsafeGet: methodGet,
      getOption: methodGetOption,
      merge: methodMerge,
      prune: pruneMethod,
      index: 0,
      unsafeMap: new ImmutableMap(new Map())
    }
  }
);

/**
 * @tsplus type Env
 */
export interface Env<R> {
  readonly [Env.sym]: (_: never) => R;
  readonly unsafeMap: ImmutableMap<Tag<unknown>, [unknown, number]>;
  readonly index: number;

  add<R, S, H extends S = S>(this: Env<R>, tag: Tag<S>, service: H): Env<R & Has<S>>;
  get<R extends Has<S>, S>(this: Env<R>, tag: Tag<S>): S;
  unsafeGet<R, S>(this: Env<R>, tag: Tag<S>): S;
  getOption<R, S>(this: Env<R>, tag: Tag<S>): Option<S>;
  merge<R, R1>(this: Env<R>, that: Env<R1>): Env<R & R1>;
  prune<
    R extends UnionToIntersection<{ [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never; }[number]>,
    S extends Tag<any>[]
  >(
    this: Env<R>,
    ...tags: S
  ): Env<UnionToIntersection<{ [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never; }[number]>>;
}
