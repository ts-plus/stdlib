import * as E from "@tsplus/stdlib/service/Env"
import * as P from "@tsplus/stdlib/service/Patch"
import * as T from "@tsplus/stdlib/service/Tag"

/**
 * @tsplus type Service.Ops
 */
export interface ServiceOps {
  readonly Tag: T.TagOps
  readonly Env: E.EnvOps
  readonly Patch: P.PatchOps
}

export const Service: ServiceOps = {
  Tag: T.Tag,
  Env: E.Env,
  Patch: P.Patch
}

export declare namespace Service {
  export type Tag<S> = T.Tag<S>
  export type Tags<S> = E.Tags<S>
  export type Env<R> = E.Env<R>
  export type Patch<Input, Output> = P.Patch<Input, Output>
  export type TagType<T extends Tag<any>> = T.Tag.TagType<T>
}
