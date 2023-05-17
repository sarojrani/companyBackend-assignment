const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
   type:String,
 required:true
    },
    mobileNo:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    
},{timestamps:true}
)
module.exports =mongoose.model('user', userSchema)
