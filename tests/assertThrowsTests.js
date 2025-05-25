import { Assert, AssertionError } from "../index.js";

class CustomError extends Error {}
class AnotherError extends Error {}

export class AssertThrowsTests {
	throws_shouldPass_ifFunctionThrows() {
		Assert.throws(() => { throw new Error("fail"); });
	}

	throws_shouldPass_ifFunctionThrowsExpectedType() {
		Assert.throws(() => { throw new CustomError("fail"); }, CustomError);
	}

	throws_shouldFail_ifFunctionDoesNotThrow() {
		try {
			Assert.throws(() => { });
			Assert.fail("Expected assertion to fail, but it passed.");
		}
        catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}

	throws_shouldFail_ifFunctionThrowsWrongType() {
		try {
			Assert.throws(() => { throw new AnotherError("fail"); }, CustomError);
			Assert.fail("Expected assertion to fail, but it passed.");
		}
        catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}

	notThrows_shouldPass_ifFunctionDoesNotThrow() {
		Assert.notThrows(() => {});
	}

	notThrows_shouldPass_ifFunctionThrowsUnexpectedType() {
		Assert.notThrows(() => { throw new AnotherError("fail"); }, CustomError);
	}

	notThrows_shouldFail_ifFunctionThrows() {
		try {
			Assert.notThrows(() => { throw new Error("fail"); });
			Assert.fail("Expected assertion to fail, but it passed.");
		}
        catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}

	notThrows_shouldFail_ifFunctionThrowsExpectedType() {
		try {
			Assert.notThrows(() => { throw new CustomError("fail"); }, CustomError);
			Assert.fail("Expected assertion to fail, but it passed.");
		}
        catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}
}