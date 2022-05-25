export function lazy<A>(f: () => A): () => A {
  let tmp: A | undefined
  let done = false
  return () => {
    if (done) {
      return tmp!
    }
    tmp = f()
    done = true
    return tmp!
  }
}
