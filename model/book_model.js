const mongooose = require("mongoose")

const bookSchema = new mongooose.Schema({
    bookName:{type:String,required:true},
    bookID :{type:String,required:true,unique:true},
    bookAuthor :{type:String,required:true}
})

const Book = mongooose.model("Book",bookSchema)

module.exports = Book