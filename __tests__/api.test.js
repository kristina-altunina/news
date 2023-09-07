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

    it('400: responds with an error message when passed an article_id that is invalid', () => {
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
        expect(article).toHaveProperty('comment_count', expect.any(String));
        expect(article).not.toHaveProperty('body');
    });
});
});


describe('GET/api/articles/:article_id/comments', () => {
    it('200: responds with status 200', () => {
        return request(app).get('/api/articles/1/comments').expect(200);
    });   

    it('200: returns an array of comments for an article with id of 1', () => {
        return request(app)
        .get('/api/articles/1/comments')
        .then((response) => {
        const body = response.body
        const comment = body.comments[0]
        expect(comment.comment_id).toBe(5);
        expect(comment.votes).toBe(0);
        expect(comment.created_at).toBe('2020-11-03T21:00:00.000Z');
        expect(comment.author).toBe('icellusedkars');
        expect(comment.body).toBe('I hate streaming noses');
        expect(comment.article_id).toBe(1);
    });
    });

    it('200: returns an empty array of comments for a valid article', () => {
        return request(app)
        .get('/api/articles/4/comments')
        .then((response) => {
        const body = response.body
        expect(body.comments).toEqual([])
    });
    });


    it('400: responds with an error message when passed an invalid article_id', () => {
        return request(app).get('/api/articles/hhhhh/comments')
        .expect(400)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(400)
            expect(body.message).toBe('400: Bad Request')
        })
    });


    it('404: responds with an error message when passed an article_id that does not exist', () => {
        return request(app).get('/api/articles/1000/comments')
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
            username: "butter_bridge",
            body: "Hello"
        };

        return request(app).post('/api/articles/4/comments').send(newComment)
        .expect(201);
    });
    
    it('201: responds with a comment object that has been sent', () => {
        const newComment = {
            username: "butter_bridge",
            body: "Hello",
            someProperty: "someValue"
        };

        return request(app).post('/api/articles/4/comments').send(newComment)
        .expect(201)
        .then((response) => {
            const {comment} = response.body;
            expect(comment.author).toEqual(newComment.username);
            expect(comment.body).toEqual(newComment.body);
            expect(comment.votes).toEqual(0);
            expect(comment.created_at).not.toBe("");
            expect(comment.comment_id).not.toBe(0);
        })
    });

    it('400: responds with an error message if username or body is missing', () => {
        const invalidComment = {
            username: "butter_bridge"
        };
        
        return request(app).post('/api/articles/4/comments').send(invalidComment)
        .expect(400)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        })
    });

    it('400: responds with an error message if username is empty', () => {
        const invalidComment = {
            username: "",
            body: "Hello"
        };
        
        return request(app).post('/api/articles/4/comments').send(invalidComment)
        .expect(400)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        })
    });

    it('400: responds with an error message when adding a comment into an invalid article', () => {
        const newComment = {
            username: "butter_bridge",
            body: "Hello"
        };
        
        return request(app).post('/api/articles/hhhh/comments').send(newComment)
        .expect(400)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('400: Bad Request')
        })
    });

    it('404: responds with an error message when adding a comment into an article that does not exist', () => {
        const newComment = {
            username: "butter_bridge",
            body: "Hello"
        };
        
        return request(app).post('/api/articles/1000/comments').send(newComment)
        .expect(404)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('404: Not Found')
        })
    });

    it('404: responds with an error message if username doesn\'t exist', () => {
        const newComment = {
            username: "kristina",
            body: "Hello"
        };
        
        return request(app).post('/api/articles/4/comments').send(newComment)
        .expect(404)
        .then((response) => {
            const {message} = response.body;
            expect(message).toBe('404: Not Found')
        })
    });
});

describe('PATCH /api/articles/:article_id', () => {
    it('200: responds with the updated article', () => {
        const newVote = { inc_votes: 5 };

        return request(app).patch('/api/articles/1').send(newVote)
        
        .then((response) => {
        const {article} = response.body
            expect(article).toHaveProperty("title", "Living in the shadow of a great man");
            expect(article).toHaveProperty("topic", "mitch");
            expect(article).toHaveProperty("body", "I find this existence challenging");
            expect(article).toHaveProperty("created_at", "2020-07-09T20:11:00.000Z");
            expect(article).toHaveProperty("votes", 105);
            expect(article).toHaveProperty("article_img_url", "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",);
        })
    });

    it('200: responds with the updated article when passing a decremented vote', () => {
        const newVote = { inc_votes: -1 };

        return request(app).patch('/api/articles/1').send(newVote)
        
        .then((response) => {
        const {article} = response.body
            expect(article).toHaveProperty("title", "Living in the shadow of a great man");
            expect(article).toHaveProperty("topic", "mitch");
            expect(article).toHaveProperty("body", "I find this existence challenging");
            expect(article).toHaveProperty("created_at", "2020-07-09T20:11:00.000Z");
            expect(article).toHaveProperty("votes", 99);
            expect(article).toHaveProperty("article_img_url", "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",);
        })
    });

    it('400: responds with an error message when passed an invalid vote', () => {
        const invalidVote = { inc_votes: "h" }

        return request(app).patch('/api/articles/1').send(invalidVote)
        .expect(400)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(400)
            expect(body.message).toBe('400: Bad Request')
        })
    });

    it('400: responds with an error message when passed an invalid article_id', () => {
        const newVote = { inc_votes: 5 }

        return request(app).patch('/api/articles/hhhhh').send(newVote)
        .expect(400)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(400)
            expect(body.message).toBe('400: Bad Request')
        })
    });

    it('404: responds with an error message when passed an article that does not exist', () => {
        const newVote = { inc_votes: 5 };
        
        return request(app).patch('/api/articles/1000').send(newVote)
        .expect(404)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(404)
            expect(body.message).toBe('404: Not Found')
        })
    });
});


describe('DELETE /api/comments/:comment_id', () => {
    it('204: responds with status 204 and no content', () => {
        return request(app).delete('/api/comments/1').expect(204)
    });   

    it('400: responds with an error message when passed an invalid comment_id', () => {
        return request(app).delete('/api/comments/hhhhh')
        .expect(400)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(400)
            expect(body.message).toBe('400: Bad Request')
        })
    });

    it('404: responds with an error message if the comment does not exist', () => {
        return request(app).delete('/api/comments/9876')
        .expect(404)
        .then((result) => {
            const {body} = result
            expect(result.status).toBe(404)
            expect(body.message).toBe('404: Not Found')
        })
    });
});
