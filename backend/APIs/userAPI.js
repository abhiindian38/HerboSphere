//create http server

//create mini express module
let exp = require("express");
const {Db} = require('mongodb')
const userApp = exp.Router();
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tokenVerify = require('../middlewares/tokenVerify.js')
const expressAsyncHandler = require('express-async-handler')

require('dotenv').config()

//add body parser middleware
userApp.use(exp.json());



//route for creating a user (public)
userApp.post("/user", expressAsyncHandler(async(req, res) => {

  const usersCollection = req.app.get('usersCollection')
  const newUser = req.body;

  //verify duplicate user
  let existingUser  = await usersCollection.findOne({username:newUser.username});

  //if user already existed
  if(existingUser !==null) {
    res.send({message : "User already existed"})
  } else {
    //hash the password
    let hashedpassword = await bcryptjs.hash(newUser.password, 7)

    //replace plain password with hashed password in newUser
    newUser.password = hashedpassword;
    //save user
    await usersCollection.insertOne(newUser)
    //send res
    res.send({message : "user created"})
  }
}));

//route for update user (protected)
userApp.put("/user", tokenVerify,expressAsyncHandler(async(req, res) => {
  //get usersCOllection Obj
  const usersCollection = req.app.get("usersCollection")
  //get modified user from client
  let modifiedUser = req.body;
  //modify by username
  await usersCollection.updateOne({username:modifiedUser.username}, {$set : {...modifiedUser}})
  res.send({message : "user's modified"})
}));


//user login (public)
userApp.post("/login", expressAsyncHandler(async(req,res)=>{
  //get usersCollection obj
  const usersCollection = req.app.get('usersCollection')

  //get new userCredrentials from client
  const userCred = req.body;

  //verify username
  let dbUser = await usersCollection.findOne({username : userCred.username})

  //if user not existed
  if(dbUser===null){
    res.send({message:"Invalid Username"})
  }

  //if user found, compare with passwords
  else {
    let result = await bcryptjs.compare(userCred.password, dbUser.password)

    //if passwords  not matched
    if(result === false){
      res.send({message : "Invalid Password"})
    }
    
    //if passowrds are matched
    else{
      //create JWT Token
      let signedToken = jwt.sign({username:userCred.username},process.env.SECRET_KEY, {expiresIn: "1h"});


      //send res
      res.send({message : "login success", token : signedToken, user : dbUser})
    }
  }
}))




module.exports = userApp;