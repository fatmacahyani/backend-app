const cart_model = require('../models/cart_model');
const menu_model = require('../models/menu_model');


async function get_all_cart(){
    const carts = await cart_model.get_all();
    return carts
}

async function get_cart_items(user_id) {
    const cartItems = await cart_model.fetch_cart_items(user_id);
    return cartItems;
}


async function add_cart_item(cartItem){
    if (!cartItem.menu_id || !cartItem.user_id || !cartItem.quantity) {
        throw new Error("menu_id, user_id, and quantity are required");
    }

    const carts_tersedia = await cart_model.get_all();

    menu_id_sama = false;
    id_menu_id_sama = 0;
    for (let i = 0; i < carts_tersedia.length; i++) {
        if(carts_tersedia[i].menu_id == cartItem.menu_id && carts_tersedia[i].user_id == cartItem.user_id){
            menu_id_sama = true;
            id_menu_id_sama = carts_tersedia[i].id; 
            break;
        }
    }

    if(menu_id_sama == true){
        const menu_property = await menu_model.get_menu_by_id(cartItem.menu_id);

        const carts = await cart_model.update_item(id_menu_id_sama, cartItem.quantity);
        let harga_baru = menu_property[0].price * cartItem.quantity;
        const carts2 = await cart_model.update_item_total_price(id_menu_id_sama, harga_baru);
        return carts2
    }else {
        try {
            const menu_property = await menu_model.get_menu_by_id(cartItem.menu_id);
            cartItem.menu_name = menu_property[0].item_name;
            cartItem.price = menu_property[0].price * cartItem.quantity;

            const result = await cart_model.add_item(cartItem);
            return { success: true, message: "Item added to cart successfully", data: result };
        } catch (error) {
            console.error("Error adding cart item:", error);
            throw new Error("Failed to add item to cart");
        }
    }
}

async function delete_cart_item(id){
    const carts = await cart_model.delete_item(id);
    return carts
}

async function update_cart_item(id, quantity) {
    const carts = await cart_model.update_item(id, quantity);
    return carts
}

module.exports = {get_all_cart, get_cart_items, add_cart_item, delete_cart_item, update_cart_item}