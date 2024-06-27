const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/adminRoutes.js');
const waiterRoutes = require('./routes/waiterRoutes.js');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const mongoString = process.env.DATABASE_URL;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies)
    optionsSuccessStatus: 200
};

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.set('socketio', io);

server.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
});

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("connected", () => {
    console.log("Database Connected");
});

app.use('/api/admin', adminRoutes);
app.use('/api/waiter', waiterRoutes);

io.on("connection", (socket) => {
    console.log(`New socket connected: ${socket.id}`);
});