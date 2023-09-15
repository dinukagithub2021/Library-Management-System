const mongoose = require("mongoose");
const Book = require("../models/bookModel.js")
const preOrder = require("../models/preOrdersModel.js")

const getAllBooks = async(req,res) => {
    const books = await Book.find({}).sort({createdAt : -1})

    res.status(200).json(books);
}

const getABook = async(req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Book!'})
    }
    const currentBook = await Book.findById(id);
    if(!currentBook){
        return res.status(404).json({error: 'No Such Book!'})
    }
    res.status(200).json(currentBook);
}

const createABook = async(req,res) => {
    //Add Books
    const {title,author,copies,description} = req.body;
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a cover image' });
    }
    const coverImage = req.file.path
    try{
        const book = await Book.create({title,author,copies,description,coverImage,remainingCopies: copies});
        res.status(200).json(book);
    }catch(error){
        res.status(400).json("Fill all the information");
    }
}

const deleteABook = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Book!'})
    }
    const currentBook = await Book.findOneAndDelete({_id: id})
    if(!currentBook){
        return res.status(404).json({error: 'No Such Book!'})
    }
    const deletePreorders = await preOrder.findById(id)
    if(deletePreorders){
        deletePreorders.map((deleteorder) => {
            const deletedOrder = preOrder.findByIdAndDelete(deleteorder._id);
            if(!deletedOrder){
                return res.status(404).json("Error in deleting!")
            }
        })
    }
    res.status(200).json(currentBook);
}

const updateABook = async(req,res) => {
    const {id} = req.params;
    const {title, author, copies, description, remainingCopies} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        console.log("hi!!!!!!!!")
        return res.status(404).json({error: 'No Such Book!'})
    }
    const preOrderCount = await preOrder.find({currentBook: id})
    const numberOfPreOrder = preOrderCount.length
    if(title || author || copies || description){
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,author,copies,description, remainingCopies: copies - numberOfPreOrder
        }, {new: true})
        if(!updatedBook){
            console.log("bye!!!!!!!!!!")
            return res.status(404).json({error: 'No Such Book!'})
        }

        res.status(200).json(updatedBook);

    }else if(remainingCopies){
        const updatedBook = await Book.findByIdAndUpdate(id, {
            remainingCopies
        }, {new: true})

        if(!updatedBook){
            return res.status(404).json({error: 'No Such Book!'})
        }

        res.status(200).json(updatedBook);
    }
    
}

module.exports = {
    createABook,
    getABook,
    getAllBooks,
    deleteABook,
    updateABook
}