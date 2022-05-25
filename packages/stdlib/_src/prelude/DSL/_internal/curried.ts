export function curried(f: Function, n: number, acc: ReadonlyArray<unknown>) {
  return function(x: unknown) {
    const combined = acc.concat([x])
    // eslint-disable-next-line prefer-spread
    return n === 0 ? f.apply(null, combined) : curried(f, n - 1, combined)
  }
}
