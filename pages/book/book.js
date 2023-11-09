const Book = require("../../model/book_model")

// to get all books
const getAllBooks = async(req,res)=>{
    try{
        const books =await Book.find()
        res.status(200).json({
            books:books,
            message:"successfully sent all books",
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//to get specific book by its unique title
const getSpecificBook = async(req,res)=>{
    try{
        const id = req.params.id
        const book =await Book.findOne({ bookID : id })
        res.status(200).json({
            book:book,
            message:`book with id ${id} fetched`,
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//to add new book
const addNewBook = async(req,res)=>{
    const { name, id, author } = req.body
    try{
        const newBook = new Book({
            bookName : name,
            bookID : id,
            bookAuthor : author
        })
        const bookExist = await Book.findOne({bookID : id})
        if(bookExist){
            res.status(200).json({
                message:`book with id ${id} already exists, add new unique title`,
                success:false
            })
        }else{
            newBook.save()
            const book = await Book.findOne({bookID : id})
            res.status(200).json({
                newBook : book,
                message:`book with id ${id} added`,
                success:false
            })
        }  
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//update the existing book
const updateBook = async(req,res)=>{
    const { name, id, author} = req.body
    try{
        const newBook = {
            bookName : name,
            bookID : id,
            bookAuthor : author
        }
        const findBookTitle = await Book.findOne({bookID : id})
        if(findBookTitle){
            res.status(500).json({
                message:`book with the id ${id} exists. Please try different id`,
                success:false
            })
        }else{
            const updatedBook =await Book.findOneAndUpdate({bookID : id} ,newBook)
            res.status(200).json({
                updatedBook : newBook,
                success:true,
                message:`successfully updated the book details with id ${id}`
            })
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

//to delete the book
const deleteBook = async(req,res)=>{
    try{
        const id = req.params.id
        const deletedBook =await Book.findOneAndDelete({bookID : id})
        res.status(200).json({
            deletedBook:deletedBook,
            message:`book with id ${id} deleted`,
            success:true
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
            success:false
        })
    }
}

module.exports = {getAllBooks,getSpecificBook,addNewBook,updateBook,deleteBook}