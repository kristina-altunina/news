const connection = require('../db/connection');

const selectArticle = (article_id) => {
    return connection.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
        .then(({rows}) => {
            if(rows.length === 0){ 
            return Promise.reject({status: 404})
            }
        return rows[0]
        })
};

const selectArticles = () => {
    return connection.query(`SELECT articles.author, 
                            articles.title, 
                            articles.article_id, 
                            articles.topic, 
                            articles.created_at, 
                            articles.votes, 
                            articles.article_img_url,
                            COUNT(*) AS comment_count
                            FROM articles
                            LEFT JOIN comments
                            ON articles.article_id = comments.article_id
                            GROUP BY articles.author, 
                            articles.title, 
                            articles.article_id, 
                            articles.topic, 
                            articles.created_at, 
                            articles.votes, 
                            articles.article_img_url
                            ORDER BY articles.created_at DESC;`
                            )
        .then((articles) => {
            return articles.rows    
        })
};

const updateArticle = (article_id, inc_votes) => {
    return connection.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
        .then(({rows}) => {
            return rows[0]  
        })
};


module.exports = { selectArticle, selectArticles, updateArticle }