import { Assert } from "../index.js";

export class AssertInstanceTests {
    instanceOf_shouldPass_forCorrectInstance() {
        Assert.instanceOf(new Date(), Date);
    }

    instanceOf_shouldFail_forIncorrectInstance() {
        Assert.throws(() => Assert.instanceOf({}, Date));
    }

    notInstanceOf_shouldPass_forIncorrectInstance() {
        Assert.notInstanceOf({}, Date);
    }

    notInstanceOf_shouldFail_forCorrectInstance() {
        Assert.throws(() => Assert.notInstanceOf(new Date(), Date));
    }
}
