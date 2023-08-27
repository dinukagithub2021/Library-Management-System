const express = require("express")
const {loginUser, signUpUser} = require("../controllers/userController")
const UserRouter = express.Router()

UserRouter.post("/login", loginUser)

UserRouter.post("/signup", signUpUser)


module.exports = UserRouter