const connection = require('../db/connection');
const { topicData } = require('../db/data/test-data');

const selectTopics = () => {
    return connection.query(`SELECT * FROM topics`)
                    .then(({rows : topics}) => {
                        return topics || [];
                    })
};

const readTopicsBySlug = (slug) => {
    return connection.query("SELECT * FROM topics WHERE Slug = $1", [slug])
        .then(({rows : topics}) => {
        return topics;
        })
 };


module.exports = { selectTopics, readTopicsBySlug }
