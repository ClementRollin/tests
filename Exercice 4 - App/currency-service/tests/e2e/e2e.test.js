const request = require('supertest');
const app = require('../../src/index');

describe('E2E tests - scénario complet', () => {
    test('convert puis calculer TVA', async () => {
        const res1 = await request(app).get('/convert?from=EUR&to=USD&amount=100');
        const usdAmount = res1.body.convertedAmount;

        const res2 = await request(app).get(`/tva?ht=${usdAmount}&taux=20`);
        expect(res2.body.ttc).toBe(Number((usdAmount * 1.2).toFixed(2)));
    });
});