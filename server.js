const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module
const app = express();

const port = 3001;
const menu_controller = require('./controllers/menu_controller');
const cart_controller = require('./controllers/cart_controller');
const order_controller = require('./controllers/order_controller');
// const upload = require('./Middleware/upload');

app.use(cors());

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'image')));

// Endpoint routing GET menu
app.get('/menu', async (req, res) =>{
    const menus = await menu_controller.get_all_menus()
    res.send(menus)
})

// Endpoint routing GET menu by name
app.get('/menu/name/:name', async (req, res) =>{
    const menus = await menu_controller.get_menu_byname(req.params.name)
    res.send(menus)
})

// Endpoint routing GET menu by id
app.get('/menu/id/:id', async (req, res) =>{
    const menus = await menu_controller.get_menu_by_id(req.params.id)
    res.send(menus)
})

// Endpoint routing GET menu by category
app.get('/menu/category/:category', async (req, res) =>{
    const menus = await menu_controller.get_menu_bycategory(req.params.category)
    res.send(menus)
})


//=================================================================================================================


// Endpoint routing GET cart by userid
app.get('/cart/:user_id', async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const cartItems = await cart_controller.get_cart_items(user_id);
        if (cartItems.length > 0) {
            res.status(200).json({ success: true, data: cartItems });
        } else {
            res.status(404).json({ success: false, message: 'No items in the cart.' });
        }
    } catch (error) {
        console.error("Error in GET /cart:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


// Endpoint routing POST cart
app.post('/cart', async (req, res) => {
    const { menu_id, user_id, quantity } = req.body;

    try {
        const result = await cart_controller.add_cart_item({ menu_id, user_id, quantity });
        res.status(201).json({success: true, message: 'Item added successfully', data: result});
    } catch (error) {
        console.error("Error in POST /cart:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Endpoint routing DELETE cart
app.delete('/cart/:id', async (req, res) => {
    try {
        const result = await cart_controller.delete_cart_item(req.params.id);
        res.status(200).json({ success: true, message: "Item deleted successfully", data: result });
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ success: false, message: "Failed to delete cart item" });
    }
});

// Endpoint routing UPDATE cart
app.put('/cart/:id', async (req, res) => {
    try {
        const result = await cart_controller.update_cart_item(req.params.id, req.body.quantity);
        res.status(200).json({ success: true, message: "Item updated successfully", data: result });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ success: false, message: "Failed to update cart item" });
    }
});

//=================================================================================================================

// Endpoint routing POST order
app.post('/order', async (req, res) => {
    const { user_id, payment_method, address } = req.body;

    if (!user_id || !payment_method || !address) {
        return res.status(400).json({ success: false, message: "user_id, payment_method, and address are required" });
    }

    try {
        const order = await order_controller.create_order_from_cart(user_id, payment_method, address);
        res.status(201).json(order);
    } catch (error) {
        console.error("Error in POST /order:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint routing GET all order
app.get('/order', async (req, res) => {
    try {
        const orders = await order_controller.get_all_orders();
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in GET /orders:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint routing GET order by id
app.get('/order/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const order = await order_controller.get_order_by_id(id);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error in GET /order/:id:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint routing GET order by user_id
app.get('/order/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const orders = await order_controller.get_order_by_userid(user_id);
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error in GET /user/:user_id/orders:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});


// // Endpoint routing PUT status
app.put('/order/:id/status', async (req, res) => {
    const order_id = req.params.id;
    const { order_status} = req.body;

    if (!order_status) {
        return res.status(400).json({success: false, message: 'order_status is required.',
        });
    }

    try {
        const response = await order_controller.update_order_status(order_id, order_status);
        res.status(response.success ? 200 : 404).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the order status.',
        });
    }
});


// Endpoint routing GET order
// app.get('/order/:order_id/status', async (req, res) => {
//     const order_id = req.params.order_id;

//     try {
//         const cartItems = await order_controller_controller.get_cart_items(order_id);
//         if (cartItems.length > 0) {
//             res.status(200).json({ success: true, data: cartItems });
//         } else {
//             res.status(404).json({ success: false, message: 'No items in the cart.' });
//         }
//     } catch (error) {
//         console.error("Error in GET /cart:", error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

//=================================================================================================================

// app.post('/menu', upload.single('image'), async (req, res) => {
//     const { name, description, price, categories } = req.body;
//     const imagepath = req.file ? req.file.path : null;

//     if (!name || !description || !price || !categories || !imagepath) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields including image are required.",
//         });
//     }

//     try {
//         const menu = await menu_controller.add_menu({ name, description, price, categories, imagepath });
//         res.status(201).json({
//             success: true,
//             data: menu,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "An error occurred while adding the menu.",
//         });
//     }
// });

//=================================================================================================================


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
