const mongoose = require("mongoose")

const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    category: {
        type: String,
        required: true, 
        enum: ['Starter', 'MainCourse', 'Beverage', 'Dessert'] 
    },
    price: {
        type: Number,
        required: true 
    }



})


module.exports = mongoose.model("Cuisine", cuisineSchema)