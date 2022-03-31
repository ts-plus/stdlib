/**
 * Runs this computation.
 *
 * @tsplus fluent Eval run
 */
export function run<A>(self: Eval<A>): A {
  let stack: Stack<(e: any) => Eval<any>> | undefined = undefined;
  let a = undefined;
  let curIO = self as Eval<any> | undefined;

  while (curIO != null) {
    switch (curIO._tag) {
      case "FlatMap": {
        switch (curIO.value._tag) {
          case "Succeed": {
            curIO = curIO.cont(curIO.value.a());
            break;
          }
          default: {
            stack = new Stack(curIO.cont, stack);
            curIO = curIO.value;
          }
        }

        break;
      }
      case "Suspend": {
        curIO = curIO.f();
        break;
      }
      case "Succeed": {
        a = curIO.a();
        if (stack) {
          curIO = stack.value(a);
          stack = stack.previous;
        } else {
          curIO = undefined;
        }
        break;
      }
    }
  }

  return a;
}
