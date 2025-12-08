const request = require('supertest');
const app = require('./server');

describe('Health Endpoint', () => {
    it('should return 200 and healthy: true', async () => {
        const response = await request(app).get('/health');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ healthy: true });
    });
});

describe('Status Endpoint', () => {
    it('should return 200 with correct structure', async () => {
        const response = await request(app).get('/status');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'ok');
        expect(response.body).toHaveProperty('service', 'devops-assignment');
        expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid ISO timestamp', async () => {
        const response = await request(app).get('/status');
        const timestamp = new Date(response.body.timestamp);

        expect(timestamp.toISOString()).toBe(response.body.timestamp);
    });
});