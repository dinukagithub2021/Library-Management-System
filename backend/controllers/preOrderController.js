const mongoose = require("mongoose")
const preOrder = require("../models/preOrdersModel")
const Book = require("../models/bookModel")
const User = require("../models/userModel")

const getAllPreOrders = async(req,res) => {
    const preOrders = await preOrder.find({}).sort({createdAt : -1})
    for (let preOrder of preOrders){
      preOrder = await preOrder.populate("currentBook")
      preOrder = await preOrder.populate("currentUser")
    }
    res.status(200).json(preOrders)
    
}


const getAPreOrder = async(req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Order Put!'})
    }
    const currentBook = await preOrder.findById(id);
    if(!currentBook){
        return res.status(404).json({error: 'No Such Order Put!'})
    }
    res.status(200).json(currentBook);
}

function parseJwt(token) {
    console.log("token is: " , token)
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }

const createAPreOrder = async(req,res) => {
    console.log("Request arrived!")
   const {book_id, userToken, isGiven, isReturned} = req.body
   const user_id = parseJwt(userToken)
   const user = await User.findById(user_id)
   
   console.log("Parsed!")
   try{
        const currentOrder = await preOrder.find({currentUser: user, isReturned: false})
        const currentBookRelevant = await Book.findById(currentOrder._id)
        console.log("CurrentOrder: " , currentOrder)
        if(currentOrder.length > 0){
             return res.status(400).json("One user can preorder one book at a time!")
        }
        if(currentOrder.l)
        console.log("request arrived to here")
        const book = await Book.findById(book_id)
        console.log("Book : \n", Book)
        if(!book){
          return res.status(400).json("No Book!")
        }
        if(book.remainingCopies == 0){
          return res.status(400).json("Sorry! This Book is currently out of Stock")
        }
        console.log("request arrived to here again")
        // const BookOrders = await preOrder.find({currentBook: book, isReturned: false})
        // if(BookOrders.length == book.)
        console.log("currentOrder Info:", book_id, user_id)
        const currentBook = await Book.findById(book_id).lean();
        console.log("Book found")
        const currentUser = await User.findById(user_id).lean(); 
        console.log("user found")
        console.log(currentBook , currentUser, isReturned)
        let orderInfo = await preOrder.create({currentBook, currentUser, isGiven, isReturned})
        console.log("order created!")
        orderInfo = await orderInfo.populate('currentBook')
        orderInfo = await orderInfo.populate('currentUser')
        console.log(orderInfo);

        res.status(200).json(orderInfo)
   }catch(error){
        res.status(400).json("Submission Error!")
   }
}

const deleteAPreOrder = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Order Put!'})
    }
    const preorder = await preOrder.findById(id);
    console.log("preorder ", preorder)
    const relBook = await Book.findById(preorder.currentBook)
    const currentOrder = await preOrder.findOneAndDelete({_id: id})
    if(!currentOrder){
        return res.status(404).json({error: 'No Such Order Put'})
    }
    res.status(200).json({currentOrder, remainingCopies: relBook.remainingCopies + 1, relBook});
}

const getUserOrders = async (req, res) => {
    const user_id = req.user._id
    const user = await User.findById(user_id)
    console.log(user)
    try {
      const userCurrentOrders = await preOrder.find({currentUser: user._id, isReturned: false})
      console.log(userCurrentOrders)
      const preOrderCollection = await Promise.all(
        userCurrentOrders.map(async (userCurrentOrder) => {
          const currentBook = await Book.findById(userCurrentOrder.currentBook)
          const currentUser = await User.findById(userCurrentOrder.currentUser)
          const preOrderInfo = {
            currentBook,
            currentUser,
            isGiven: userCurrentOrder.isGiven,
            isReturned: false,
            _id: userCurrentOrder._id
          }
          return preOrderInfo
        })
      )

      res.status(200).json(preOrderCollection)
    } catch (error) {
      console.error("Error fetching current orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
const updateAPreOrder = async(req,res) => {
    const {id} = req.params
    const {isGiven, isReturned} = req.body
    try{
        const preorder = await preOrder.findById(id);
        console.log("preorder ", preorder)
        const relBook = await Book.findById(preorder.currentBook)
        let updatedPreOrder = await preOrder.findByIdAndUpdate(id, {isGiven: isGiven, isReturned: isReturned}, {new: true})
        updatedPreOrder = await updatedPreOrder.populate("currentUser")
        updatedPreOrder = await updatedPreOrder.populate("currentBook")
        if(!updatedPreOrder) {
            return res.status(404).json({ message: 'Preorder not found' });
          }
      
        res.status(200).json({updatedPreOrder, remainingCopies: relBook.remainingCopies, relBook});
        } catch (error) {
          console.error('Error updating the preorder:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
}


module.exports = {
    getAllPreOrders,
    getAPreOrder,
    createAPreOrder,
    deleteAPreOrder,
    getUserOrders,
    updateAPreOrder
}