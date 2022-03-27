import type { Option } from "@tsplus/stdlib/data/Option";
import type { UnionToIntersection } from "@tsplus/stdlib/utilities/Types";

export const WithSymbol: unique symbol = Symbol();
export type WithSymbol = typeof WithSymbol;

/**
 * @tsplus type With
 */
export interface With<Service> {
  [WithSymbol](): Service;
}

export type Environment<Services extends unknown[]> = UnionToIntersection<
  {
    [k in keyof Services]: Services[k] extends With<any> ? Services[k] : With<Services[k]>;
  }[number]
>;

export type Env = Environment<[
  number,
  string
]>;

export interface ServiceOf<T> {
  (service: T): With<T>;
}

export interface ServiceAccess<T> {
  readonly get: <R extends With<T>>(environment: R) => T;
  readonly in: <R>(environment: R) => environment is R & With<T>;
}

/**
 * @tspus type Service
 */
export interface Service<T> extends ServiceOf<T>, ServiceAccess<T> {}

/**
 * @tspus type Service/Ops
 */
export interface ServiceOps {
  <T>(key: PropertyKey): Service<T>;
}

export const Service: ServiceOps = <T>(key: PropertyKey): Service<T> => {
  const of: ServiceOf<T> = (r: T) => ({ [key]: r } as any as With<T>);
  const access: ServiceAccess<T> = {
    get: (r) => r[key],
    in: (environment): environment is any =>
      typeof environment === "object" && environment != null && key in environment
  };
  return Object.assign(of, access);
};

export interface Extractor<A> {
  Option: [A] extends [Option<infer X>] ? X : never;
}

export declare namespace Service {
  export type IfDefined<A, B> = [A] extends [never] ? B : A;
  export type From<A> = IfDefined<Extractor<A>[keyof Extractor<A>], A>;
}

/**
 * @tsplus operator With &
 * @tsplus fluent With merge
 */
export function merge<A extends With<any>, B extends With<any>>(self: A, that: B): A & B {
  return { ...self, ...that };
}
