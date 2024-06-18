const express = require("express");
const router = express.Router();
const Waiter = require("../model/waiter");
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const Table = require("../model/Table");
const Cuisine = require("../model/Cuisine");
const Order = require("../model/Order");
const { validateAdmin } = require("../middelweare/userRole");

// Create admin ----------------------------------------------------------
router.post('/create-admin-details', async (req, res) => {
    const { password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const admin = await Admin.create({ ...req.body, password: hashPassword })
        return res.status(201).json({ message: "welcome to the Portal", admin })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})
// Admin Login ------------------------------------------------------------
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const adminLogin = await Admin.findOne({ email });
        if (!adminLogin) {
            return res.status(400).json({ message: 'Email is incorrect' });
        }

        const passwordMatch = await bcrypt.compare(password, adminLogin.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            userId: adminLogin._id,
            role: adminLogin.userRole,
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1hr
        });

        return res.status(200).json({
            message: 'Login successful',
            adminLogin: {
                _id: adminLogin._id,
                name: adminLogin.firstName, // Assuming firstName as name
                email: adminLogin.email,
                role: adminLogin.userRole,
            },
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Admin Logout -------------------------------------------------------------
router.post('/logout', (req, res) => {
    // Verify the token before logout
    const token = req.cookies.token;
    console.log("Logout token:", token); // Add logging
    if (token) {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({ message: 'Logout successful' });
    } else {
        return res.status(400).json({ message: 'No active session' });
    }
});

// ------------------------------------------------------------------------------


// Waiters

// Fetch all waiters  --------------------------------------------------------
router.get('/fetch-waiter',  async (req, res) => {
    try {
        // Fetch all waiter from the MongoDB collection
        const waiter = await Waiter.find();
        res.status(200).json({ message: 'fetch successfull', waiter });

    } catch (error) {
        console.error('Error fetching waiter data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch single waiter --------------------------------------------------------
router.get('/fetch-waiter/:id', async (req, res) => {
    const { id } = req.params
    try {
        // Fetch all waiter from the MongoDB collection
        const waiter = await Waiter.findById(id);
        res.status(200).json({ message: 'fetch successfull', waiter });

    } catch (error) {
        console.error('Error fetching waiter data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add new Wiaters -------------------------------------------------------------
router.post('/add-waiter', async (req, res) => {
    const { password, email, } = req.body
    try {
        const checkExistingWaiterEmail = await Waiter.findOne({ email: email })

        if (checkExistingWaiterEmail) {
            return res.status(401).json({ message: "Email already existed" })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const newWaiter = await Waiter.create({ ...req.body, password: hashPassword })
        return res.status(201).json({ message: "Waiter created successfully", newWaiter })
    } catch (error) {
        return res.status(500).json({ message: 'Somethingwent wrong', error: error.message })
    }
})

// Update waiter data
router.post('/update-waiter/:id', async (req, res) => {
    const { id } = req.params;
    const { password, email } = req.body;

    try {
        const waiterData = await Waiter.findById(id);
        if (!waiterData) {
            return res.status(404).json({ message: "Waiter not found" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const updatedWaiter = await Waiter.findByIdAndUpdate(id, {
            ...req.body,
            password: hashPassword
        }, { new: true });

        // Check if updating was successful
        if (!updatedWaiter) {
            return res.status(404).json({ message: "Unable to update waiter" });
        }

        return res.status(200).json({
            message: "Waiter updated successfully",
            waiter: updatedWaiter
        });
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
});


// Delete  waiter  ⚠⚠⚠
router.delete('/remove-waiter/:id', async (req, res) => {
    const { id } = req.params
    try {
        const remove_Waiter = await Waiter.findByIdAndDelete(id)
        return res.status(200).json({ message: "Waiter Deleted successfully", remove_Waiter })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})

// ------------------------------------------------------------------------------

// Table 

// Get all table 

router.get("/get-all-tables", async (req, res) => {
    try {
        const allTables = await Table.find({})
        res.status(201).json(allTables);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// add New Table
router.post("/add-new-Table", async (req, res) => {
    try {
        // Find the table with the highest `id`
        const lastTable = await Table.findOne().sort({ id: -1 }); // Sort in descending order by `id`

        // Increment the `id` if a table is found, otherwise start from 1
        let newId;
        if (lastTable) {
            const lastIdNumber = parseInt(lastTable.id, 10); // Parse last `id` to integer
            if (isNaN(lastIdNumber)) {
                return res.status(500).json({ message: "Failed to parse the last table ID" });
            }
            newId = (lastIdNumber + 1).toString(); // Increment and convert back to string
        } else {
            newId = '1'; // Start from '1' if no table exists
        }

        // Create a new table with the incremented `id`
        const newTable = new Table({
            id: newId,
            capacity: req.body.capacity,
            // Add any other required fields here
        });

        await newTable.save();

        // Respond with the created object
        return res.status(201).json(newTable);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// Update Table capacity
router.put('/update-table/:id', async (req, res) => {
    const tableId = req.params.id;
    const newCapacity = req.body.capacity;

    try {
        const updatedTable = await Table.findOneAndUpdate(
            { _id: tableId }, // Using MongoDB's default _id field
            { capacity: newCapacity },
            { new: true, }
        );

        if (!updatedTable) {
            return res.status(404).send('Table not found with id ' + tableId);
        }

        // Send back the updated table data
        res.status(200).json(updatedTable);
    } catch (error) {
        // Handle any other errors
        res.status(500).send(error.message);
    }
});

router.delete("/delete-table/:id", async (req, res) => {
    const { id } = req.params
    try {
        const deleteTable = await Table.findByIdAndDelete(id)
        res.status(200).json({ message: 'Table deleted successfully', deleteTable });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


// ------------------------------------------------------------------------------

// ##Cousine

// Get all products

router.get("/item", async (req, res) => {
    try {
        const allProducts = await Cuisine.find({})
        if (!allProducts) {
            return res.status(401).json({ message: "Error while fetching data" })
        }
        return res.status(200).json({ message: "Fetch success", allProducts })
    } catch (error) {

    }
})


// add new Product
router.post("/add-new-item", async (req, res) => {
    try {
        const newItem = await Cuisine.create(req.body)
        return res.status(201).json({ message: "New Item added", newItem })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})

// Update new product
router.put('/update-item/:id', async (req, res) => {
    const { id } = req.params;
    const updates = { product_name, category, price } = req.body;

    try {
        const product = await Cuisine.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Update success", product });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// delete Product ⚠⚠⚠
router.delete('/delete-item/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await Cuisine.findByIdAndDelete(id)
        if (!product) {
            return res.status(401).json({ message: "Product not found" })
        }
        return res.status(200).json({ message: "Item deleted sucessfully", product })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong", error: error.message })
    }
})



// Order
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

router.get("/order/previous", async (req, res) => {
    try {
        const { page = 1, dateFilter } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = 5; // Fixed limit to 5

        const query = { status: "Completed" };

        if (dateFilter) {
            const today = new Date();
            let filterDate;
            let startDate;
            let endDate = new Date(today.setHours(23, 59, 59, 999)); // End of today

            switch (dateFilter) {
                case 'today':
                    filterDate = new Date();
                    startDate = new Date(filterDate.setHours(0, 0, 0, 0));
                    break;
                case 'yesterday':
                    filterDate = new Date();
                    startDate = new Date(filterDate.setDate(filterDate.getDate() - 1));
                    startDate.setHours(0, 0, 0, 0);
                    endDate = new Date(startDate);
                    endDate.setHours(23, 59, 59, 999);
                    break;
                case '7days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 7);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case '15days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 15);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case '30days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 30);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case '60days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 60);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                case '90days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 90);
                    startDate.setHours(0, 0, 0, 0);
                    break;
                default:
                    return res.status(400).json({ message: 'Invalid date filter' });
            }

            query.orderPlacedTime = {
                $gte: startDate,
                $lt: endDate,
            };
        }

        const orders = await Order.find(query)
            .populate('items.cuisine')
            .sort({ _id: -1 }) // Sorting by _id in descending order
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber);

        const totalOrders = await Order.countDocuments(query);

        return res.status(200).json({
            currentPage: pageNumber,
            totalPages: Math.ceil(totalOrders / limitNumber),
            totalOrders: totalOrders,
            orders: orders
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
});

module.exports = router