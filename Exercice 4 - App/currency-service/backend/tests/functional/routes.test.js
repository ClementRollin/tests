const request = require('supertest');
const app = require('../../src');

describe('Functional tests - API routes', () => {
    test('/convert route', async () => {
        const res = await request(app).get('/convert?from=EUR&to=USD&amount=100');
        expect(res.status).toBe(200);
        expect(res.body.convertedAmount).toBe(110);
    });
    test('/tva route', async () => {
        const res = await request(app).get('/tva?ht=100&taux=20');
        expect(res.status).toBe(200);
        expect(res.body.ttc).toBe(120);
    });
    test('/remise route', async () => {
        const res = await request(app).get('/remise?prix=100&pourcentage=10');
        expect(res.status).toBe(200);
        expect(res.body.prixFinal).toBe(90);
    });
});