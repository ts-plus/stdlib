declare global {
  /**
   * @tsplus type Array
   */
  export interface Array<T> {}
}

/**
 * @tsplus type ImmutableArray
 * @tsplus companion ImmutableArrayOps
 */
export class ImmutableArray<A> implements Equals, Collection<A> {
  constructor(readonly array: ReadonlyArray<A>) {}

  [Symbol.iterator](): Iterator<A> {
    return this.array[Symbol.iterator]();
  }

  [Equals.sym](this: this, other: unknown): boolean {
    return (
      other instanceof ImmutableArray &&
      this.array.length === other.array.length &&
      this.array.every((v, i) => Equals.equals(v, other.array[i]))
    );
  }

  [Hash.sym](this: this): number {
    return Hash.array(this.array);
  }
}

/**
 * @tsplus type ImmutableArrayOps
 */
export interface ReadonlyArrayOps {}

/**
 * @tsplus static ImmutableArrayOps __call
 * @tsplus static ImmutableArrayOps make
 */
export function make<A extends readonly any[]>(...as: A): ImmutableArray<A[number]> {
  return new ImmutableArray(as);
}

/**
 * @tsplus static ImmutableArrayOps from
 * @tsplus fluent Collection asImmutableArray
 */
export function from<A>(iterable: Collection<A>): ImmutableArray<A> {
  return new ImmutableArray(Array.from(iterable));
}

/**
 * @tsplus fluent ImmutableArray map
 */
export function map_<A, B>(
  i: ImmutableArray<A>,
  f: (a: A, k: number) => B
): ImmutableArray<B> {
  return new ImmutableArray(i.array.map(f));
}

export const map = Pipeable(map_);

/**
 * @tsplus fluent Array immutable
 */
export function immutable<A>(self: Array<A>): ImmutableArray<A> {
  return new ImmutableArray(self.slice(0, self.length));
}

/**
 * @tsplus index ImmutableArray
 * @tsplus fluent ImmutableArray get
 */
export function get_<A>(
  self: ImmutableArray<A>,
  index: number
): Option<NonNullable<A>> {
  return Option.fromNullable(self.array[index]);
}

export const get = Pipeable(get_);

/**
 * @tsplus operator ImmutableArray &
 * @tsplus fluent ImmutableArray concat
 */
export function concat_<A, B>(
  self: ImmutableArray<A>,
  that: ImmutableArray<B>
): ImmutableArray<A | B> {
  return new ImmutableArray([...self.array, ...that.array]);
}

export const concat = Pipeable(concat_);

/**
 * Concatenates two ImmutableArray together
 *
 * @tsplus operator ImmutableArray +
 */
export const concatOperator: <A>(
  self: ImmutableArray<A>,
  that: ImmutableArray<A>
) => ImmutableArray<A> = concat_;

/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus operator ImmutableArray + 1.0
 */
export function prependOperatorStrict<A>(a: A, self: ImmutableArray<A>): ImmutableArray<A> {
  return new ImmutableArray([a, ...self.array]);
}

/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus operator ImmutableArray >
 */
export function prependOperator<A, B>(a: A, self: ImmutableArray<B>): ImmutableArray<A | B> {
  return new ImmutableArray([a, ...self.array]);
}

/**
 * Prepends `a` to ImmutableArray<A>
 *
 * @tsplus fluent ImmutableArray prepend
 */
export function prepend_<A, B>(self: ImmutableArray<A>, a: B): ImmutableArray<A | B> {
  return new ImmutableArray([a, ...self.array]);
}

export const prepend = Pipeable(prepend_);

/**
 * Appends `a` to ImmutableArray<A>
 *
 * @tsplus fluent ImmutableArray append
 * @tsplus operator ImmutableArray <
 */
export function append_<A, B>(self: ImmutableArray<A>, a: B): ImmutableArray<A | B> {
  return new ImmutableArray([...self.array, a]);
}

export const append = Pipeable(append_);

/**
 * @tsplus operator ImmutableArray + 1.0
 */
export const appendOperator: <A>(self: ImmutableArray<A>, a: A) => ImmutableArray<A> = append_;

/**
 * @tsplus operator ImmutableArray ==
 * @tsplus fluent ImmutableArray equals
 */
export function equals_<A, B>(self: ImmutableArray<A>, that: ImmutableArray<B>): boolean {
  return self.array.length === that.array.length &&
    self.array.every((v, i) => Equals.equals(v, that.array[i]));
}

export const equals = Pipeable(equals_);

/**
 * @tsplus fluent ImmutableArray asCollection
 */
export function asCollection<A>(self: ImmutableArray<A>): Collection<A> {
  return self;
}

/**
 * @tsplus macro pipe
 * @tsplus fluent ImmutableArray __call
 */
export const immutableArrayPipe: typeof pipe = pipe;
