const connection = require('../db/connection');

const selectComments = (article_id) => {
    return connection.query(`SELECT * FROM comments
                            WHERE article_id = $1
                            ORDER BY created_at DESC`, [article_id])
                            .then(({rows}) => {
                                return rows
                            })
};

const selectCommentToDelete = (comment_id) => {
    return connection.query(`DELETE FROM comments
                            WHERE comment_id = $1 RETURNING *`, [comment_id])
                            .then(({rows}) => {
                                return rows[0]  
                            })
}

module.exports = { selectComments, selectCommentToDelete }


