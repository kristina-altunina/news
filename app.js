const express = require('express');
const { getAllTopics } = require('./controllers/topics-controller');
const app = express();

app.use('/api/topics', getAllTopics);

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