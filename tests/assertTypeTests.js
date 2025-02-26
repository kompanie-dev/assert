import { Assert } from "../index.js";

export class AssertTypeTests {
    typeOf_shouldPass_forCorrectType() {
        Assert.typeOf("hello", "string");
    }

    typeOf_shouldFail_forIncorrectType() {
        Assert.throws(() => Assert.typeOf(123, "string"));
    }

    notTypeOf_shouldPass_forIncorrectType() {
        Assert.notTypeOf(123, "string");
    }

    notTypeOf_shouldFail_forCorrectType() {
        Assert.throws(() => Assert.notTypeOf("hello", "string"));
    }
}
