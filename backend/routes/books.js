const {
    createABook,
    getABook,
    getAllBooks,
    deleteABook,
    updateABook
} = require("../controllers/bookController.js")

const express = require("express");
const Book = require("../models/bookModel.js")

const router = express.Router();

router.get('/' , getAllBooks)

router.get('/:id' , getABook)

router.post('/' , createABook)

router.delete('/:id' , deleteABook)

router.patch('/:id' , updateABook)

module.exports = router;