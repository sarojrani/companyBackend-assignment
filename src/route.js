const express=require("express");
const Controller=require('./Conroller');
const route=express.Router()

route.post('/user',Controller.userContact)
route.get('/list',Controller.listContactUser)
route.get('/filter',Controller.filterContact)
route.put('/update/:id',Controller.updateContact)
route.delete('/delete/:id',Controller.deleteContact)


module.exports=route;