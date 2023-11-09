const mongooose = require("mongoose")

const userSchema = new mongooose.Schema({
    userName:{type:String,required:true,unique :true},
    password :{type:String,required:true}
})

const User = mongooose.model("User",userSchema)

module.exports = User