// forked from https://github.com/frptools

// Copyright 2014 Thom Chiovoloni, released under the MIT license.

/// A random number generator based on the basic implementation of the PCG algorithm,
/// as described here: http://www.pcg-random.org/

// Adapted for TypeScript from Thom's original code at https://github.com/thomcc/pcg-random

export function isNothing<T>(value: T | null | undefined) {
  return value === void 0 || value === null;
}

const defaultIncHi = 0x14057b7e;
const defaultIncLo = 0xf767814f;
const MUL_HI = 0x5851f42d >>> 0;
const MUL_LO = 0x4c957f2d >>> 0;
const BIT_53 = 9007199254740992.0;
const BIT_27 = 134217728.0;

export type PCGRandomState = [number, number, number, number];
export type OptionalNumber = number | null | undefined;

export class RandomPCG {
  private _state: Int32Array;
  constructor(seed?: OptionalNumber);
  constructor(seedHi: OptionalNumber, seedLo: OptionalNumber, inc?: OptionalNumber);
  constructor(
    seedHi: OptionalNumber,
    seedLo: OptionalNumber,
    incHi: OptionalNumber,
    incLo: OptionalNumber
  );
  constructor(
    seedHi?: OptionalNumber,
    seedLo?: OptionalNumber,
    incHi?: OptionalNumber,
    incLo?: OptionalNumber
  ) {
    if (isNothing(seedLo) && isNothing(seedHi)) {
      seedLo = (Math.random() * 0xffffffff) >>> 0;
      seedHi = 0;
    } else if (isNothing(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNothing(incLo) && isNothing(incHi)) {
      // @ts-expect-error
      incLo = this._state ? this._state[3] : defaultIncLo;
      // @ts-expect-error
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNothing(incLo)) {
      incLo = <number> incHi;
      incHi = 0;
    }

    this._state = new Int32Array([
      0,
      0,
      (<number> incHi) >>> 0,
      ((incLo || 0) | 1) >>> 0
    ]);
    this._next();
    add64(
      this._state,
      this._state[0]!,
      this._state[1]!,
      (<number> seedHi) >>> 0,
      (<number> seedLo) >>> 0
    );
    this._next();
    return this;
  }

  getState(): PCGRandomState {
    return [this._state[0]!, this._state[1]!, this._state[2]!, this._state[3]!];
  }

  setState(state: PCGRandomState) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }

  private _next() {
    const oldHi = this._state[0]! >>> 0;
    const oldLo = this._state[1]! >>> 0;

    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(
      this._state,
      this._state[0]!,
      this._state[1]!,
      this._state[2]!,
      this._state[3]!
    );

    let xsHi = oldHi >>> 18;
    let xsLo = ((oldLo >>> 18) | (oldHi << 14)) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = ((xsLo >>> 27) | (xsHi << 5)) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = ((-rot >>> 0) & 31) >>> 0;
    return ((xorshifted >>> rot) | (xorshifted << rot2)) >>> 0;
  }

  integer(max: number) {
    if (!max) {
      return this._next();
    }
    max = max >>> 0;
    if ((max & (max - 1)) === 0) {
      return this._next() & (max - 1);
    }

    let num = 0;
    const skew = (-max >>> 0) % max >>> 0;
    for (num = this._next(); num < skew; num = this._next()) {
      //
    }
    return num % max;
  }

  number() {
    const hi = (this._next() & 0x03ffffff) * 1.0;
    const lo = (this._next() & 0x07ffffff) * 1.0;
    return (hi * BIT_27 + lo) / BIT_53;
  }
}

function mul64(
  out: Int32Array,
  aHi: number,
  aLo: number,
  bHi: number,
  bLo: number
): void {
  let c1 = ((aLo >>> 16) * (bLo & 0xffff)) >>> 0;
  let c0 = ((aLo & 0xffff) * (bLo >>> 16)) >>> 0;

  let lo = ((aLo & 0xffff) * (bLo & 0xffff)) >>> 0;
  let hi = ((aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16))) >>> 0;

  c0 = (c0 << 16) >>> 0;
  lo = (lo + c0) >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = (hi + 1) >>> 0;
  }

  c1 = (c1 << 16) >>> 0;
  lo = (lo + c1) >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = (hi + 1) >>> 0;
  }

  hi = (hi + Math.imul(aLo, bHi)) >>> 0;
  hi = (hi + Math.imul(aHi, bLo)) >>> 0;

  out[0] = hi;
  out[1] = lo;
}

function add64(
  out: Int32Array,
  aHi: number,
  aLo: number,
  bHi: number,
  bLo: number
): void {
  let hi = (aHi + bHi) >>> 0;
  const lo = (aLo + bLo) >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = (hi + 1) | 0;
  }
  out[0] = hi;
  out[1] = lo;
}
