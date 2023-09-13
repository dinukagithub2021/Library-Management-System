const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    copies:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    coverImage:{
        type:String,
    }
}, {timestamps: true})

module.exports = mongoose.model("Book", bookSchema);