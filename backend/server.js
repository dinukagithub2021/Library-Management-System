const express = require("express");
require("dotenv").config();

const bookCollection = require("./routes/books.js")
const mongoose = require("mongoose");

const app = express();

app.use(express.json())
app.use('/api/books/',bookCollection)
mongoose.connect(process.env.CODE)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })
