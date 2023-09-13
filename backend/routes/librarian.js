const express = require("express")
const {loginLibrarian} = require("../controllers/libController")
const librarianRouter = express.Router()

librarianRouter.post("/login", loginLibrarian)

module.exports = librarianRouter