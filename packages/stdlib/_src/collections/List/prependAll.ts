/**
 * @tsplus static List.Aspects prependAll
 * @tsplus pipeable List prependAll
 */
export function prependAll<A, B>(prefix: List<B>) {
  return (self: List<A>): List<A | B> => {
    if (self.isNil()) {
      return prefix
    } else if (prefix.isNil()) {
      return self
    } else {
      const result = List.cons<A | B>(prefix.head, self)
      let curr = result
      let that = prefix.tail
      while (!that.isNil()) {
        const temp = List.cons<A | B>(that.head, self)
        curr.tail = temp
        curr = temp
        that = that.tail
      }
      return result
    }
  }
}
