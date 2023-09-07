const express = require('express');
const cors = require('cors');
const { getAllTopics } = require('./controllers/topics-controller');
const { availableEndpoints } = require('./controllers/endpoint-controller');
const { getArticle, getArticles, patchArticle } = require('./controllers/articles-controller');
const { getAllComments, postComment, deleteComment } = require('./controllers/comments-controller');
const { handle400s } = require('./controllers/error-controller')
const app = express();

app.use(cors());

app.use(express.json());

app.patch('/api/articles/:article_id', patchArticle);
app.post('/api/articles/:article_id/comments', postComment);
app.get('/api/articles/:article_id/comments', getAllComments);
app.delete('/api/comments/:comment_id', deleteComment);
app.get('/api/articles/:article_id', getArticle);
app.use('/api/articles', getArticles);
app.use('/api/topics', getAllTopics);
app.use('/api', availableEndpoints);

app.use(handle400s);

app.use((err, request, response, next) => {
  
  if (err.status === 400) {
    response.status(400).send({ message: '400: Bad Request' });
  } else if (err.status === 404) {
  response.status(404).send({ message: '404: Not Found' });
  } else {
  response.status(500).send({ message: '500: Internal Server Error' });
  }
  });




  module.exports = app;