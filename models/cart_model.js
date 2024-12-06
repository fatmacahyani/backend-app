const db = require('./interface_db')


// function get cart
async function get_all() {
    const querySql = `SELECT * FROM t_cart`;

    // Await the promise
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

// function GET cart by userid
async function fetch_cart_items(user_id) {
    const querySql = `SELECT t_cart.id AS cart_id, t_menu.item_name AS menu_name, t_menu.price, t_cart.quantity, (t_menu.price * t_cart.quantity) AS total FROM t_cart JOIN t_menu ON t_cart.menu_id = t_menu.id WHERE t_cart.user_id = ?`;

    return new Promise((resolve, reject) => {
        db.query(querySql, [user_id], (err, results) => {
            if (err) {
                console.error("Error fetching cart items:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

// function add cart
async function add_item(cartItem) {
    const querySql = `INSERT INTO t_cart (user_id, menu_id, quantity, menu_name, price) VALUES (?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(querySql, [cartItem.user_id, cartItem.menu_id, cartItem.quantity, cartItem.menu_name, cartItem.price], (err, result) => {
            if (err) {
                console.error("Error adding item:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}


// function delete cart
async function delete_item(id) {
    const querySql = `DELETE FROM t_cart WHERE id = ? `;
    return new Promise((resolve, reject) => {
        db.query(querySql, [id], (err, result) => {
            if (err) {
                console.error("Error deleting item:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

// function update cart
async function update_item(id, quantity) {
    const querySql = `UPDATE t_cart SET quantity = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(querySql, [quantity, id], (err, result) => {
            if (err) {
                console.error("Error updating item:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

// function update cart
async function update_item_total_price(id, price) {
    const querySql = `UPDATE t_cart SET price = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(querySql, [price, id], (err, result) => {
            if (err) {
                console.error("Error updating item:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = {get_all, add_item, delete_item, update_item, update_item_total_price, fetch_cart_items};