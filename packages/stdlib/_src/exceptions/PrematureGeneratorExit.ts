export const PrematureGeneratorExitTag = "PrematureGeneratorExit";

export class PrematureGeneratorExit extends Exception {
  readonly _tag = PrematureGeneratorExitTag;
  readonly message: string =
    "Something very wrong has happened. Replaying values resulted in a premature end of the generator execution. Provided generator should be pure and perform effects only by yielding them, so that the generator can safely be re-run without side effects.";
  constructor() {
    super();
  }
}
