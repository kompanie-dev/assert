import { Assert } from "../index.js";

export class AssertIncludeTests {
	include_shouldPass_whenArrayIncludesNeedle() {
		Assert.notThrows(() => Assert.include([1, 2, 3], 2));
	}

	include_shouldThrow_whenArrayDoesNotIncludeNeelde() {
		Assert.throws(() => Assert.include([1, 2, 3], 4));
	}

	include_shouldPass_whenStringIncludesNeedle() {
		Assert.notThrows(() => Assert.include("hello world", "world"));
	}

	include_shouldThrow_whenStringDoesNotIncludeNeelde() {
		Assert.throws(() => Assert.include("hello world", "foo"));
	}

	include_shouldThrow_whenUnsupportedHackstackIsGiven() {
		Assert.throws(() => Assert.include(123, 2));
	}

	notInclude_shouldPass_whenArrayDoesNotIncludeNeedle() {
		Assert.notThrows(() => Assert.notInclude([1, 2, 3], 4));
	}

	notInclude_shouldThrow_whenArrayIncludesNeedle() {
		Assert.throws(() => Assert.notInclude([1, 2, 3], 2));
	}

	notInclude_shouldPass_whenStringDoesNotIncludeNeedle() {
		Assert.notThrows(() => Assert.notInclude("hello world", "foo"));
	}

	notInclude_shouldThrow_whenStringIncludesNeedle() {
		Assert.throws(() => Assert.notInclude("hello world", "world"));
	}

	notInclude_shouldThrow_whenUnsupportedHackstackIsGiven() {
		Assert.throws(() => Assert.notInclude({ key: "value" }, "key"));
	}
}