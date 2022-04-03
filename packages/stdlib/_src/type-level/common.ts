export declare namespace TypeLevel {
  /**
   * @tsplus type Check.UnionToIntersection
   */
  type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never;

  /**
   * @tsplus type Check.RequiredKeys
   */
  type RequiredKeys<T> = { [K in keyof T]-?: ({} extends { [P in K]: T[K]; } ? never : K); }[keyof T];

  /**
   * @tsplus type Check.OptionalKeys
   */
  type OptionalKeys<T> = { [K in keyof T]-?: ({} extends { [P in K]: T[K]; } ? K : never); }[keyof T];

  /**
   * @tsplus type Check.UnionToTuple
   */
  type UnionToTuple<Union> = UnionToIntersection<
    Union extends unknown ? (distributed: Union) => void
      : never
  > extends ((merged: infer Intersection) => void)
    ? readonly [...UnionToTuple<Exclude<Union, Intersection>>, Intersection]
    : [];
}
