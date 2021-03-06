if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
  }
const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout','layouts/layout')  
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://usman:usman123@cluster0.g5bys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    {useUnifiedTopology: true, useNewUrlParser: true})

const db=mongoose.connection
db.on('error',error => console.error(error))
db.once('open',() => console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.listen(process.env.Port || 3000)