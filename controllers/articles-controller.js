const { selectArticle } = require('../models/articles-model');

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

module.exports = { getArticle };