const { endpointData } = require('../models/endpoint-model');

const availableEndpoints = (request, response, next) => {
    endpointData() 
    .then((data) => {
        const dataObj = JSON.parse(data);
        response.status(200).send(dataObj);
    })
    .catch((err) => {
        next(err);
    });
};

module.exports = { availableEndpoints };

