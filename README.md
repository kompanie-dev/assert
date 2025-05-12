# Assert 🔍

A dependency-free, buildless assertion library for node.js and the browser.

## Getting Started

At first you need to install the package using the following command:

```console
npm i @kompanie/assert
```

## Usage

The first parameter is usually `actual` while the second parameter is `expected`.

Exceptions to this rule are:

* `Assert.fail()`
* `Assert.isNaN(actual)`
* `Assert.isNotNaN(actual)`
* `Assert.isBetween(actual, min, max)`
* `Assert.throws(fn)`
* `Assert.notThrows(fn)`
* `Assert.isUndefinedOrNull(actual)`
* `Assert.isNotUndefinedOrNull(actual)`

```js
// Equality
Assert.equal(5, 5);
Assert.notEqual(5, 10);

// Deep Equality
Assert.deepEqual({a: 5}, {a: 5});
Assert.notDeepEqual({a: 5}, {a: 10});

// Fail
Assert.fail();

// Instance
Assert.instanceOf(new Date(), Date);
Assert.notInstanceOf({}, Date);

// NaN
Assert.isNaN(NaN);
Assert.isNotNaN(123);

// Number
const tolerance = 0.1;
Assert.approximately(5.01, 5, tolerance);
Assert.isAbove(10, 5);
Assert.isBelow(3, 5);
Assert.isBetween(5, 1, 10);

// Regex
Assert.match("hello123", /hello\d+/u);
Assert.notMatch("hello", /world/u);

// Throws
Assert.throws(() => { throw new Error(); });
Assert.notThrows(() => {});

// Type
Assert.typeOf("hello", "string");
Assert.notTypeOf(123, "string");

// Undefined / Null
Assert.isUndefinedOrNull(null);
Assert.isNotUndefinedOrNull(123);
```

## Tests

This repository includes tests in the `tests` folder, which can be executed via `npm test` and opening the browser at [localhost:8000](http://localhost:8000/tests)
