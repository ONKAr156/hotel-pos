const express = require("express");
const router = express.Router();
const Waiter = require("../model/waiter");
const bcrypt = require("bcrypt");
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
const Table = require("../model/Table");
const Cuisine = require("../model/Cuisine");

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
            secure: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000 // 1hr
        });

        return res.status(200).json({
            message: 'Login successful',
            adminLogin: {
                _id: adminLogin._id,
                name: adminLogin.name,
                email: adminLogin.email,
            },
            token
        });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Admin Logout -------------------------------------------------------------
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

// ------------------------------------------------------------------------------


// Waiters

// Fetch all waiters  --------------------------------------------------------
router.get('/fetch-waiter', async (req, res) => {
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
        // First, find the table with the highest `id`
        const lastTable = await Table.findOne().sort('-id'); // Sort in descending order by `id`

        // If a table is found, increment the `id`. Otherwise, start from 1.
        const newId = lastTable ? lastTable.id + 1 : 1;

        // Create a new table with the new `id`
        const newTable = new Table({
            id: newId,
            capacity: req.body.capacity,
        });

        await newTable.save();

        // Respond with the created object
        res.status(201).json(newTable);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
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
            { new: true,} 
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


module.exports = router