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
    const promises = [selectArticle(article_id), updateArticle(article_id, inc_votes)];

    Promise.all(promises)
    .then((resolvedPromises) => {
        const article = resolvedPromises[0];
        const updatedArticle = resolvedPromises[1];
        response.status(201).send({article: updatedArticle})
    })
    .catch((err) => {
        next(err);
    });
}


module.exports = { getArticle, getArticles, patchArticle };
