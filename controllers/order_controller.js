const order_model = require('../models/order_model');
const cart_model = require('../models/cart_model');

// controller create order
async function create_order_from_cart(user_id, payment_method, address) {
    try {
        const cart_items =await cart_model.fetch_cart_items(user_id);

        if (cart_items.length === 0) {
            throw new Error ('Cart is empty');
        }

        menu_name_tercatat = [];

        let total_price = 0;
        for (let i = 0; i < cart_items.length; i++) {

            menu_name_uniq = true;
            for(let j = 0; j  < menu_name_tercatat.length;j++){
                if (cart_items[i].menu_name == menu_name_tercatat[j]){
                    menu_name_uniq = false;
                }
            }

            if(menu_name_uniq){
                total_price += cart_items[i].quantity * cart_items[i].price;
                menu_name_tercatat[menu_name_tercatat.length] = cart_items[i].menu_name;
            }
        }

        // // Create a map to store totals for unique menu_name
        // const menuTotals = cart_items.reduce((acc, item) => {
        //     if (!acc[item.menu_name]) {
        //         acc[item.menu_name] = 0; // Initialize if not present
        //     }
        //     acc[item.menu_name] += item.price * item.quantity; // Add total for each menu_name
        //     return acc;
        // }, {});

        // // Calculate total price from unique menu_name
        // const totalPrice = Object.values(menuTotals).reduce((sum, price) => sum + price, 0);

        const status = '1';

        const order = await order_model.add_order(user_id, payment_method, address, total_price, status);

        return { success: true, message: "Order created successfully", order };
    } catch (error) {
        console.error("Error creating order from cart:", error);
        throw new Error(error.message);
    }
}

// controller get all order
async function get_all_orders(){
    try {
        const orders = await order_model.get_all_orders();
        return {success: true, orders};
    } catch (error){
        console.error('Error fetching all orders:', error);
        throw new Error('Failed to fetch all orders');
    }
}

// controller get detail order by id
async function get_order_by_id (order_id) {
    try {
        const order = await order_model.get_order_by_id(order_id);
        const chart_user = await cart_model.fetch_cart_items(order[0]?.user_id);

        if(!chart_user || chart_user.length === 0){
            throw new Error("Order Chart not found");
        }

        for (let i = 0; i < order.length; i++) {
            order[i].price = chart_user[i]?.price;
            order[i].menu_name = chart_user[i]?.menu_name;
            order[i].total_price = chart_user[i]?.total;
        }

        if (!order || order.length === 0) {
            throw new Error("Order not found");
        }
        return { success: true, order };
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw new Error("Failed to fetch order details");
    }
}

// controller get order status by user_id
async function get_order_by_userid(user_id) {
    try {
        const orders = await order_model.get_orders_by_user_id(user_id);
        if (!orders || orders.length === 0) {
            throw new Error("No orders found for this user");
        }
        return { success: true, orders };
    } catch (error) {
        console.error("Error fetching orders by user ID:", error);
        throw new Error("Failed to fetch user orders");
    }
}


// controller update status by order_id
async function update_order_status(order_id, order_status) {
    try {
        const result = await order_model.update_status_byorderid(order_id, order_status);
        return { success: true, message: "Order status updated successfully", result };
    } catch (error) {
        console.error("Error updating order status:", error);
        throw new Error("Failed to update order status");
    }
}


// async function get_orderstatus (){
//     try{
//         const order = await orderModel.getOrderStatusById(order_id);

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found.' });
//     }
//     res.status(200).json({
//         order_id: order.order_id,
//         status: order.status,
//       });
//     } catch (error) {
//       console.error('Error fetching order status:', error);
//       res.status(500).json({ message: 'An error occurred while fetching the order status.', error });
//     }
//   };

  

module.exports = {create_order_from_cart, get_all_orders, get_order_by_id, get_order_by_userid, update_order_status}
