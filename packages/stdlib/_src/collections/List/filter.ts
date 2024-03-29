/**
 * @tsplus static List.Aspects filter
 * @tsplus pipeable List filter
 */
export function filter<A, B extends A>(p: Refinement<A, B>): (self: List<A>) => List<B>
export function filter<A>(p: Predicate<A>): (self: List<A>) => List<A>
export function filter<A>(p: Predicate<A>) {
  return (self: List<A>): List<A> => filterCommon_(self, p, false)
}

function noneIn<A>(l: List<A>, p: Predicate<A>, isFlipped: boolean): List<A> {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (l.isNil()) {
      return List.nil()
    } else {
      if (p(l.head) !== isFlipped) {
        return allIn(l, l.tail, p, isFlipped)
      } else {
        l = l.tail
      }
    }
  }
}

function allIn<A>(
  start: List<A>,
  remaining: List<A>,
  p: Predicate<A>,
  isFlipped: boolean
): List<A> {
  /* eslint-disable no-constant-condition */
  while (true) {
    if (remaining.isNil()) {
      return start
    } else {
      if (p(remaining.head) !== isFlipped) {
        remaining = remaining.tail
      } else {
        return partialFill(start, remaining, p, isFlipped)
      }
    }
  }
}

function partialFill<A>(
  origStart: List<A>,
  firstMiss: List<A>,
  p: Predicate<A>,
  isFlipped: boolean
): List<A> {
  const newHead = List.cons<A>(origStart.unsafeHead!, List.nil())
  let toProcess = origStart.unsafeTail! as List.Cons<A>
  let currentLast = newHead

  while (!(toProcess === firstMiss)) {
    const newElem = List.cons(toProcess.unsafeHead!, List.nil())
    currentLast.tail = newElem
    currentLast = unsafeCoerce(newElem)
    toProcess = unsafeCoerce(toProcess.tail)
  }

  let next = firstMiss.tail
  let nextToCopy: List.Cons<A> = unsafeCoerce(next)
  while (!next.isNil()) {
    const head = next.unsafeHead!
    if (p(head) !== isFlipped) {
      next = next.tail
    } else {
      while (!(nextToCopy === next)) {
        const newElem = List.cons(nextToCopy.unsafeHead!, List.nil())
        currentLast.tail = newElem
        currentLast = newElem
        nextToCopy = unsafeCoerce(nextToCopy.tail)
      }
      nextToCopy = unsafeCoerce(next.tail)
      next = next.tail
    }
  }

  if (!nextToCopy.isNil()) {
    currentLast.tail = nextToCopy
  }

  return newHead
}

function filterCommon_<A>(list: List<A>, p: Predicate<A>, isFlipped: boolean): List<A> {
  return noneIn(list, p, isFlipped)
}
