const connection = require('../db/connection');
const topicData = require('../db/data/test-data/articles');


const selectArticle = (article_id) => {

    if (isNaN(article_id)) {
        return Promise.reject({status: 400})
    };

    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({rows}) => {
            if(rows.length === 0){ 
            return Promise.reject({status: 404})
            }
        return rows[0]
        })
};

module.exports = { selectArticle }