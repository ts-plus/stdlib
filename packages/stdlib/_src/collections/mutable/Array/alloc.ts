/**
 * @tsplus static Array.Ops alloc
 */
export function alloc<A>(length: number): Array<A> {
  return new Array<A>(length)
}
