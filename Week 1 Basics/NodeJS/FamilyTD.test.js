const family = require('./FamilyTD')
describe('Family Tree Test Driven Development', () => {
    test('See If John is in the tree', () => {
        expect(family.john).toBeTruthy()
    }),
        test('Check if John has a name', () => {
            expect(family.john.name).toBe('John')
        }),
        test('Check if John has parents', () => {
            expect(family.john.parents).toBeTruthy()
        }),
        test("Output John's Parents Directly as an object", () => {
            expect(typeof family.john.parents).toBe('object')
        }),
        test("Output John's Parents Through A Function as a String", () => {
            expect(family.john.childOf()).toBe('Peter & May')
        }),
        test("Output John's Grandfather's Name, from Peter's Side", () => {
            expect(family.john.parents[0].parents[0].name).toBe('Richard')
        }),
        test("Should say John's Mother has no parents", () => {
            expect(family.john.parents[1].childOf()).toBe("Parents Unknown")
        })
})