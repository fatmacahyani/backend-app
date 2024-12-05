const order_model = require('../models/order_model');
const cart_model = require('../models/cart_model');

async function get_all_order(){
    
    const orders = await order_model.get_all();

    return orders
}

async function get_orderstatus(order_id) {
    const orderStatus = await order_model.get_status(order_id);
    return orderStatus;
}

async function get_orderstatus (){
    try{
        const order = await orderModel.getOrderStatusById(order_id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({
        order_id: order.order_id,
        status: order.status,
      });
    } catch (error) {
      console.error('Error fetching order status:', error);
      res.status(500).json({ message: 'An error occurred while fetching the order status.', error });
    }
  };

async function create_order_from_cart(user_id, payment_method, address) {
    const cart_items = await cart_model.fetch_cart_items(user_id);
    
    const totalPrice = cart_items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
    const status = '1'
    
    console.log(totalPrice)
    const order = await order_model.add_order(user_id, payment_method, address, totalPrice, status);

    return order;

}

async function update_order(user_id, payment_method, address) {
    try {
        const result = await order_model.update_order_bycartid(user_id, payment_method, address);

        if (result.affectedRows === 0) {
            throw new Error('No orders found with the specified user_id.');
        }

        return { success: true, message: 'Order updated successfully', result };
    } catch (error) {
        console.error('Error updating order:', error);
        return { success: false, message: error.message };
    }
}

async function update_order_status(order_id, order_status) {
    try {
        const result = await order_model.update_status_byorderid(order_id, order_status);

        if (result.affectedRows === 0) {
            return {
                success: false,
                message: 'No order found with the specified order ID.',
            };
        }

        return {
            success: true,
            message: 'Order status updated successfully.',
            result,
        };
    } catch (error) {
        console.error('Error updating status:', error);
        throw new Error('Failed to update order status.');
    }
}

  

module.exports = {get_all_order, get_orderstatus, create_order_from_cart, update_order, update_order_status, create_order_from_cart}
