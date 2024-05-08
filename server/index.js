const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv").config();
const adminRoutes = require('./routes/adminRoutes.js')
const waiterRoutes = require('./routes/waiterRoutes.js')

const app = express()
const mongoString = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());


app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});


//Database Connection
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

//Routes Connections
app.use('/api/admin', adminRoutes);
app.use('/api/waiter', waiterRoutes);


