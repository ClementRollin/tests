const { convertCurrency, calculateTTC, applyDiscount } = require('../../src/services/financialService');

describe('Unit tests - financialService', () => {
    test('convert EUR to USD', () => expect(convertCurrency('EUR', 'USD', 100)).toBe(110));
    test('convert USD to GBP', () => expect(convertCurrency('USD', 'GBP', 50)).toBe(40));
    test('calculate TTC', () => expect(calculateTTC(100, 20)).toBe(120));
    test('apply discount', () => expect(applyDiscount(200, 10)).toBe(180));
    test('negative amount throws', () => expect(() => convertCurrency('EUR','USD',-1)).toThrow());
});