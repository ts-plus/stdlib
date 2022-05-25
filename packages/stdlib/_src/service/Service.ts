import * as E from "@tsplus/stdlib/service/Env"
import * as H from "@tsplus/stdlib/service/Has"
import * as P from "@tsplus/stdlib/service/Patch"
import * as T from "@tsplus/stdlib/service/Tag"

/**
 * @tsplus type Service/Ops
 */
export interface ServiceOps {
  readonly Tag: T.TagOps
  readonly Env: E.EnvOps
  readonly Has: H.HasOps
  readonly Patch: P.PatchOps
}

export const Service: ServiceOps = {
  Tag: T.Tag,
  Env: E.Env,
  Has: H.Has,
  Patch: P.Patch
}

export declare namespace Service {
  export type Tag<S> = T.Tag<S>
  export type Env<R> = E.Env<R>
  export type Has<R> = H.Has<R>
  export type Patch<Input, Output> = P.Patch<Input, Output>
}
