const express = require("express")
const cors = require("cors")
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const {
    body,
    validationResult
} = require('express-validator');
const auth = require("./auth")
const mongoose = require('mongoose');
var multer = require('multer');
var upload = multer();
const {
signIn, getQuestion,submit,createAnswerProfile
} = require('./db');

mongoose.connect("mongodb://localhost:27017/IETE", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', function () {
    console.log("Connected to Database")
});

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(upload.array());
app.use(express.static('public'));


app.get("/questions",async (req,res)=>{
    let d=await getQuestion()
    res.json(d)
})

app.post("/answers",async (req,res)=>{
    await submit(req.body)
    res.json({"status":true})
})


app.post("/signin",async (req,res)=>{
    let d=await signIn(req.body.email,req.body.password);
    //console.log("data",d)
    if(d.length>0)
    {
        await createAnswerProfile(d[0]["email"],d[0]["name"],d[0]["password"])
        return res.json({status:true,data:d[0]})
    }
    else
    {
        return res.json({status:false})
    }
})



app.get('*', function (req, res) {
    res.status(404).send('What??? This is a wrong endpoint...');
});

app.post('*', function (req, res) {
    res.status(404).send('What??? This is a wrong endpoint...');
});

app.listen(5000, () => {
    console.log("Server is Running at URL : http://localhost:" + 5000)
})