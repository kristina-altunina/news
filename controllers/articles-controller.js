const { selectArticle, selectArticles, updateArticle } = require('../models/articles-model');

const getArticle = (request, response, next) => {
    const {article_id} = request.params;

    selectArticle(article_id).then((article) => {
         response.status(200).send({article}); 
        })
        .catch((err) => {
            next(err);
        });
    };
    

const getArticles = (request, response, next) => {
    selectArticles().then((articles) => {
        const articleObj = {articles}
        response.status(200).send(articleObj); 
    })
        .catch((err) => {
            next(err);
    });
};


const patchArticle = (request, response, next) => {
    const {article_id} = request.params;
    const {inc_votes} = request.body;
    selectArticle(article_id).then((article) => {
        updateArticle(article.article_id, inc_votes).then((updatedArticle) => {
            response.status(201).send({article: updatedArticle})
        })
        .catch((err) => {
            next(err);
        })
    })
    .catch((err) => {
        next(err);
    });
}


module.exports = { getArticle, getArticles, patchArticle };