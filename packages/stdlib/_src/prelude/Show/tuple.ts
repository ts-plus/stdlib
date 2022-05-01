/**
 * @tsplus static Show/Ops tuple
 */
export function tuple<T extends ReadonlyArray<Show<any>>>(
  ...shows: T
): Show<
  {
    [K in keyof T]: T[K] extends Show<infer A> ? A : never;
  }
> {
  return Show(
    (t) => `[${t.map((a, i) => shows[i]!.show(a)).join(", ")}]`
  );
}
