const Librarian = require("../models/librarianModel")
const jwt = require("jsonwebtoken")

const createAToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}


const loginLibrarian = async(req,res) => {
    const {username, password} = req.body
    try{
        const librarian = await Librarian.loginLibrarian(username,password,true)
        const token = createAToken(librarian._id)
        res.status(200).json({username, token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {loginLibrarian}