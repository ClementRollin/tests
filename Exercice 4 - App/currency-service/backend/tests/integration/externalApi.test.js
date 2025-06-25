const nock = require('nock');
const { convertCurrency } = require('../../src/services/financialService');

describe('Integration tests - external rate API mock', () => {
    beforeAll(() => {
        nock('https://fake-external-api.com')
            .get('/rate')
            .query({ from: 'EUR', to: 'USD' })
            .reply(200, { rate: 1.1 });
    });

    test('convert using external API mock', async () => {
        // Suppose convertCurrency internally appelait l'API externe via axios
        // Ici on teste le mock (adapter selon implémentation réelle)
        expect(convertCurrency('EUR', 'USD', 10)).toBe(11);
    });
});