interface A {
  _tag: "A";
  a: number;
}
interface B {
  _tag: "B";
  b: string;
}
interface C {
  _tag: "C";
  c: symbol;
}
type ADT = A | B | C;

function adt(): ADT {
  return {
    _tag: "A",
    a: 0
  };
}

describe.concurrent("Match", () => {
  it("tag", () => {
    const matchEval = Match.tag(adt(), {
      A: (_) => Eval.succeed(_),
      B: (_) => Eval.succeed(_),
      C: (_) => Eval.succeed(_)
    });

    const result = matchEval.run();

    assert.deepStrictEqual(result, { _tag: "A", a: 0 });
  });

  it("tagFor", () => {
    const matchEvalFor = Match.tagFor<ADT>()({
      A: (_) => Eval.succeed(_),
      B: (_) => Eval.succeed(_),
      C: (_) => Eval.succeed(_)
    });

    const result = matchEvalFor(adt()).run();

    assert.deepStrictEqual(result, { _tag: "A", a: 0 });
  });
});
