const userModel=require('./userModel')


//##########1st api##############//
const userContact=async(req,res)=>{
const data=req.body;
const {name,mobileNo}=data

let phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/

if (!name.trim().match(/^[a-zA-Z ]{2,30}$/))
return res.status(400).send({
    status: false,
    message: "name should only contain alphabet",
})

if (!mobileNo.trim().match(phoneRegex))
return res.status(400).send({ status: false, message: "Please enter valid pan -Indian phone number" })

const isRegisterPhone = await userModel.findOne({ mobileNo: mobileNo })

if (isRegisterPhone) return res.status(400).send({ status: false, message: "phone number is already registered" })

const storeData=await userModel.create(data)
return res.status(201).send({status:true,data:storeData})
}
//##########2nd api##############//
const listContactUser=async(req,res)=>{

    const data=await userModel.aggregate([{'$sort':{'name':1}}])
    
if(!data){
    return res.status(400).send({status:false,msg:"list is empty or first add contact"})
}
    return res.status(200).send({status:true,data:data})
}

const filterContact=async(req,res)=>{
  const data=req.query

  const {name,mobileNo}=data
 
  const MatchData=await userModel.aggregate([{$match:{$or:[{name:name},{mobileNo:mobileNo}]}}])
 if(!MatchData){
    return res.status(404).send({msg:"data not found"})
 }
  return res.status(200).send({status:true,data:MatchData})

}

//##########3rd api##############//
const updateContact=async(req,res)=>{
    const id=req.params.userId
    const {name,mobileNo}=req.body;

    if(!(req.body)){
        return res.status(400).send({msg:"give name or mobileNo for update"})
    }
    const saveData=await userModel.findOneAndUpdate({_id:id},{$set:{name,mobileNo}},{new:true})
    return res.status(200).send({status:true,data:saveData})
}

//##########4th api##############//
const deleteContact=async(req,res)=>{
    const id=req.params.userId
    const data=await userModel.findOneAndDelete({_id:id},{$set:{isDeleted:true}},{new:true})
    return res.status(200).send({msg:"deleted",data:data})
}

module.exports={listContactUser,userContact,filterContact,updateContact,deleteContact}