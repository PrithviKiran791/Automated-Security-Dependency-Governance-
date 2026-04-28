const secureMerge = require('./index');

test('Properly merges two objects', () => {
    const obj1 = { a: 1 };
    const obj2 = { b: 2 };
    expect(secureMerge(obj1, obj2)).toEqual({ a: 1, b: 2 });
});