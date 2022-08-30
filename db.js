const {
    Login,
    Question,
    Answer
} = require("./model.js");
var bcrypt = require('bcryptjs');

const submit= (data)=>{
  
     Answer.updateOne({email:data["email"],name:data["name"],contact:data["contact"]},{marks:data["marks"],options:data["options"]},function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            //console.log("Updated Docs : ", docs);
        }
    }
    )
  
}

const getQuestion=async()=>{
   let d=await Question.find()
   return d
}


const signIn=async (email,password)=>{
    let data=await Login.find({email:email,password:password});
    return data;
}

const createAnswerProfile=async (e,n,c)=>{
    try {
        let d=await Answer.create({email:e,name:n,contact:c})
        //console.log(d)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    signIn,getQuestion,submit,createAnswerProfile
}
