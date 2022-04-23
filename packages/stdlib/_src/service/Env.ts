/* eslint-disable prefer-rest-params */
import type { Has } from "@tsplus/stdlib/service/Has";
import type { Tag } from "@tsplus/stdlib/service/Tag";

/**
 * @tsplus type Env/Ops
 */
export interface EnvOps {
  readonly sym: unique symbol;

  <S, H>(tag: Tag<S>, service: H): Env<Has<S>>;
  (unsafeMap?: Env<unknown>["unsafeMap"]): Env<unknown>;
}

function methodAdd<R, S, H>(this: Env<R>, tag: Tag<S>, service: H): Env<R & Has<S>> {
  return Env(this.unsafeMap.set(tag, service)) as Env<R & Has<S>>;
}

function methodGet<R, S>(this: Env<R>, tag: Tag<S>): S {
  return this.unsafeMap.unsafeGet(tag) as S;
}

function methodGetOption<R, S>(this: Env<R>, tag: Tag<S>): Option<S> {
  return this.unsafeMap.get(tag) as Option<S>;
}

function methodMerge<R, R1>(this: Env<R>, that: Env<R1>): Env<R & R1> {
  return Env(this.unsafeMap + that.unsafeMap) as Env<R & R1>;
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
    newEnv.set(tag, this.unsafeGet(tag));
  }
  return Env(new ImmutableMap(newEnv)) as Env<
    UnionToIntersection<
      {
        [k in keyof S]: [S[k]] extends [Tag<infer _S>] ? Has<_S> : never;
      }[number]
    >
  >;
}

export const Env: EnvOps = Object.assign(
  function() {
    const unsafeMap: Env<unknown>["unsafeMap"] = arguments.length === 0 ?
      ImmutableMap.empty() :
      arguments.length === 1 ?
      arguments[0] :
      new ImmutableMap(new Map([[arguments[0], arguments[1]]]));
    return {
      [Env.sym]: identity,
      unsafeMap,
      add: methodAdd,
      get: methodGet,
      unsafeGet: methodGet,
      getOption: methodGetOption,
      merge: methodMerge,
      prune: pruneMethod
    };
  },
  { sym: Symbol("@tsplus/stdlib/Env/Env") as EnvOps["sym"] }
);

/**
 * @tsplus type Env
 */
export interface Env<R> {
  readonly [Env.sym]: (_: never) => R;
  readonly unsafeMap: ImmutableMap<Tag<unknown>, unknown>;

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
