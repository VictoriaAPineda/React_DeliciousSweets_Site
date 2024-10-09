const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

const Product = require('./models/product')

// Connects to MongoDB
const dbURI = 'mongodb+srv://Victoria:1234AdminMDB@delicioussweetscluster.v5stmxn.mongodb.net/DeliciousSweetsDB?retryWrites=true&w=majority&appName=DeliciousSweetsCluster'

mongoose.connect(dbURI)
    .then((result)=> {
        app.listen(5000)
        console.log('connected to the database')
    })
    .catch((err) => console.log(err))



// Get Products from db (testing)
app.get('/products', (req, res)=>{
    Product.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})




// const bodyParser = require('body-parser') // for form posting
// const router = require('./routes/router')

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))

// const corsOptions = {
//     origin:'*',
//     credentials: true,
//     optionSuccessStatus: 200
// }
// app.use(cors(corsOptions))
// app.use('/', router)


// app.listen(5000);

// const port = 4000 // frontend runs on port 5173
// const server = app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`)
// })
