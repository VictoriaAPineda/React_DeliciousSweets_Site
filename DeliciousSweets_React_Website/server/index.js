const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); // Ability to access our server from different domains
const app = express();
// require('react-dotenv').config();
// const process = require('process')
// const env = process.env;


// const { urlencoded } = require('body-parser');
// For Form Posting to Server
const bodyParser = require('body-parser') 
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const corsOptions = {
    origin:'*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))

// console.log("Key?")
// const key = import.meta.env.VITE_MONGODB_KEY;
// console.log(key)

const Product = require('./models/product')
const Review = require('./models/review');
const Email = require('./models/email');
const Order = require('./models/order');

// Connects to MongoDB
const dbURI = 'mongodb+srv://Victoria:1234AdminMDB@delicioussweetscluster.v5stmxn.mongodb.net/DeliciousSweetsDB?retryWrites=true&w=majority&appName=DeliciousSweetsCluster'

// NOTE: Will need an accpetable IP to view/use data

mongoose.connect(dbURI)
    .then((result)=> {
        app.listen(5000)
        console.log('connected to the database')
    })
    .catch((err) => console.log(err))

// Note: Reload server to see changes or else get error CANNOT GET/
// Get Products from db 
// What is retrieved is stored into the /products resource url
app.get('/products', (req, res)=>{
    Product.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
// Get Review from db
app.get('/reviews', (req, res) =>{
    Review.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

// get emails
app.get('/emails', (req, res) =>{
    Email.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

// To post to emails db
app.post('/emails', async (req, res) => {
    try{
        const email = new Email(req.body);
        await email.save()
        res.json(email)
    }catch(err){
        console.log(err)
    }
})
// Post Orders of customer
app.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        console.log(order)
        await order.save()
        res.json(order)
    } catch (error) {
        console.log()
    }
})