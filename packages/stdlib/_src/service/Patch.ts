import { Env } from "@tsplus/stdlib/service/Env";

export const PatchSym = Symbol.for("@tsplus/stdlib/service/Patch");
export type PatchSym = typeof PatchSym;

export const _Input = Symbol.for("@tsplus/stdlib/service/Patch/Input");
export type _Input = typeof _Input;

export const _Output = Symbol.for("@tsplus/stdlib/service/Patch/Output");
export type _Output = typeof _Output;

/**
 * A `Patch<Input, Output>` describes an update that transforms a `Env<Input>`
 * to a `Env<Output>` as a data structure. This allows combining updates to
 * different services in the environment in a compositional way.
 *
 * @tsplus type Patch
 */
export interface Patch<Input, Output> {
  readonly [PatchSym]: PatchSym;
  readonly [_Input]: (input: Input) => void;
  readonly [_Output]: () => Output;
}

/**
 * @tsplus type Patch/Ops
 */
export interface PatchOps {
  $: PatchAspects;
}
export const Patch: PatchOps = {
  $: {}
};

/**
 * @tsplus type Patch/Aspects
 */
export interface PatchAspects {}

export abstract class BasePatch<Input, Output> implements Patch<Input, Output> {
  readonly [PatchSym]: PatchSym = PatchSym;
  readonly [_Input]!: (input: Input) => void;
  readonly [_Output]!: () => Output;
}

export class Empty<Env> extends BasePatch<Env, Env> {
  readonly _tag = "Empty";

  constructor() {
    super();
  }
}

export class AddService<Env, T> extends BasePatch<Env, Env & Service.Has<T>> {
  readonly _tag = "AddService";

  constructor(readonly tag: Service.Tag<T>, readonly service: T) {
    super();
  }
}

export class AndThen<Input, Output, Output2> extends BasePatch<Input, Output2> {
  readonly _tag = "AndThen";

  constructor(readonly first: Patch<Input, Output>, readonly second: Patch<Output, Output2>) {
    super();
  }
}

export class RemoveService<Env, T> extends BasePatch<Env & Service.Has<T>, Env> {
  readonly _tag = "RemoveService";

  constructor(readonly tag: Service.Tag<T>) {
    super();
  }
}

export class UpdateService<Env, T> extends BasePatch<Env & Service.Has<T>, Env & Service.Has<T>> {
  readonly _tag = "UpdateService";

  constructor(readonly tag: Service.Tag<T>, readonly update: (service: T) => T) {
    super();
  }
}

/**
 * @tsplus macro remove
 */
export function concretePatch<Input, Output>(
  _: Patch<Input, Output>
): asserts _ is
  | Empty<any>
  | AddService<any, any>
  | AndThen<any, any, any>
  | RemoveService<any, any>
  | UpdateService<any, any>
{
  //
}

/**
 * Applies a `Patch` to the specified `Env` to produce a new patched `Env`.
 *
 * @tsplus fluent Patch patch
 */
export function patch_<Input, Output>(self: Patch<Input, Output>, env: Service.Env<Input>): Service.Env<Output> {
  return patchLoop(env, List(self as Patch<unknown, unknown>)) as Service.Env<Output>;
}

/**
 * @tsplus static Patch/Aspects patch
 */
export const patch = Pipeable(patch_);

/**
 * @tsplus tailrec
 */
function patchLoop(env: Service.Env<unknown>, patches: List<Patch<unknown, unknown>>): Service.Env<unknown> {
  if (patches.isNil()) {
    return env;
  }
  const head = patches.head;
  concretePatch(head);
  const tail = patches.tail;
  switch (head._tag) {
    case "Empty": {
      return patchLoop(env, tail);
    }
    case "AddService": {
      return patchLoop(env.add(head.tag, head.service), tail);
    }
    case "AndThen": {
      return patchLoop(env, tail.prependAll(List(head.first, head.second)));
    }
    case "RemoveService": {
      return patchLoop(Env(env.unsafeMap.remove(head.tag)), tail);
    }
    case "UpdateService": {
      const service = env.get<any, any>(head.tag);
      return patchLoop(env.add(head.tag, head.update(service)), tail);
    }
  }
}

/**
 * An empty patch which returns the environment unchanged.
 *
 * @tsplus static Patch/Ops empty
 */
export function empty<A>(): Patch<A, A> {
  return new Empty();
}

/**
 * Combines two patches to produce a new patch that describes applying the
 * updates from this patch and then the updates from the specified patch.
 *
 * @tsplus fluent Patch combine
 */
export function combine_<Input, Output, Output2>(
  self: Patch<Input, Output>,
  that: Patch<Output, Output2>
): Patch<Input, Output2> {
  return new AndThen(self, that);
}

/**
 * Combines two patches to produce a new patch that describes applying the
 * updates from this patch and then the updates from the specified patch.
 *
 * @tsplus static Patch/Aspects combine
 */
export const combine = Pipeable(combine_);

/**
 * @tsplus static Patch/Ops diff
 */
export function diff<Input, Output>(oldValue: Service.Env<Input>, newValue: Service.Env<Output>): Patch<Input, Output> {
  const sorted = newValue.unsafeMap.asList().sortWith(Ord.number.contramap(({ tuple: [tag] }) => tag.id));
  const { tuple: [missingServices, patch] } = sorted.reduce(
    Tuple(oldValue.unsafeMap, Patch.empty() as unknown as Patch<Input, Output>),
    ({ tuple: [map, patch] }, { tuple: [tag, newService] }) =>
      map.get(tag).fold(
        Tuple(map.remove(tag), patch.combine(new AddService(tag, newService))),
        (oldService) =>
          oldService === newService ?
            Tuple(map.remove(tag), patch) :
            Tuple(
              map.remove(tag),
              (patch as Patch<Input, Output & Service.Has<unknown>>).combine(new UpdateService(tag, () => newService))
            )
      )
  );
  return missingServices.reduceWithIndex(
    patch,
    (patch, tag, _) => (patch as Patch<Input, Output & Service.Has<unknown>>).combine(new RemoveService(tag))
  );
}
