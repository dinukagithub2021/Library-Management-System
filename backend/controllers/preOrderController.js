const mongoose = require("mongoose")
const preOrder = require("../models/preOrdersModel")
const Book = require("../models/bookModel")
const User = require("../models/userModel")

const getAllPreOrders = async(req,res) => {
    const preOrders = await preOrder.find({}).sort({createdAt : -1})

    res.status(200).json(preOrders);
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
   const {book_id, userToken, isReturned} = req.body
   const user_id = parseJwt(userToken)
   try{
        const currentOrders = await preOrder.find({user_id: user_id})
        if(currentOrders.length > 0){
            return res.status(400).json("One user can preorder one book at a time!")
        }
        console.log(book_id, user_id, isReturned)
        const preORDER = await preOrder.create({book_id, user_id , isReturned})
        res.status(200).json(preORDER)
   }catch(error){
        res.status(400).json("Submission Error!")
   }
}

const deleteAPreOrder = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Order Put!'})
    }
    const currentOrder = await preOrder.findOneAndDelete({_id: id})
    if(!currentOrder){
        return res.status(404).json({error: 'No Such Order Put'})
    }
    res.status(200).json(currentOrder);
}

const getCurrentOrders = async (req, res) => {
    try {
      const currentOrders = await preOrder.find({}).sort({ isReturned: false }).lean();
  
      if (!currentOrders || currentOrders.length === 0) {
        return res.status(200).json({ message: "No current orders!" });
      }
  
      const preOrderCollection = await Promise.all(
        currentOrders.map(async (currentOrder) => {
          const currentBook = await Book.findById(currentOrder.book_id).lean();
          const currentUser = await User.findById(currentOrder.user_id).lean();
          const orderInfo = {
            currentBook,
            currentUser,
            _id: currentOrder._id
          };
          
          return orderInfo;
        })
      );
      res.status(200).json(preOrderCollection);
    } catch (error) {
      console.error("Error fetching current orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
const updateAPreOrder = async(req,res) => {
    const {id} = req.params
    try{
        const updatedPreOrder = preOrder.findByIdAndUpdate(
            id,
            {isReturned: true},
            {new: true}
        )
        if(!updatedPreOrder) {
            return res.status(404).json({ message: 'Preorder not found' });
          }
      
        res.status(200).json(updatedPreOrder);
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
    getCurrentOrders,
    updateAPreOrder
}