const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const Librarian = require("../models/librarianModel")

const requireUserAuth = async (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:'Authoriztion Token REQUIRED!'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        console.log(_id)
        const user = await User.findOne({ _id });
        const librarian = await Librarian.findOne({ _id });
        console.log(user, " ", librarian)
    
        if (user || librarian) {
          req.user = user || librarian;
          next();
        } else {
          res.status(401).json({ error: 'Request is not authorized :-)' });
        }
    }catch (error){
        console.log("error" + error)
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireUserAuth