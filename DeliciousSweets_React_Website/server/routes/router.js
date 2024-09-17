const express = require('express')
const router = express.Router()
//Testing data, actual data will be stored on MongoDB
router.get('/products', (req, res) =>{
    const productData = 
    [
        {
            "_id":{"$oid":"6668b8780654cee6165c0698"},
            "name":"Macaroons",
            "description":"Description for macaroons cookies",
            "price":{"$numberDouble":"15.0"},
            "category":"cookie",
            "image":"link to img",
            "specification":"Contains 12 cookies"
        },
        {
            "_id":{"$oid":"666cb05182fd9e2305ca8447"},
            "name":"Vanilla",
            "description":"Description for Vanilla cake",
            "price":{"$numberDouble":"23.99"},
            "category":"cake",
            "image":"link to img",
            "specification":"Contains 12 inch cake"
        }   
    ]
    res.send(productData)
})

module.exports = router;