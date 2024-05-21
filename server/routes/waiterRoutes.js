const express = require("express");
const router = express.Router();
const Waiter = require("../model/waiter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cuisine = require("../model/Cuisine");
const Table = require("../model/Table");
const Order = require("../model/Order");

// Login ------------------------------------------------------------
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const waiterLogin = await Waiter.findOne({ email });

        if (!waiterLogin) {
            return res.status(400).json({ message: 'Email is incorrect' });
        }

        const passwordMatch = await bcrypt.compare(password, waiterLogin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            userId: waiterLogin._id,
            role: waiterLogin.userRole,
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1hr
        });

        return res.status(200).json({
            message: 'Login successful',
            waiterLogin: {
                _id: waiterLogin._id,
                name: waiterLogin.firstName + " " + waiterLogin.lastName,
                email: waiterLogin.email,
                dateOfJoining: waiterLogin.createdAt
            },
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Logout ------------------------------------------------------------
router.post('/logout', (req, res) => {
    //  verify the token before logout
    const token = req.cookies.token;
    if (token) {
        // Clearing the JWT cookie
        res.clearCookie('token');
        return res.status(200).json({ message: 'Logout successful' });
    } else {
        return res.status(400).json({ message: 'No active session' });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const waiterData = await Waiter.findById(id)
        if (!waiterData) {
            return res.status(401).json({ message: "NO WAITER FOUND" })
        }
        return res.status(200).json({ message: "Fetch success", waiterData })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.messages })
    }
})




// Get Product by Cuisine

router.get("/fetch-items/starter", async (req, res) => {
    try {
        const product = await Cuisine.find({ category: "Starter" })
        if (!product) {
            return res.status(401).json("No items founds")
        }
        return res.status(200).json({ message: "Fetch success", product })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
router.get("/fetch-items/main-course", async (req, res) => {
    try {
        const product = await Cuisine.find({ category: "MainCourse" })
        if (!product) {
            return res.status(401).json("No items founds")
        }
        return res.status(200).json({ message: "Fetch success", product })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})

router.get("/fetch-items/beverage", async (req, res) => {
    try {
        const product = await Cuisine.find({ category: "Beverage" })
        if (!product) {
            return res.status(401).json("No items founds")
        }
        return res.status(200).json({ message: "Fetch success", product })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
router.get("/fetch-items/dessert", async (req, res) => {
    try {
        const product = await Cuisine.find({ category: "Dessert" })
        if (!product) {
            return res.status(401).json("No items founds")
        }
        return res.status(200).json({ message: "Fetch success", product })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})

// Table
router.get("/get-all-tables", async (req, res) => {
    try {
        const allTables = await Table.find({})
        res.status(201).json(allTables);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.get("/get-all-tables/status", async (req, res) => {
    try {
        const orders = await Order.find({ status: "Pending" }) // or { table: tableNumber } if you converted it above
            .populate('items.cuisine')


        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});



router.post('/orders/add-order/:table', async (req, res) => {
    const { table } = req.params;
    const { itemId } = req.body;



    try {
        const cuisineItem = await Cuisine.findById(itemId);
        if (!cuisineItem) {
            return res.status(404).json({ message: "Cuisine item not found." });
        }

        let order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

        if (order) {
            order.items.push({
                cuisine: itemId, // Keeping reference to the cuisine
                price: cuisineItem.price
            });
        } else {
            // No existing order, create a new one
            order = new Order({
                table: table,
                waiter: waiterId,
                items: [{
                    cuisine: itemId, // Keeping reference to the cuisine
                    price: cuisineItem.price
                }],
                status: 'Pending',
                paymentStatus: 'Unpaid'
            });
        }
        const tableStatus = await Table.findOne({ id: table })
        tableStatus.currStatus = "occupied"
        await tableStatus.save()

        await order.save();

        // Now, we populate the 'cuisine' to get the 'product_name' when sending the response
        const populatedOrder = await Order.populate(order, { path: 'items.cuisine' });

        // You might need to structure the response based on your client's needs
        // This will include the product_name in the order items
        return res.status(201).json(populatedOrder);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});
// router.post('/orders/add-or-update/:table', async (req, res) => {
//     const { table } = req.params;
//     const { waiterId, itemId, quantity } = req.body;



//     try {
//         const cuisineItem = await Cuisine.findById(itemId);
//         if (!cuisineItem) {
//             return res.status(404).json({ message: "Cuisine item not found." });
//         }

//         let order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

//         if (order) {
//             const itemIndex = order.items.findIndex(item => item.cuisine.equals(itemId));

//             if (itemIndex !== -1) {
//                 // Item exists, so just update the quantity
//                 order.items[itemIndex].quantity = quantity;
//             } else {
//                 // Item does not exist, add it as a new line item
//                 order.items.push({
//                     cuisine: itemId, // Keeping reference to the cuisine
//                     quantity: quantity,
//                     price: cuisineItem.price
//                 });
//             }
//         } else {
//             // No existing order, create a new one
//             order = new Order({
//                 table: table,
//                 waiter: waiterId,
//                 items: [{
//                     cuisine: itemId, // Keeping reference to the cuisine
//                     quantity: quantity,
//                     price: cuisineItem.price
//                 }],
//                 status: 'Pending',
//                 paymentStatus: 'Unpaid'
//             });
//         }
//         const tableStatus = await Table.findOne({ id: table })
//         tableStatus.currStatus = "occupied"
//         await tableStatus.save()

//         await order.save();

//         // Now, we populate the 'cuisine' to get the 'product_name' when sending the response
//         const populatedOrder = await Order.populate(order, { path: 'items.cuisine' });

//         // You might need to structure the response based on your client's needs
//         // This will include the product_name in the order items
//         return res.status(201).json(populatedOrder);

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Server error: ' + error.message });
//     }
// });



router.get('/orders/by-table/:table', async (req, res) => {
    const { table } = req.params;

    try {
        // Convert table to the appropriate type if it's not a string
        // For example, if it's a number: const tableNumber = parseInt(table);

        const orders = await Order.find({ table: table }) // or { table: tableNumber } if you converted it above
            .populate('items.cuisine')


        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});



router.put('/orders/update/:table', async (req, res) => {
    const { table } = req.params;
    const { itemId, quantity } = req.body;



    try {
        const cuisineItem = await Cuisine.findById(itemId);
        if (!cuisineItem) {
            return res.status(404).json({ message: "Cuisine item not found." });
        }

        let order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

        if (order) {
            order.items.push({
                cuisine: itemId,
                quantity: quantity,
                price: cuisineItem.price
            });

        }
        const tableStatus = await Table.findOne({ id: table })
        tableStatus.currStatus = "occupied"
        await tableStatus.save()

        await order.save();

        // Now, we populate the 'cuisine' to get the 'product_name' when sending the response
        const populatedOrder = await Order.populate(order, { path: 'items.cuisine' });

        // You might need to structure the response based on your client's needs
        // This will include the product_name in the order items
        return res.status(201).json(populatedOrder);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});


router.delete('/orders/delete/:table', async (req, res) => {
    const { table } = req.params;
    const { itemId } = req.body; // itemId is expected to be in the request body for deletion

    try {
        // Find the order for the specified table with 'Pending' status and 'Unpaid' paymentStatus
        const order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Filter out the item to be deleted
        const removedItemCount = order.items.length;
        order.items = order.items.filter(item => item.cuisine.toString() !== itemId);

        // If any item was removed
        if (removedItemCount !== order.items.length) {
            await order.save();
            // Check if the order is empty after item removal
            if (order.items.length === 0) {
                await order.remove();
                await Table.updateOne({ id: table }, { $set: { currStatus: "vacant" }});
                return res.status(200).json({ message: `Order cleared and the table ${table} is now vacant.` });
            }
            return res.status(200).json({ message: `Item ${itemId} deleted from order.` });
        } else {
            return res.status(404).json({ message: `Item ${itemId} not found in order.` });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Server error: ${error.message}` });
    }
});



module.exports = router