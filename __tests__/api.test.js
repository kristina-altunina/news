const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');


afterAll(() => {
    return connection.end();
});

beforeEach(() => {
    return seed(testData);
});

describe('GET/api/topics', () => {
    it('200: responds with a status of 200', () => {
        return request(app).get('/api/topics').expect(200);
    });

    it('200: returns an array of topic objects with properties of slug and description', () => {
        return request(app)
        .get('/api/topics')
        .then((response) => {
        expect(response.body).toHaveLength(3);
        response.body.forEach((topic) => {
            expect(topic).toHaveProperty('description', expect.any(String));
            expect(topic).toHaveProperty('slug', expect.any(String));
        });
        });
    });
});


describe('GET/api', () => {
    it('200: responds with all endpoints available', () => {
        return request(app).get('/api')
        .then((response) => {
        expect(response.status).toBe(200);
        })   
    });
});
