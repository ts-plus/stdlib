import { AtomicReference } from "@tsplus/stdlib/data/AtomicReference"

export class AtomicBoolean extends AtomicReference<boolean> {
  constructor(b: boolean) {
    super(b)
  }
}
