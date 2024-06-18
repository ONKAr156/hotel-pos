const express = require("express");
const router = express.Router();
const Waiter = require("../model/waiter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Cuisine = require("../model/Cuisine");
const Table = require("../model/Table");
const Order = require("../model/Order");
const { log10 } = require("chart.js/helpers");

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
//-------------------------------------------------------------------------

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
//-------------------------------------------------------------------------

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
        const orders = await Order.find({ status: "Pending" })
            .populate('items.cuisine')
        if (orders.length === 0) {
            return res.status(401).json({ message: "No live orders present" })
        }

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

router.get('/orders/by-table/:table', async (req, res) => {
    const { table } = req.params;

    try {
        const orders = await Order.find({ table: table, status: "Pending" })
            .populate('items.cuisine')

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

// Add item to order-list
router.post('/orders/add-order/:table', async (req, res) => {
    const { table } = req.params;
    const { itemId, waiterId } = req.body;

    try {
        const cuisineItem = await Cuisine.findById(itemId);
        if (!cuisineItem) {
            return res.status(404).json({ message: "Cuisine item not found." });
        }

        let order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

        if (order) {
            order.items.push({
                cuisine: itemId,
                price: cuisineItem.price
            });
        } else {
            order = new Order({
                table: table,
                waiter: waiterId,
                items: [{
                    cuisine: itemId,
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

        const populatedOrder = await Order.populate(order, { path: 'items.cuisine' });

        return res.status(201).json(populatedOrder);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

// Update the item quantity
router.put('/orders/update-quantity/:table', async (req, res) => {
    const { table } = req.params;
    const { newQuantity, itemId } = req.body;  // Assuming newQuantity is passed in the request body.

    if (newQuantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1." });
    }

    try {
        // Find the order and the item within it
        let order = await Order.findOne({ table, status: 'Pending', paymentStatus: 'Unpaid' });

        if (!order) {
            return res.status(401).json({ message: "Order not found." });
        }

        // Find the item
        let itemIndex = order.items.findIndex(item => item.cuisine.toString() === itemId);

        if (itemIndex < 0) {
            return res.status(401).json({ message: "Item not found in order." });
        }

        // Update the quantity of the item
        order.items[itemIndex].quantity = newQuantity;

        // Save the updated order
        await order.save();

        // Optionally, populate the updated item's information if required.
        const updatedItem = order.items[itemIndex];
        const populatedItem = await Cuisine.populate(updatedItem, { path: 'cuisine' });

        res.status(200).json({
            message: 'Item quantity updated successfully.',
            item: populatedItem  // or just use updatedItem if you don't need to populate
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

// Delete the item
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
                await order.deleteOne();
                await Table.updateOne({ id: table }, { $set: { currStatus: "vacant" } });
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

// complete order
router.post("/order/complete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const findOrder = await Order.findById(id);
        if (!findOrder) {
            return res.status(401).json({ message: "Did not find Order" });
        }

        const result = await Order.findByIdAndUpdate(
            id,
            {
                status: "Completed",
                paymentStatus: "Paid",
                paymentDetails: "Cash"
            },
            { new: true }
        );

        const tableId = findOrder.table;

        const updateTable = await Table.findOneAndUpdate(
            { id: tableId },
            { currStatus: "vacant" },
            { new: true }
        );

        if (!updateTable) {
            return res.status(401).json({ message: "Table not found" });
        }

        console.log(result);
        return res.status(200).json({ message: "success", result, updateTable });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});







module.exports = router