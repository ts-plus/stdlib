/**
 * @tsplus type Environment
 * @tsplus companion EnvironmentOps
 */
export class Environment<R> {
  readonly _R!: () => R;
  constructor(readonly serviceMap: Map<PropertyKey, any>) {}
}

/**
 * @tsplus static EnvironmentOps empty
 */
export const empty = new Environment(new Map());

/**
 * @tsplus fluent Environment get
 */
export function get<R extends Service.Has<S>, S>(self: Environment<R>, tag: Service.Access<S>): S {
  return self.serviceMap.get(tag.identifier);
}

/**
 * @tsplus fluent Environment put
 */
export function put<R, S>(
  self: Environment<R>,
  tag: Service.Access<S>,
  service: S
): Environment<R & Service.Has<S>> {
  const newEnv = new Map(self.serviceMap);
  newEnv.set(tag.identifier, service);
  return new Environment(newEnv);
}

/**
 * @tsplus fluent Environment has
 */
export function has<R, S>(
  self: Environment<R>,
  tag: Service<S>
): self is Environment<R & Service.Has<S>> {
  return self.serviceMap.has(tag.identifier);
}

/**
 * @tsplus fluent Environment merge
 * @tsplus operator Environment +
 */
export function merge<R0, R1>(self: Environment<R0>, that: Environment<R1>): Environment<R0 & R1> {
  const env = new Map(self.serviceMap);
  for (const [tag, service] of that.serviceMap) {
    env.set(tag, service);
  }
  return new Environment(env);
}
