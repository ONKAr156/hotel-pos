const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
require("dotenv").config();
const adminRoutes = require('./routes/adminRoutes.js')
const waiterRoutes = require('./routes/waiterRoutes.js')

const app = express()
const mongoString = process.env.DATABASE_URL;

const corsOptions = {
    origin: 'http://localhost:5173', // or use '*' to allow all origins
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(express.json());
  app.use(cors(corsOptions))


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


