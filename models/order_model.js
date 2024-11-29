const db = require('./interface_db')


//function get all order
async function get_all() {
    const querySql = `SELECT * FROM t_order`;

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

// function add payment_method and adress
async function add_order(user_id, payment_method, address, total_price, order_status) {
    const querySql = `INSERT INTO t_order (user_id, payment_method, address, total_price, order_status) VALUES (?, ?, ?, ?, ?) `;

    // Await the promise
    return new Promise((resolve, reject) => {
        db.query(querySql,[user_id, payment_method, address, total_price, order_status], (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// function update payment_method and address
async function update_order_bycartid(user_id, payment_method, address) {
    const querySql = `UPDATE t_order SET payment_method = ?, address = ? WHERE user_id = ?`;

    // Await the promise
    return new Promise((resolve, reject) => {
        db.query(querySql, [payment_method, address, user_id], (err, rows) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// function update status order
async function update_status_byorderid(order_id, order_status) {
    const querySql = `UPDATE t_order SET order_status = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(querySql, [order_status, order_id], (err, result) => {
            if (err) {
                console.error("Error updating order status:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

const getCartByUserId = async (userId) => {
    const cartItems = await db.query(
      `SELECT m.id AS menu_id, m.item_name, m.price, c.quantity 
       FROM t_cart c 
       JOIN menu m ON c.menu_id = m.id 
       WHERE c.user_id = ?`,
      [userId]
    );
    return cartItems; // Return the query result
  };

module.exports = {get_all, add_order, update_order_bycartid, update_status_byorderid, getCartByUserId};