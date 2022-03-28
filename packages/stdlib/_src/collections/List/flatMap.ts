/**
 * @tsplus fluent List flatMap
 */
export function flatMap_<A, B>(self: List<A>, f: (a: A) => List<B>): List<B> {
  let rest = self;
  let h: List.Cons<B> | undefined = undefined;
  let t: List.Cons<B> | undefined = undefined;
  while (!rest.isNil()) {
    let bs = f(rest.head);
    while (!bs.isNil()) {
      const nx = List.cons(bs.head, List.nil());
      if (t === undefined) {
        h = nx;
      } else {
        t.tail = nx;
      }
      t = nx;
      bs = bs.tail;
    }
    rest = rest.tail;
  }
  if (h === undefined) return List.nil();
  else return h;
}

export const flatMap = Pipeable(flatMap_);
