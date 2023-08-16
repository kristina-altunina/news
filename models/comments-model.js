const connection = require('../db/connection');

const selectComments = (article_id) => {
    return connection.query(`SELECT * FROM comments
                            WHERE article_id = $1
                            ORDER BY created_at DESC`, [article_id])
                            .then(({rows}) => {
                                if(rows.length === 0){ 
                                return Promise.reject({status: 404})
                                }
                            return rows
                            })
};

module.exports = { selectComments }



