const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser')
const { env } = require('process');
const route=require('./src/route')

const app=express()

const port=process.env.port||3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://Suman-1432:Suman1432@cluster0.bkkfmpr.mongodb.net/AddressBookMDB", {
    useNewUrlParser: true
})
.then(() => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/',route)

app.listen(port,(err)=>{
    console.log("running on port no-"+`${port}`)
})