export const WithSymbol: unique symbol = Symbol();
export type WithSymbol = typeof WithSymbol;

/**
 * @tsplus type Has
 */
export interface Has<Service> {
  [WithSymbol](): Service;
}

export interface ServiceOf<T> {
  (service: T): Service.Has<T>;
}

export const Service: ServiceOps = <T>(key: PropertyKey): Service<T> => {
  const of: ServiceOf<T> = (r: T) => ({ [key]: r } as any as Service.Has<T>);
  const in_: <R>(environment: R) => environment is R & Service.Has<T> = (environment): environment is any =>
    typeof environment === "object" && environment != null && key in environment;
  const access: Service.Access<T> = {
    id: (x) => x,
    identifier: key,
    get: (r) => r[key],
    getMaybe: (r) => in_(r) ? Option.some(r[key]) : Option.none,
    in: in_
  };
  return Object.assign(of, access);
};

/**
 * @tspus type Service
 */
export interface Service<T> extends Service.Access<T>, ServiceOf<T> {}

/**
 * @tspus type Service/Ops
 */
export interface ServiceOps {
  <T>(key: PropertyKey): Service<T>;
}

export interface Extractor<A> {
  Option: [A] extends [Option<infer X>] ? X : never;
}

type HasInternal<A> = Has<A>;

export declare namespace Service {
  export type From<A> = OrElse<Extractor<A>[keyof Extractor<A>], A>;

  export type All<Services extends unknown[]> = UnionToIntersection<
    {
      [k in keyof Services]: Services[k] extends Has<any> ? Services[k] : Has<Services[k]>;
    }[number]
  >;

  export type Has<A> = HasInternal<A>;

  export interface Access<T> {
    readonly id: (_: T) => T;
    readonly identifier: PropertyKey;
    readonly get: <R extends Service.Has<T>>(environment: R) => T;
    readonly getMaybe: <R>(environment: R) => Option<T>;
    readonly in: <R>(environment: R) => environment is R & Service.Has<T>;
  }
}

/**
 * @tsplus operator Has &
 * @tsplus fluent Has merge
 */
export function merge<A extends Service.Has<any>, B extends Service.Has<any>>(self: A, that: B): A & B {
  return { ...self, ...that };
}

/**
 * @tsplus static Service/Ops isService
 */
export function isService(u: unknown): u is Service<unknown> {
  return (
    typeof u === "object" &&
    u != null &&
    "of" in u &&
    typeof u["of"] === "function" &&
    "in" in u &&
    typeof u["in"] === "function" &&
    "id" in u &&
    typeof u["id"] === "function" &&
    "get" in u &&
    typeof u["get"] === "function" &&
    "getMaybe" in u &&
    typeof u["getMaybe"] === "function" &&
    "identifier" in u
  );
}
