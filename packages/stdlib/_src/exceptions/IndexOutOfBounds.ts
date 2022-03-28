export const IndexOutOfBoundsTag = "IndexOutOfBounds";

export class IndexOutOfBounds extends Exception {
  readonly _tag = IndexOutOfBoundsTag;
  readonly message: string = `${this.index} is out of bounds (min ${this.min}, max ${this.max})`;
  constructor(readonly index: number, readonly min: number, readonly max: number) {
    super();
  }
}
