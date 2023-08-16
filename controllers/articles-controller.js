const { selectArticle, selectArticles } = require('../models/articles-model');

const getArticle = (request, response, next) => {
    const {article_id} = request.params;

    selectArticle(article_id).then((article) => {
         response.status(200).send({article}); 
        })
        .catch((err) => {
            if (err.code === '22P02') {
              err = {status: 400}  
            }
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


module.exports = { getArticle, getArticles };