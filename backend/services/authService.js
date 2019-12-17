const { pool, getConnection } = require('../datas/dbConnect');

async function tradeTokenForUser(token) {
    return new Promise((resolve, reject) => {
        getConnection(function (errCon, connection) {
            if (errCon) reject(errCon);
            connection.query(`SELECT * FROM users WHERE token='${token}'`, (err, results) => {
                if (err) reject(err);
                if (results.length > 0) {
                    resolve(results[0])
                } else {
                    reject(new Error);
                }
            })
        });
    });
}

module.exports = {
    tradeTokenForUser
}