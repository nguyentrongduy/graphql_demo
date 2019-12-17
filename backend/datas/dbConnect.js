const mysql = require('mysql');
const { isNil } = require('lodash');

let pool = mysql.createPool({
    connectionLimit: 10, // default = 10
    host: "localhost",
    user: "root",
    password: "123456aA@",
    insecureAuth: true,
    database: `graphql_demo`
});

let dbConnection = null;
let error;

function getConnection(callback) {
    if (isNil(dbConnection)) {
        pool.getConnection(function (errCon, connection) {
            dbConnection = connection;
            callback(errCon, dbConnection)
        })
    } else {
        return callback(error, dbConnection);
    }
}

module.exports = {
    pool,
    getConnection
}