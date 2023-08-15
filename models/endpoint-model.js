const fs = require('fs');

const endpointData = () => { 
    return fs.promises.readFile('endpoints.json', 'utf8') 
};

module.exports = { endpointData };



