const { selectComments } = require('../models/comments-model');
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


module.exports = { getAllComments };