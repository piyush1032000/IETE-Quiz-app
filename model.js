const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
})

const Login = mongoose.model('Login', loginSchema);

const questionSchema=new Schema({
    uid:{
        type:Number,
        required:true,
    },
    problem:{
        type:String,
        required:true
    },
    solution:{
        type:Array,
        required:true
    },
    correct:{
        type:Number,
        required:true
    }
   
})


const Question=mongoose.model('Question', questionSchema)

const answerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type:String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        unique:true
    },
    marks:{
        type:Number,
        default:0
    },
    options:{
        type:Array,
        default:[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
    }
})

const Answer = mongoose.model('Answer', answerSchema);

module.exports = {
    Login,
    Question,
    Answer
}
