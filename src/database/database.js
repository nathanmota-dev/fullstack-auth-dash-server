const mysql = require('mysql');

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const findUserById = (id, callback) => {

    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], (error, results) => {
        if (error) {
            return callback(error);
        } if (results.length > 0) {
            return callback(null, results[0]);
        } else {
            return callback(null);
        }
    });
};

module.exports = { db, findUserById };
