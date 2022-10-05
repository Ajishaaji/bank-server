//import mongoose
const mongoose=require('mongoose')

//to connecting server with db
mongoose.connect('mongodb://localhost:27017/bank',()=>{
    console.log('Mongodb connected');

})

//create a model/collection

const User=mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})


//export
module.exports={
    User
}