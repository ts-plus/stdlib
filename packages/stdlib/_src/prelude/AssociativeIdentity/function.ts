/**
 * `AssociativeIdentity` for function combination.
 *
 * @tsplus static AssociativeIdentity/Ops function
 */
export function function_<M>(M: AssociativeIdentity<M>): <A>() => AssociativeIdentity<(a: A) => M> {
  return <A>() => AssociativeIdentity((_: A) => M.identity, Associative.function(M)<A>().combine)
}

export { function_ as function }
