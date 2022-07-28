declare global {
  /**
   * @tsplus type string
   */
  export interface String {}
  /**
   * @tsplus type string.Ops
   */
  export interface StringConstructor {}
}

/**
 * Keep the specified number of characters from the start of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @tsplus pipeable string takeLeft
 */
export function takeLeft(n: number) {
  return (self: string): string => self.slice(0, Math.max(n, 0))
}

/**
 * Keep the specified number of characters from the end of a string.
 *
 * If `n` is larger than the available number of characters, the string will
 * be returned whole.
 *
 * If `n` is not a positive number, an empty string will be returned.
 *
 * If `n` is a float, it will be rounded down to the nearest integer.
 *
 * @tsplus pipeable string takeRight
 */
export function takeRight(n: number) {
  return (s: string): string => s.slice(Math.max(0, s.length - Math.floor(n)), Infinity)
}

/**
 * Represents the character code of a carriage return character (`"\r"`).
 *
 * @tsplus static string.Ops CR
 */
export const CR = 0x0d

/**
 * Represents the character code of a line-feed character (`"\n"`).
 *
 * @tsplus static string.Ops LF
 */
export const LF = 0x0a

/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string, trimming off the trailing newline character.
 *
 * @tsplus getter string linesIterator
 */
export function linesIterator(self: string): LinesIterator {
  return linesSeparated(self, true)
}

/**
 * Returns an `IterableIterator` which yields each line contained within the
 * string as well as the trailing newline character.
 *
 * @tsplus getter string linesIterator
 */
export function linesWithSeparators(s: string): LinesIterator {
  return linesSeparated(s, false)
}

/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the character specified by `marginChar`
 * from the line.
 *
 * @tsplus pipeable string stripMarginWith
 */
export function stripMarginWith(marginChar: string) {
  return (self: string): string => {
    let out = ""

    for (const line of linesWithSeparators(self)) {
      let index = 0

      while (index < line.length && line.charAt(index) <= " ") {
        index = index + 1
      }

      const stripped = index < line.length && line.charAt(index) === marginChar
        ? line.substring(index + 1)
        : line

      out = out + stripped
    }

    return out
  }
}

/**
 * For every line in this string, strip a leading prefix consisting of blanks
 * or control characters followed by the `"|"` character from the line.
 *
 * @tsplus getter string stripMargin
 */
export function stripMargin(self: string): string {
  return self.stripMarginWith("|")
}

export class LinesIterator implements IterableIterator<string> {
  private index: number
  private length: number

  constructor(readonly s: string, readonly stripped: boolean = false) {
    this.index = 0
    this.length = s.length
  }

  next(): IteratorResult<string> {
    if (this.done) {
      return { done: true, value: undefined }
    }

    const start = this.index

    while (!this.done && !isLineBreak(this.s[this.index]!)) {
      this.index = this.index + 1
    }

    let end = this.index

    if (!this.done) {
      const char = this.s[this.index]!

      this.index = this.index + 1

      if (!this.done && isLineBreak2(char, this.s[this.index]!)) {
        this.index = this.index + 1
      }

      if (!this.stripped) {
        end = this.index
      }
    }

    return { done: false, value: this.s.substring(start, end) }
  }

  [Symbol.iterator](): IterableIterator<string> {
    return new LinesIterator(this.s, this.stripped)
  }

  private get done(): boolean {
    return this.index >= this.length
  }
}

/**
 * Test if the provided character is a line break character (i.e. either `"\r"`
 * or `"\n"`).
 */
function isLineBreak(char: string): boolean {
  const code = char.charCodeAt(0)
  return code === CR || code === LF
}

/**
 * Test if the provided characters combine to form a carriage return/line-feed
 * (i.e. `"\r\n"`).
 */
function isLineBreak2(char0: string, char1: string): boolean {
  return char0.charCodeAt(0) === CR && char1.charCodeAt(0) === LF
}

function linesSeparated(self: string, stripped: boolean): LinesIterator {
  return new LinesIterator(self, stripped)
}
