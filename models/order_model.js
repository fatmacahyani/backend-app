const db = require('./interface_db')

// function create order (for customer)
async function add_order(user_id, payment_method, address, total_price, order_status) {
    const querySql = `INSERT INTO t_order (user_id, payment_method, address, total_price, order_status) VALUES (?, ?, ?, ?, ?) `;

    return new Promise((resolve, reject) => {
        db.query(querySql,[user_id, payment_method, address, total_price, order_status], (err, rows) => {
            if (err) {
                console.error("Error adding order:", err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}


//function get all order (for admin)
async function get_all_orders() {
    const querySql = `SELECT id AS order_id, user_id, order_status AS status, order_date FROM t_order`;
    return new Promise((resolve, reject) => {
        db.query(querySql, (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

// function get order details by id (for admin)
async function get_order_by_id(order_id) {
    const querySql = `SELECT t_order.id AS order_id, t_order.user_id, t_cart.menu_name, t_cart.quantity, t_cart.price, (t_cart.quantity * t_cart.price) AS total_price, t_order.order_status AS status FROM t_order JOIN t_cart ON t_cart.user_id = t_order.user_id WHERE t_order.id = ?`;

return new Promise((resolve, reject) => {
    db.query(querySql, [order_id], (err, results) => {
        if (err) {
            console.error("Error fetching order by ID:", err);
            return reject(err);
        }
        resolve(results);
    });
});

}

// function monitor order (for customer)
async function get_order_by_userid (user_id) {
    const querySql = `SELECT id AS order_id, order_date, total_price, order_status AS status FROM t_order WHERE user_id = ?`;

return new Promise((resolve, reject) => {
    db.query(querySql, [user_id], (err, results) => {
        if (err) {
            console.error("Error fetching orders by user ID:", err);
            return reject(err);
        }
        resolve(results);
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

// function monitor order (for customer)
// async function get_status(order_id, order_status) {
//     const querySql = `SELECT id AS order_id, status FROM t_order WHERE id = ?`;

//     return new Promise((resolve, reject) => {
//         db.query(querySql, [order_id, order_status], (err, rows) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     });
// }

// // function update payment_method and address
// async function update_order_bycartid(user_id, payment_method, address) {
//     const querySql = `UPDATE t_order SET payment_method = ?, address = ? WHERE user_id = ?`;

//     // Await the promise
//     return new Promise((resolve, reject) => {
//         db.query(querySql, [payment_method, address, user_id], (err, rows) => {
//             if (err) {
//                 console.error("Error executing query:", err);
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     });
// }




module.exports = {get_all_orders, get_order_by_id, get_order_by_userid, add_order, update_status_byorderid};