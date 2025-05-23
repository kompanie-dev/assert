import { AssertionError } from "./assertionError.js";

export class Assert {
	static fail(message = "The code reached a fail condition") {
		throw new AssertionError(message);
	}

	// Numbers
	static approximately(actual, expected, tolerance) {
		if (Math.abs(actual - expected) > tolerance) {
			throw new AssertionError(`Expected approximately ${expected} ±${tolerance}, but got ${actual}`);
		}
	}

	static isAbove(actual, value) {
		if (actual <= value) {
			throw new AssertionError(`Expected above ${value}, but got ${actual}`);
		}
	}

	static isBelow(actual, value) {
		if (actual >= value) {
			throw new AssertionError(`Expected below ${value}, but got ${actual}`);
		}
	}

	static isBetween(actual, min, max) {
		if (actual < min || actual > max) {
			throw new AssertionError(`Expected between ${min} and ${max}, but got ${actual}`);
		}
	}

	// Equality
	static equal(actual, expected) {
		if (actual !== expected) {
			throw new AssertionError(`Expected ${expected}, but got ${actual}`);
		}
	}

	static notEqual(actual, expected) {
		if (actual === expected) {
			throw new AssertionError(`Expected not equal to ${expected}`);
		}
	}

	// Deep Equal
	static deepEqual(actual, expected) {
		if (Assert.#isDeepEqual(actual, expected) === false) {
			throw new AssertionError(`Expected ${expected} to be deep equal to ${actual}`);
		}
	}

	static notDeepEqual(actual, expected) {
		if (Assert.#isDeepEqual(actual, expected) === true) {
			throw new AssertionError(`Expected not value not deep equal to ${expected}`);
		}
	}

	static #isDeepEqual(objectA, objectB) {
		if (objectA === objectB) {
			return true;
		}

		if (typeof objectA !== "object" || typeof objectB !== "object" || objectA === null || objectB === null) {
			return false;
		}

		const propertyNamesA = Object.keys(objectA);
		const propertyNamesB = Object.keys(objectB);

		if (propertyNamesA.length !== propertyNamesB.length) {
			return false;
		}

		return propertyNamesA.every(
			propertyName => Assert.#isDeepEqual(objectA[propertyName], objectB[propertyName])
		);
	}

	// Include
	static include(haystack, needle) {
		if (Array.isArray(haystack)) {
			if (haystack.includes(needle) === false) {
				throw new AssertionError(`Expected array "${haystack.toString()}" to include ${needle}`);
			}
		}
		else if (typeof haystack === "string") {
			if (haystack.indexOf(needle) === -1) {
				throw new AssertionError(`Expected string "${haystack}" to include "${needle}"`);
			}
		}
		else {
			throw new TypeError(`Unsupported haystack type ${typeof haystack}`);
		}
	}

	static notInclude(haystack, needle) {
		if (Array.isArray(haystack)) {
			if (haystack.includes(needle) === true) {
				throw new AssertionError(`Expected array "${haystack.toString()}" to not include ${needle}`);
			}
		}
		else if (typeof haystack === "string") {
			if (haystack.indexOf(needle) !== -1) {
				throw new AssertionError(`Expected string "${haystack}" to not include "${needle}"`);
			}
		}
		else {
			throw new TypeError(`Unsupported haystack type ${typeof haystack}`);
		}
	}

	// Instances
	static instanceOf(actual, type) {
		if (!(actual instanceof type)) {
			throw new AssertionError(`Expected instance of ${type.name}, but got ${actual.name}`);
		}
	}

	static notInstanceOf(actual, type) {
		if (actual instanceof type) {
			throw new AssertionError(`Expected not instance of ${type.name}`);
		}
	}

	// Regex
	static #isRegexString(actual) {
		if (typeof actual !== "string") {
			throw new AssertionError(`Expected ${actual} to be type of String, but got ${typeof actual}. Only strings are supported in match().`);
		}
	}

	static match(actual, regex) {
		Assert.#isRegexString(actual);

		if (regex.test(actual) === false) {
			throw new AssertionError(`Expected ${actual} to match Regex ${regex}`);
		}
	}

	static notMatch(actual, regex) {
		Assert.#isRegexString(actual);

		if (regex.test(actual)) {
			throw new AssertionError(`Expected ${actual} to not match Regex ${regex}`);
		}
	}

	// NaN
	static isNaN(actual) {
		if (!Number.isNaN(actual)) {
			throw new AssertionError(`Expected NaN, but got ${actual}`);
		}
	}

	static isNotNaN(actual) {
		if (Number.isNaN(actual)) {
			throw new AssertionError(`Expected not NaN`);
		}
	}

	// Rejects
	static async rejects(fn, expectedErrorType) {
		try {
			await fn();
		}
		catch (error) {
			if (expectedErrorType !== undefined && (error instanceof expectedErrorType) === false) {
				throw new AssertionError(`Expected error to be type of ${expectedErrorType.constructor.name}, but got ${error.constructor.name}`);
			}

			return;
		}

		throw new AssertionError(`Expected promise to reject`);
	}

	static async notRejects(fn, expectedErrorType) {
		try {
			await fn();
		}
		catch (error) {
			if (expectedErrorType === undefined) {
				throw new AssertionError(`Expected promise to fulfill, but it rejected with: ${typeof error}`);
			}
			else if (error instanceof expectedErrorType) {
				throw new AssertionError(`Expected promise to not throw an error of type ${typeof expectedErrorType}`);
			}
		}
	}

	// Type checks
	static typeOf(object, type) {
		if (typeof object !== type) {
			throw new AssertionError(`Expected type ${type}, but got ${typeof object}`);
		}
	}

	static notTypeOf(object, type) {
		if (typeof object === type) {
			throw new AssertionError(`Expected not type ${type}`);
		}
	}

	// Throws
	static throws(fn, expectedErrorType) {
		try {
			fn();
		}
		catch (error) {
			if (expectedErrorType !== undefined && (error instanceof expectedErrorType) === false) {
				throw new AssertionError(`Expected error to be type of ${typeof expectedErrorType}, but got ${typeof error}`);
			}

			return;
		}

		throw new AssertionError("Expected an error, but none was thrown");
	}

	static notThrows(fn, expectedErrorType) {
		try {
			fn();
		}
		catch (error) {
			if (expectedErrorType === undefined) {
				throw new AssertionError(`Expected no error, but got ${typeof error}`);
			}
			else if (error instanceof expectedErrorType) {
				throw new AssertionError(`Expected to not throw an error of type ${typeof expectedErrorType}`);
			}
		}
	}

	// Undefined or null
	static isUndefinedOrNull(actual) {
		if (actual !== undefined && actual !== null) {
			throw new AssertionError(`Expected undefined or null, but got ${actual}`);
		}
	}

	static isNotUndefinedOrNull(actual) {
		if (actual === undefined || actual === null) {
			throw new AssertionError(`Expected not undefined or null`);
		}
	}
}
