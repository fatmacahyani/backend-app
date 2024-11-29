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

// function get cart by userid
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
    const querySql = `INSERT INTO t_cart (user_id, menu_id, quantity) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(querySql, [cartItem.user_id, cartItem.menu_id, cartItem.quantity], (err, result) => {
            if (err) {
                console.error("Error adding item:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

// function add cart
async function add_item_to_cart(cartItem) {
    const fetchMenuDetail = `SELECT item_name AS menu_name, price FROM t_menu WHERE id = ?`;
    const insertCart = `INSERT INTO t_cart (user_id, menu_id, quantity) VALUES (?, ?, ?)`;

    return new Promise((resolve, reject) => {
        // Step 1: Fetch menu details
        db.query(fetchMenuDetail, [cartItem.menu_id], (fetchErr, fetchResult) => {
            if (fetchErr) {
                console.error("Error fetching menu details:", fetchErr);
                return reject(fetchErr);
            }

            if (fetchResult.length === 0) {
                console.error("Menu ID not found in t_menu.");
                return reject(new Error("Invalid Menu ID."));
            }

            const menuDetails = fetchResult[0]; // { item_name, price }

            // Step 2: Insert into cart
            db.query(insertCart, [cartItem.user_id, cartItem.menu_id, cartItem.quantity], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Error adding item to cart:", insertErr);
                    return reject(insertErr);
                }

                resolve({
                    success: true,
                    message: "Item added to cart successfully",
                    cart_id: insertResult.insertId,
                    item_name: menuDetails.item_name,
                    price: menuDetails.price,
                });
            });
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

module.exports = {get_all,add_item, add_item_to_cart, delete_item, update_item, fetch_cart_items};