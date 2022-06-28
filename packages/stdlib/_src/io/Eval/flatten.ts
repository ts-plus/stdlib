/**
 * Flatten an `Eval<Eval<A>>` into an `Eval<A>`
 *
 * @tsplus getter Eval flatten
 */
export function flatten<A>(self: Eval<Eval<A>>): Eval<A> {
  return self.flatMap(identity)
}
