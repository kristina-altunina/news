const { selectComments, insertComment } = require('../models/comments-model');
const { selectArticle } = require('../models/articles-model');

const getAllComments = (request, response, next) => {
    const {article_id} = request.params
    selectArticle(article_id).then((article) => {
        selectComments(article.article_id).then((comments) => {
            response.status(200).send({comments});  
        })
    })
    .catch((err) => {
        next(err);
    });
};

const postComment = (request, response, next) => {
    const {article_id} = request.params;
    const newComment = request.body;
    selectArticle(article_id).then((article) => {
        insertComment(article.article_id, newComment).then((comment) => {
            response.status(201).send({comment})
        })
        .catch((err) => {
            console.log(err);
            next(err);
        })
    })
    .catch((err) => {
        next(err);
    });
}




module.exports = { getAllComments, postComment };