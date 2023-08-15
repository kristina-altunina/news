const { selectTopics } = require('../models/topics-model');

const getAllTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        const topicsObj = {topics: topics}
        response.status(200).send(topicsObj); 
    })
    .catch((err) => {
        next(err);
    });
};


module.exports = { getAllTopics };