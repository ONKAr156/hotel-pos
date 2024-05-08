const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waiterSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    current_address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: 0
    },
    age: {
        type: Number,
        default: 0
    },
    userRole: {
        type: String,
        default: 'Waiter'
    }
}, { timestamps: true });

module.exports = mongoose.model('Waiter', waiterSchema); 