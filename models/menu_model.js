const db = require('./interface_db')


//function get all menu
async function get_all() {
    const querySql = `SELECT * FROM t_menu`;

    return new Promise((resolve, reject) => {
        db.query(querySql, (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//function get menu by name
async function get_menu_byname(name) {
    const querySql = `SELECT * FROM t_menu WHERE item_name = '${name}'`;

    return new Promise((resolve, reject) => {
        db.query(querySql, (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//function get menu by id
async function get_menu_by_id(id) {
    const querySql = `SELECT * FROM t_menu WHERE id = '${id}'`;

    return new Promise((resolve, reject) => {
        db.query(querySql, (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//function get menu by category
async function get_menu_bycategory(category) {
    const querySql = `SELECT * FROM t_menu WHERE categories = '${category}'`;

    return new Promise((resolve, reject) => {
        db.query(querySql, (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//function update image
async function insert_image({ name, description, price, categories, imagePath }) {
    const querySql = `
        INSERT INTO t_menu (name, description, price, categories, imagePath) 
        VALUES (?, ?, ?, ?, ?);
    `;

    return new Promise((resolve, reject) => {
        db.query(querySql, [name, description, price, categories, imagePath], (err, result) => {
            if (err) {
                console.error("Error inserting image:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {get_all, get_menu_byname, get_menu_by_id, get_menu_bycategory, insert_image};