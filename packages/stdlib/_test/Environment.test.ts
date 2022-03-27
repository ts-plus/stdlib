import { Service } from "@tsplus/stdlib/data/Environment";
import { Option } from "@tsplus/stdlib/data/Option";
import { assert, describe, it } from "vitest";

describe("Environment", () => {
  it("merges services", () => {
    const makeServiceA = {
      a: 0
    };
    interface ServiceA extends Service.From<typeof makeServiceA> {}
    const ServiceA = Service<ServiceA>(Symbol());

    const makeServiceB = Option({
      b: 0
    });
    interface ServiceB extends Service.From<typeof makeServiceB> {}
    const ServiceB = Service<ServiceB>(Symbol());

    const merged: Service.All<[
      ServiceA,
      ServiceB
    ]> = ServiceA(makeServiceA) & ServiceB(makeServiceB.value!);

    assert.isTrue(ServiceA.in(merged));
    assert.isFalse(ServiceA.in({}));
    assert.isTrue(ServiceB.in(merged));
    assert.strictEqual(ServiceA.get(merged).a, 0);
    assert.strictEqual(ServiceB.get(merged).b, 0);
  });
});
