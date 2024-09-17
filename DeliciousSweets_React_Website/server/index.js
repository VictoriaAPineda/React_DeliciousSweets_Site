const express = require('express')
/**
* Cross Orgin Resource Sharing - allows access to the server
* from different domains
**/
const cors = require('cors')
const bodyParser = require('body-parser') // for form posting
const router = require('./routes/router')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin:'*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router)




const port = 4000 // frontend runs on port 5173
const server = app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
