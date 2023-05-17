const express=require("express");
const Controller=require('./Conroller');
const route=express.Router()

route.post('/user',Controller.userContact)
route.get('/list',Controller.listContactUser)
route.get('/filter',Controller.filterContact)
route.put('/update/:userId',Controller.updateContact)
route.delete('/delete/:userId',Controller.deleteContact)


module.exports=route;