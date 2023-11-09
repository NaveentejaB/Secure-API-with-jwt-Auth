require("dotenv").config()
const express = require("express")
const mongoose  = require("mongoose")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")

// to connect to local database
mongoose.connect("mongodb://localhost:27017/soniAssignDB",{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    family: 4,
})

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); //This line sets up an event listener for the 'error' event of the MongoDB database 
db.once('open', () => {   //sets up an event listener for the 'open' event of the MongoDB database 
    console.log('Connected to MongoDB');
});

// view == routes
// controller == pages
const authRoutes = require("./routes/authRoutes")
const bookRoutes =require("./routes/bookRoutes")
const refreshTokenRouter = require("./routes/refreshTokenRoutes")

app.use("/auth",authRoutes)
app.use("/",refreshTokenRouter)
app.use("/user",bookRoutes)
 

app.listen(3000,()=>{
    console.log('server running on port 3000');
})