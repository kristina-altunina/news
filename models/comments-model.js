const connection = require('../db/connection');

const selectComments = (article_id) => {
    return connection.query(`SELECT * FROM comments
                            WHERE article_id = $1
                            ORDER BY created_at DESC`, [article_id])
                            .then(({rows}) => {
                                return rows
                            })
};

const insertComment = (article_id, newComment) => {
    const {username, body} = newComment;
    const votes = 0;
    const created_at = new Date();
    
    return connection.query(`INSERT INTO comments (body, votes, author, article_id, created_at) 
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [body, votes, username, article_id, created_at])
    .then(({rows}) => {
        return rows[0];
    })
}


module.exports = { selectComments, insertComment }


