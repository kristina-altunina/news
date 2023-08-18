const connection = require('../db/connection');

const selectUser = (value) => {
    if (value === ""){
        return Promise.reject({status: 400})
    } 
        return connection.query(`SELECT * FROM users
                                WHERE username = $1`, [value])
            .then(({rows}) => {
                if(rows.length === 0){ 
                    return Promise.reject({status: 404})
                }
            return rows[0]
            })
}


module.exports = { selectUser };