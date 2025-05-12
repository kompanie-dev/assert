import { Assert } from "../index.js";

export class AssertDeepEqualityTests {
    deepEqual_shouldPass_forDeeplyEqualObjects() {
        const objectA = { a: 1, b: { c: 2 } };
        const objectB = { a: 1, b: { c: 2 } };

        Assert.deepEqual(objectA, objectB);
    }

    deepEqual_shouldFail_forDifferentStructure() {
        const objectA = { a: 1, b: { c: 2 } };
        const objectB = { a: 1, b: { d: 2 } };

        Assert.throws(() => Assert.deepEqual(objectA, objectB));
    }

    deepEqual_shouldFail_forDifferentValues() {
        const objectA = { a: 1, b: { c: 2 } };
        const objectB = { a: 1, b: { c: 3 } };

        Assert.throws(() => Assert.deepEqual(objectA, objectB));
    }

    notDeepEqual_shouldPass_forDifferentObjects() {
        const objectA = { x: 1 };
        const objectB = { x: 2 };

        Assert.notDeepEqual(objectA, objectB);
    }

    notDeepEqual_shouldFail_forDeeplyEqualObjects() {
        const objectA = { foo: "bar", nested: { value: 42 } };
        const objectB = { foo: "bar", nested: { value: 42 } };

        Assert.throws(() => Assert.notDeepEqual(objectA, objectB));
    }

    deepEqual_shouldPass_forSameReference() {
        const obj = { shared: true };

        Assert.deepEqual(obj, obj);
    }

    notDeepEqual_shouldPass_forOneNullValue() {
        Assert.notDeepEqual(null, { a: 1 });
    }

    deepEqual_shouldFail_forOneNullValue() {
        Assert.throws(() => Assert.deepEqual(null, { a: 1 }));
    }
}