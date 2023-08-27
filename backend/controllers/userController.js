const User = require("../models/userModel")
const token= require("jsonwebtoken")

const createAToken = (_id) => {
    return token.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}



const loginUser = async(req,res) => {
    const {email,password} = req.body
    try {
        const user = await User.loginUser(email,password)
        const token = createAToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const signUpUser = async(req,res) => {
    const {name,age,telephone,birthday,admissionNo,address,email,password} = req.body
    try {
        const user = await User.signup(name,age,telephone,birthday,admissionNo,address,email,password)
        const token = createAToken(user._id)
        res.status(200).json({email, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {loginUser, signUpUser}