const connection = require('../db/connection');
const topicData = require('../db/data/test-data/topics');

const selectTopics = () => {
    console.log(topicData);
    return Promise.resolve(topicData)
};

module.exports = { selectTopics }
