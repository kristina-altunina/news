const { selectTopics, readTopics, readTopicsBySlug } = require('../models/topics-model');

const getAllTopics = (request, response, next) => {
    selectTopics().then((topics) => {
        response.status(200).send(topics);  
    })
    .catch((err) => {
        next(err);
    });
};

const getTopicBySlug = (request, response, next) => {
    const {slug} = request.params;
    if(!isNaN(slug)){
        throw {status: 400};
    };

readTopicsBySlug(slug)
    .then((topics) => {
        if(topics.length === 0){
        throw {status: 404};
        }
        response.status(200).send(topics);   
    })
    .catch((err) => {
        next(err);
    });
};

const getTopicByQuery = (request, response, next) => {
    const {order_by} = request.params
    console.log(order_by);
    const acceptedQuery = ['description', 'slug'];
    if (!acceptedQuery.includes(order_by)) {
        return response.status(400).send({message: '400: Bad Request'});
    }

    readTopics(order_by)
        .then((topics) => {
            response.status(200).send(topics);
            console.log({topics});
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
};


module.exports = { getAllTopics, getTopicByQuery, getTopicBySlug };