import { Assert, AssertionError } from "../index.js";

class CustomError extends Error {}
class AnotherError extends Error {}

export class AssertRejectsTests {
	async rejects_shouldPass_ifPromiseRejects() {
		await Assert.rejects(() => Promise.reject(new Error("fail")));
	}

	async rejects_shouldPass_ifPromiseRejectsWithExpectedType() {
		await Assert.rejects(() => Promise.reject(new CustomError("fail")), CustomError);
	}

	async rejects_shouldFail_ifPromiseResolves() {
		try {
			await Assert.rejects(() => Promise.resolve("ok"));
			Assert.fail("Expected assertion to fail, but it passed.");
		}
		catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}

	async rejects_shouldFail_ifErrorTypeMismatch() {
		try {
			await Assert.rejects(() => Promise.reject(new AnotherError("fail")), CustomError);
			Assert.fail("Expected assertion to fail, but it passed.");
		}
		catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}

	async notRejects_shouldPass_ifPromiseResolves() {
		await Assert.notRejects(() => Promise.resolve("ok"));
	}

	async notRejects_shouldPass_ifPromiseRejectsWithUnexpectedType() {
		await Assert.notRejects(() => Promise.reject(new AnotherError("fail")), CustomError);
	}

	async notRejects_shouldFail_ifPromiseRejects() {
		try {
			await Assert.notRejects(() => Promise.reject(new Error("fail")));
			Assert.fail("Expected assertion to fail, but it passed.");
		}
		catch (e) {
			Assert.equal(e instanceof AssertionError, true);
		}
	}

	async notRejects_shouldFail_ifPromiseRejectsWithExpectedType() {
		try {
			await Assert.notRejects(() => Promise.reject(new CustomError("fail")), CustomError);
			Assert.fail("Expected assertion to fail, but it passed.");
		}
		catch (error) {
			Assert.equal(error instanceof AssertionError, true);
		}
	}
}