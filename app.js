const express = require('express')
const app = express()
const bcrypts = require('bcryptjs')
const dotenv = require('dotenv').config('./env/.env')
const path = require('path')

//GET DATA
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//STATIC FILES 
app.use('/public', express.static('public'))
app.use('/public', express.static(path.join(__dirname + 'public')))

//VIEW ENGINE
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))

//ROUTES
const routes = require('./routes/routes')
app.use('/',routes)

//PORT
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('server on port ' + port)
})


