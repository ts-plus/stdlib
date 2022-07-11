/*
  Original MT19937 license:

  A C-program for MT19937, with initialization improved 2002/1/26.
  Coded by Takuji Nishimura and Makoto Matsumoto.

  Before using, initialize the state by using init_genrand(seed)
  or init_by_array(init_key, key_length).

  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

    1. Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.

    2. Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

    3. The names of its contributors may not be used to endorse or promote
      products derived from this software without specific prior written
      permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
  "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
  LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
  A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


  Any feedback is very welcome.
  http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
  email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/
import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

const N = 624
const M = 397
const UPPER_MASK = 0x80000000
const LOWER_MASK = 0x7fffffff
const MATRIX_A = 0x9908b0df

export class MersenneTwister implements RandomGenerator {
  private mt: Array<number>
  private mti: number

  constructor(seed?: number) {
    this.mt = new Array(N)
    this.mti = N + 1
    this.setSeed(seed ?? Date.now())
  }

  setSeed(seed: number) {
    let s: number

    this.mt[0] = seed >>> 0

    for (this.mti = 1; this.mti < N; this.mti++) {
      s = this.mt[this.mti - 1]! ^ (this.mt[this.mti - 1]! >>> 30)
      this.mt[this.mti] = ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253 + this.mti
      this.mt[this.mti] >>>= 0
    }
  }

  seedArray(vector: ReadonlyArray<number>) {
    let i = 1,
      j = 0,
      k = N > vector.length ? N : vector.length,
      s: number

    this.setSeed(19650218)

    for (; k > 0; k--) {
      s = this.mt[i - 1]! ^ (this.mt[i - 1]! >>> 30)

      this.mt[i] = (this.mt[i]! ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + (s & 0x0000ffff) * 1664525)) +
        vector[j]! + j
      this.mt[i] >>>= 0
      i++
      j++
      if (i >= N) {
        this.mt[0] = this.mt[N - 1]!
        i = 1
      }
      if (j >= vector.length) {
        j = 0
      }
    }

    for (k = N - 1; k; k--) {
      s = this.mt[i - 1]! ^ (this.mt[i - 1]! >>> 30)
      this.mt[i] = (this.mt[i]! ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) -
        i
      this.mt[i] >>>= 0
      i++
      if (i >= N) {
        this.mt[0] = this.mt[N - 1]!
        i = 1
      }
    }

    this.mt[0] = 0x80000000
  }

  next() {
    let y: number,
      kk: number,
      // eslint-disable-next-line prefer-const
      mag01: [number, number] = [0, MATRIX_A]

    if (this.mti >= N) {
      if (this.mti === N + 1) {
        this.setSeed(5489)
      }

      for (kk = 0; kk < N - M; kk++) {
        y = (this.mt[kk]! & UPPER_MASK) | (this.mt[kk + 1]! & LOWER_MASK)
        this.mt[kk] = this.mt[kk + M]! ^ (y >>> 1) ^ mag01[y & 1]!
      }

      for (; kk < N - 1; kk++) {
        y = (this.mt[kk]! & UPPER_MASK) | (this.mt[kk + 1]! & LOWER_MASK)
        this.mt[kk] = this.mt[kk + (M - N)]! ^ (y >>> 1) ^ mag01[y & 1]!
      }

      y = (this.mt[N - 1]! & UPPER_MASK) | (this.mt[0]! & LOWER_MASK)
      this.mt[N - 1] = this.mt[M - 1]! ^ (y >>> 1) ^ mag01[y & 1]!
      this.mti = 0
    }

    y = this.mt[this.mti++]!

    y ^= y >>> 11
    y ^= (y << 7) & 0x9d2c5680
    y ^= (y << 15) & 0xefc60000
    y ^= y >>> 18

    return y >>> 0
  }

  min(): number {
    return 0
  }

  max(): number {
    return 0xffffffff
  }
}
