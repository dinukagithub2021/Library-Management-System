const express = require("express");
const path = require("path")
const cors = require("cors")
require("dotenv").config();

const bookCollection = require("./routes/books")
const userRoutes = require("./routes/user")
const librarianRoute = require("./routes/librarian")
const preOrdersRoute = require("./routes/preOrder")
const mongoose = require("mongoose");

const app = express();

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/books',bookCollection)
app.use('/api/user', userRoutes)
app.use('/api/librarian', librarianRoute)
app.use('/api/preorders', preOrdersRoute)

mongoose.connect(process.env.CODE)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })

