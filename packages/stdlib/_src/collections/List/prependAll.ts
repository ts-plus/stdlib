/**
 * @tsplus fluent List prependAll
 */
export function prependAll_<A, B>(self: List<A>, prefix: List<B>): List<A | B> {
  if (self.isNil()) {
    return prefix;
  } else if (prefix.isNil()) {
    return self;
  } else {
    const result = List.cons<A | B>(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!that.isNil()) {
      const temp = List.cons<A | B>(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
}

export const prependAll = Pipeable(prependAll_);
