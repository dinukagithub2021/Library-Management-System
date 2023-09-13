const jwt = require('jsonwebtoken')
const Librarian = require("../models/librarianModel")

const requireAuth = async (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:'Authoriztion Token REQUIRED!'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await Librarian.findOne({_id}).select("_id")
        next()
    }catch (error){
        console.log("error" + error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireAuth