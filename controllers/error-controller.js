const handle400s = (err, request, response, next) => {
    if (err.code === '22P02') {
        response.status(400).send({ message: '400: Bad Request' });
    } else {
        next(err);
    }
};

module.exports = { handle400s };


