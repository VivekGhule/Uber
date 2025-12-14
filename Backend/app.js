require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express()
const cookieParser = require('cookie-parser')
const connectToDB = require('./db/db')
const userRoutes = require('./Routes/user.routes')
const captainRoutes = require('./Routes/captain.route')




connectToDB();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());





app.get('/', (req,res)=>{

    res.send("Hello World")
})

app.use('/users',userRoutes)
app.use('/captain',captainRoutes)


 



module.exports = app