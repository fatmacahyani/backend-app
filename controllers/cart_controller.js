const cart_model = require('../models/cart_model');


async function get_all_cart(){
    const carts = await cart_model.get_all();
    return carts
}

async function get_cart_items(user_id) {
    const cartItems = await cart_model.fetch_cart_items(user_id);
    return cartItems;
}


async function add_cart_item(cartItem){
    if(cartItem.menu_id == null){
        return 0;
    }
    
    if(cartItem.quantity == null){
        return 0;
    }

    const result = await cart_model.add_item(cartItem);
    return 1;
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