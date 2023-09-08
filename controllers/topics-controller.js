const { request } = require('../app');
const { selectTopics, selectTopic } = require('../models/topics-model');

const getAllTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        const topicsObj = {topics: topics}
        response.status(200).send(topicsObj); 
    })
    .catch((err) => {
        next(err);
    });
};

const getTopic = (request, response, next) => {
    const {topic_name} = request.params;
    selectTopic(topic_name).then((topic) => {
        response.status(200).send({topic});
    })
    .catch((err) => {
        next(err);
    });
};



module.exports = { getAllTopics, getTopic };