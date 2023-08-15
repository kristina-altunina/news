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
        const body = response.body
        expect(body.topics).toHaveLength(3);
        body.topics.forEach((topic) => {
            expect(topic).toHaveProperty('description', expect.any(String));
            expect(topic).toHaveProperty('slug', expect.any(String));
        });
        });
    });
});


describe('GET/api', () => {
    it('200: responds with all endpoints available', () => {
        return request(app).get('/api').expect(200);
        })   
    });


describe('GET/api/articles/:article_id', () => {
    it('200: responds with an article object', () => {
        return request(app).get('/api/articles/1').expect(200);
        });   

    it('200: responds with an article object with id of 1', () => {
        return request(app).get('/api/articles/1')
        .then((response) => {
            const article = response.body.article;
            expect(article).toHaveProperty('author', expect.any(String));
            expect(article).toHaveProperty('title', expect.any(String));
            expect(article).toHaveProperty('article_id', expect.any(Number));
            expect(article).toHaveProperty('body', expect.any(String));
            expect(article).toHaveProperty('topic', expect.any(String));
            expect(article).toHaveProperty('created_at', expect.any(String));
            expect(article).toHaveProperty('votes', expect.any(Number));
            expect(article).toHaveProperty('article_img_url', expect.any(String));
        })
    });

    it('400: responds with an error message when passed an article_id that is not accepted ', () => {
        return request(app).get('/api/articles/hello')
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(400)
            expect(body.message).toBe('400: Bad Request')
        })
    });


    it('404: responds with an error message when passed an article_id that does not exist', () => {
        return request(app).get('/api/articles/1000')
        .expect(404)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(404)
            expect(body.message).toBe('404: Not Found')
        })
    });
});

describe('GET/api/articles', () => {
    it('200: responds with a status of 200', () => {
        return request(app).get('/api/articles').expect(200);
    });

    it('200: returns an array of article objects', () => {
        return request(app)
        .get('/api/articles')
        .then((response) => {
        const body = response.body
        const article = body.articles[0]
        expect(article).toHaveProperty('author', expect.any(String));
        expect(article).toHaveProperty('title', expect.any(String));
        expect(article).toHaveProperty('article_id', expect.any(Number));
        expect(article).toHaveProperty('topic', expect.any(String));
        expect(article).toHaveProperty('created_at', expect.any(String));
        expect(article).toHaveProperty('votes', expect.any(Number));
        expect(article).toHaveProperty('article_img_url', expect.any(String));
        expect(article).toHaveProperty('comment_count', expect.any(Number));
        });
    });
 });
