//import and use express module
let exp = require('express')
const app = exp()

const cors = require('cors')
app.use(cors({
origin : 'http://localhost:5173'
}))
//import environment varaibles 
require('dotenv').config() //process.env.PORT
//import MongoClient
const {MongoClient} = require('mongodb');


//create MongoClient Object
let mClient = new MongoClient(process.env.DB_URL)
//connect to mongodb server
mClient.connect(). 
then((connectionObj)=>{
console.log("db connection success")

//connect to database(fsd)
const fsddb = connectionObj.db('plants');
//connect to a collection
const usersCollection = fsddb.collection('users')
const plantsCollection = fsddb.collection('learn_plants')
const communityCollection = fsddb.collection('community-remedies')
const petCollection = fsddb.collection('pet-concerns')


//share collection obj to APIs
app.set('usersCollection', usersCollection);
app.set('plantsCollection', plantsCollection);
app.set('communityCollection', communityCollection)
app.set('petCollection', petCollection)



//assign port number to http server of express app
app.listen(process.env.PORT, ()=>console.log("http server started on port 4000"))
}).
catch(err=>console.log("error in db connection", err))

//import userApp
const userApp =  require('./APIs/userAPI')
const plantApp = require('./APIs/plantAPI')
const commApp = require('./APIs/communityAPI')
const petApp = require('./APIs/petAPI')


app.use('/user-api', userApp)
app.use('/plant-api', plantApp)
app.use('/community-api', commApp)
app.use('/pet-api', petApp)




//handling invalid path
app.use('*', (req,res,next)=>{
    res.send({message : `Invalid Path`})
})

//error hadnling middleware
app.use((err,req,res,next)=>{
    res.send({message : "error occured", errorMessage :err.message})
})