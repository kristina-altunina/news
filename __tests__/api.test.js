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

    it('200: responds with a single topic with slug', () => {
        return request(app)
        .get('/api/topics/cats')
        .then((response) => {    
            expect(response.body).toHaveLength(1);
            const topic = response.body[0];
            expect(topic.slug).toBe('cats')
        });
    });

    it('400: responds with an error message if not a valid slug', () => {
        return request(app).
        get('/api/topics/1')
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        });
    });

    it('404: responds with an error message if the topic is doesn\'t exist', () => {
        return request(app).
        get('/api/topics/abc')
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('404: Not Found')
        });
    });
});