const mongoose = require("mongoose")

const tableSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true 
    },
    capacity: {
        type: Number,
        enum: [2, 4, 6, 8],
        required: true
    },
    currStatus: {
        type: String,
        enum: ["vacant", "occupied"],
        default: "vacant"
    }
})


module.exports = mongoose.model("Table", tableSchema)