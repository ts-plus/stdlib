/**
 * Folds over the events in this collection of events using the specified
 * functions.
 *
 * @tsplus fluent ParSeq fold
 */
export function fold_<A, B>(
  self: ParSeq<A>,
  emptyCase: B,
  singleCase: (a: A) => B,
  thenCase: (l: B, r: B) => B,
  bothCase: (l: B, r: B) => B
): B {
  return foldLoop(
    emptyCase,
    singleCase,
    thenCase,
    bothCase,
    List(self),
    List.empty()
  ).unsafeHead()!;
}

/**
 * Folds over the events in this collection of events using the specified
 * functions.
 *
 * @tsplus static ParSeq/Aspects fold
 */
export const fold = Pipeable(fold_);

function foldLoop<A, B>(
  emptyCase: B,
  singleCase: (a: A) => B,
  thenCase: (l: B, r: B) => B,
  bothCase: (l: B, r: B) => B,
  inp: List<ParSeq<A>>,
  out: List<Either<boolean, B>>
): List<B> {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    if (inp.isNil()) {
      return out.reduce(List.empty<B>(), (acc, val) => {
        if (val._tag === "Right") {
          return acc.prepend(val.right);
        } else {
          if (val.left) {
            let parSeqs: List<B> = acc;
            const left = parSeqs.unsafeHead();
            parSeqs = parSeqs.unsafeTail()!;
            const right = parSeqs.unsafeHead();
            parSeqs = parSeqs.unsafeTail()!;
            return parSeqs.prepend(bothCase(left!, right!));
          } else {
            let parSeqs: List<B> = acc;
            const left = parSeqs.unsafeHead();
            parSeqs = parSeqs.unsafeTail()!;
            const right = parSeqs.unsafeHead();
            parSeqs = parSeqs.unsafeTail()!;
            return parSeqs.prepend(thenCase(left!, right!));
          }
        }
      });
    } else {
      const head = inp.head;
      const parSeqs = inp.tail();

      switch (head._tag) {
        case "Empty": {
          inp = parSeqs;
          out = out.prepend(Either.right(emptyCase));
          break;
        }
        case "Single": {
          inp = parSeqs;
          out = out.prepend(Either.right(singleCase(head.a)));
          break;
        }
        case "Then": {
          inp = parSeqs.prepend(head.right).prepend(head.left);
          out = out.prepend(Either.left(false));
          break;
        }
        case "Both": {
          inp = parSeqs.prepend(head.right).prepend(head.left);
          out = out.prepend(Either.left(true));
          break;
        }
      }
    }
  }
  throw new Error("Bug");
}
