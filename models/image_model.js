const db = require('./interface_db')

async function update_imagepath(menu_id, imagePath) {
    const querySql = `UPDATE t_menu SET imagePath = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
        db.query(querySql, [imagePath, menu_id], (err, result) => {
            if (err) {
                console.error("Error updating imagePath:", err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

module.exports = { update_imagepath };
