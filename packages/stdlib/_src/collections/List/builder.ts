export class ListBuilder<A> {
  constructor(private buffer: ListBuffer<A>) {}

  append(a: A): ListBuilder<A> {
    this.buffer.append(a)
    return this
  }

  build() {
    return this.buffer.toList
  }
}

/**
 * @tsplus static List.Ops builder
 */
export function builder<A>(): ListBuilder<A> {
  return new ListBuilder(new ListBuffer())
}
