const mongoose = require("mongoose")
const Book = require("./bookModel")
const User = require("./userModel")

const Schema = mongoose.Schema;

const preOrdersSchema = new Schema({
    currentBook: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    currentUser: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    isGiven:{
        type: Boolean,
        required: true
    },
    isReturned: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("PreOrder", preOrdersSchema)