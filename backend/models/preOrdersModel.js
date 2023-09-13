const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const preOrdersSchema = new Schema({
    book_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    isReturned: {
        type: Boolean,
        required: true

    }
}, {timestamps: true})

module.exports = mongoose.model("PreOrder", preOrdersSchema)