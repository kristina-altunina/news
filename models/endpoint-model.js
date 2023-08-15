const endpointsFile = require('../endpoints.json');

const endpointData = () => { 
    return Promise.resolve(endpointsFile)
};

module.exports = { endpointData };