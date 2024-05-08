const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    resturant_Name: {
        type: String,
        required: true
    },
    resturant_Address: {
        type: String,
        required: true
    },
    resturant_PhoneNumber: {
        type: Number,
        required: true
    },
    userRole: {
        type: String,
        default: 'Admin'
    }
})


module.exports = mongoose.model('Admin', adminSchema); 