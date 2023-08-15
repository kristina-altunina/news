const { selectArticle } = require('../models/articles-model');

const getArticle = (request, response, next) => {
    const {article_id} = request.params;

    selectArticle(article_id).then((article) => {
        const singleArticle = {article}
         response.status(200).send(singleArticle); 
        })
        .catch((err) => {
            next(err);
    });
};

module.exports = { getArticle };