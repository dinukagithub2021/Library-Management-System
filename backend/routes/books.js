const {
    createABook,
    getABook,
    getAllBooks,
    deleteABook,
    updateABook
} = require("../controllers/bookController.js")

const express = require("express");
const multer = require("multer")
const upload = multer({dest: "uploads/"})
const Book = require("../models/bookModel.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();


router.get('/' , getAllBooks)

router.get('/:id' , getABook)

router.post('/' , requireAuth, upload.single('coverImage'),createABook)

router.delete('/:id' , requireAuth, deleteABook)

router.patch('/:id' , requireAuth, updateABook)



module.exports = router;