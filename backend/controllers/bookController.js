const mongoose = require("mongoose");
const Book = require("../models/bookModel.js")

const getAllBooks = async(req,res) => {
    const books = await Book.find({}).sort({createdAt : -1})

    res.status(200).json(books);
}

const getABook = async(req,res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectID.isValid(id)){
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
    const {title,author,copies,description,image} = req.body;
    try{
        const book = await Book.create({title,author,copies,description,image});
        res.status(200).json(book);
    }catch(error){
        res.status(400).json("Error!");
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
    res.status(200).json(currentBook);
}

const updateABook = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Book!'})
    }
    const currentBook = await Book.findByIdAndUpdate({_id : id} , {
        ...req.body
    })
    if(!currentBook){
        return res.status(404).json({error: 'No Such Book!'})
    }
    res.status(200).json(currentBook);
}

module.exports = {
    createABook,
    getABook,
    getAllBooks,
    deleteABook,
    updateABook
}