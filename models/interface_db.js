const mysql = require('mysql');

// buat konfigurasi db
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'm_food',
    multipleStatements: true
});

// db database
db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

module.exports = db;
