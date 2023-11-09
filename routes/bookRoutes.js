const express = require("express")
const {getAllBooks,getSpecificBook,addNewBook,updateBook,deleteBook} = require("../pages/book/book")
const auth = require("../middleware/auth")

const bookRouter = express.Router()

bookRouter.get("/:username/books",auth,getAllBooks)

bookRouter.get("/:username/book/:bookID",auth,getSpecificBook)

bookRouter.post("/:username/add/book",auth,addNewBook)

bookRouter.patch("/:username/book/:bookID",auth,updateBook)

bookRouter.delete("/:username/book/:bookID",auth,deleteBook)


module.exports = bookRouter