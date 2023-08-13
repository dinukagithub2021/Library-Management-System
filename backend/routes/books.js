const express = require("express");
const Book = require("../models/book.js")

const router = express.Router();

router.get('/' , (req,res) => {
    //GET Books
})

router.get('/:id' , (req,res) => {
    //GET one book
})

router.post('/' ,async  (req,res) => {
    //Add Books
    const {name,author,copies,description} = req.body;
    try{
        const book = await Book.create({name,author,copies,description});
        res.status(200).json(book);
    }catch(error){
        res.status(400).json("Error!");
    }
})

router.delete('/' , (req,res) => {
    //Delete Books
})

router.patch('/' , (req,res) => {
    //Update Books
})

module.exports = router;