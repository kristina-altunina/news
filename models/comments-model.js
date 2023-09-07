const connection = require('../db/connection');

const selectComments = (article_id) => {
    return connection.query(`SELECT * FROM comments
                            WHERE article_id = $1
                            ORDER BY created_at DESC`, [article_id])
                            .then(({rows}) => {
                                return rows
                            })
};

const selectComment = (comment_id) => {
    return connection.query(`SELECT * FROM comments
                            WHERE comment_id = $1`, [comment_id])
                            .then((rows) => {
                                return rows[0];
                            })
}

const insertComment = (article_id, newComment) => {
    const {username, body} = newComment;
    
    return connection.query(`INSERT INTO comments (body, author, article_id) 
    VALUES ($1, $2, $3) RETURNING *;`,
    [body, username, article_id])
    .then(({rows}) => {
        return rows[0];
    })
}


const selectCommentToDelete = (comment_id) => {
    return connection.query(`DELETE FROM comments
                            WHERE comment_id = $1 RETURNING *`, [comment_id])
                            .then((response) => {
                                if(response.rowCount === 0) {
                                    return Promise.reject({status: 404})
                                }
                                return response.rows[0]
                            })
}

module.exports = { selectComments, selectComment, insertComment, selectCommentToDelete }


