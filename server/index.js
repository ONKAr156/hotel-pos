const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser'); // Import cookie-parser
const adminRoutes = require('./routes/adminRoutes.js');
const waiterRoutes = require('./routes/waiterRoutes.js');

const app = express();
const mongoString = process.env.DATABASE_URL;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser()); // Use cookie-parser middleware

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});

// Database Connection
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

// Routes Connections
app.use('/api/admin', adminRoutes);
app.use('/api/waiter', waiterRoutes);