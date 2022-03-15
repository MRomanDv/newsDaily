const express = require('express')
const routes = express.Router()

routes.get('',(req,res)=>{
    res.render('index')
})

routes.get('/login',(req,res)=>{
    res.render('login')
})

routes.get('/signup',(req,res)=>{
    res.render('signup')
})

routes.get('/weather',(req,res)=>{
    res.render('weather')
})
module.exports = routes