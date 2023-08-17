const app = require('../app');
const request = require('supertest');
const connection = require('../db/connection');
const { seed } = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');
const expectedEndpoints = require('../endpoints.json');

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

    it('200: responds with the expected JSON describing all available endpoints', () => {
        return request(app).get('/api')
        .then((response) => {
        expect(response.body['GET /api'].description).toBe('serves up a json representation of all the available endpoints of the api');
        expect(response.body['GET /api/topics'].description).toBe('serves an array of all topics');
        expect(response.body['GET /api/articles'].description).toBe('serves an array of all articles');
        })   
    });

    it('200: responds with the expected JSON describing all available endpoints', () => {
        return request(app).get('/api')
        .then((response) => {
        expect(response.body).toEqual(expectedEndpoints);
        })   
    });
});

describe('GET/api/articles/:article_id', () => {
    it('200: responds with status 200', () => {
        return request(app).get('/api/articles/1').expect(200);
    });   

    it('200: responds with an article object with id of 1', () => {
        return request(app).get('/api/articles/1')
        .then((response) => {
            const article = response.body.article
            expect(article.author).toBe("butter_bridge");
            expect(article.title).toBe("Living in the shadow of a great man");
            expect(article.article_id).toBe(1);
            expect(article.body).toBe("I find this existence challenging");
            expect(article.topic).toBe("mitch");
            expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
            expect(article.votes).toBe(100);
            expect(article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
        })
    });

    it('400: responds with an error message when passed an article_id that is not accepted', () => {
        return request(app).get('/api/articles/hello')
        .expect(400)
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


describe('POST /api/articles/:article_id/comments', () => {
    it('201: responds with a status of 201', () => {
        const newComment = {
            username: "kristina",
            body: "I love coffee"
        };

        return request(app).post('/api/articles/:article_id/comments').send(newComment)
        .expect(201);
    });
    
    it('201: responds with a comment object that has been sent', () => {
        const newComment = {
            username: "kristina",
            body: "I love coffee"
        };

        return request(app).post('/api/articles/:article_id/comments').send(newComment)
        .expect(201)
        .then((response) => {
            const {comment} = response.body;
            expect(comment).toEqual(newComment)
        })
    });

    it('400: responds with an error message if username or body is missing', () => {
        const invalidComment = {
            username: "kristina"
        };
        
        return request(app).post('/api/articles/:article_id/comments').send(invalidComment)
        .expect(400)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        })
    });

    it('400: responds with an error message if username or body is empty', () => {
        const invalidComment = {
            username: "",
            body: "I love coffee"
        };
        
        return request(app).post('/api/articles/:article_id/comments').send(invalidComment)
        .expect(400)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        })
    });
});
