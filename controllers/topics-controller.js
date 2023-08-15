const { selectTopics } = require('../models/topics-model');

const getAllTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics);  
    })
    .catch((err) => {
        next(err);
    });
};


module.exports = { getAllTopics };