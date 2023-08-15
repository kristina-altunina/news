const connection = require('../db/connection');
const topicData = require('../db/data/test-data/topics');

const selectTopics = () => {
    return connection.query(`SELECT * FROM topics`)
                    .then((topics) => {
                        return topics.rows
                    })
};

module.exports = { selectTopics }
