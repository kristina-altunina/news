const express = require('express');
const { getAllTopics } = require('./controllers/topics-controller');
const { availableEndpoints } = require('./controllers/endpoint-controller');
const { getArticle } = require('./controllers/articles-controller');
const { getAllComments } = require('./controllers/comments-controller');
const app = express();

app.use('/api/articles/:article_id/comments', getAllComments);
app.use('/api/articles/:article_id', getArticle);
app.use('/api/topics', getAllTopics);
app.use('/api', availableEndpoints);


app.use((err, request, response, next) => {
  
  if (err.status === 400 || err.code === '22P02') {
    response.status(400).send({ message: '400: Bad Request' });
  } else if (err.status === 404) {
  response.status(404).send({ message: '404: Not Found' });
  } else {
  response.status(500).send({ message: '500: Internal Server Error' });
  }
  });


  module.exports = app;