const express = require('express') // Helps in managing routes
const mongoose = require('mongoose') // Connects and communicates with MongoDB 
const cors = require('cors'); // Ability to access our server from different domains
const app = express();

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

// Note: Reload server to see changes or else get error: CANNOT GET/

// Get product data from 'products' url resource
app.get('/products', (req, res)=>{
    Product.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})
// Get review data from 'reviews' url resource
app.get('/reviews', (req, res) =>{
    Review.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})

// TODO: Add a way to post a review

// Get email data from 'emails' url resource
app.get('/emails', (req, res) =>{
    Email.find()
    .then((result) => {
        res.json(result)
    })
    .catch((err) =>{
        console.log(err)
    })
})
// Post (send) emails to 'emails' url resource to be stored ( localhost:5000/emails )
app.post('/emails', async (req, res) => {
    try{
        const email = new Email(req.body); // 
        await email.save()
        res.json(email)
    }catch(err){
        console.log(err)
    }
})
// Post orders of customer to 'orders' url resource
app.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save()
        res.json(order)
    } catch (error) {
        console.log()
    }
})