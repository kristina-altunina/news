const { endpointData } = require('../models/endpoint-model');

const availableEndpoints = (request, response, next) => {
    endpointData().then((data) => {
        response.status(200).send(data);  
    })
    .catch((err) => {
        next(err);
    });
};

module.exports = { availableEndpoints };

