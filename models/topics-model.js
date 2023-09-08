const connection = require('../db/connection');
const topicData = require('../db/data/test-data/topics');

const selectTopics = () => {
    return connection.query(`SELECT * FROM topics`)
                    .then((topics) => {
                        return topics.rows
                    })
};

const selectTopic = (topic_name) => {
    return connection.query(`SELECT slug, description
                            FROM topics
                            WHERE slug = $1`, [topic_name])
                        .then(({rows}) => {
                            if(rows.length === 0){
                            return Promise.reject({status: 404}) 
                            }
                        return rows[0];
                        })
};

module.exports = { selectTopics,  selectTopic}

