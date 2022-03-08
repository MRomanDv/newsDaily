const express = require('express')
const app = express()
const bcrypts = require('bcryptjs')
const dotenv = require('dotenv').config({path:'./env/.env'})
const path = require('path')
const ejs = require('ejs') 

//connection
const connection = require('./database/db')

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

//SIGNUP 
app.post('/signup', async(req,res)=>{
    const {name,lastname,email,tel,user,pass}=req.body

    const passwordHashed = await bcrypts.hash(pass,8)
    connection.query('INSERT INTO newsDaily SET ?', {name_:name,lastname_:lastname,email:email,tel:tel,user_:user,password_:passwordHashed},async(error,result)=>{
        if(error) {
            console.log(error)
        }else {
            res.render('signup',{
                alert:true,
                alertTitle:"Registration",
                alertMessage:"¡Successful Registration!",
                alertIcon:"success",
                showConfirmButton:false,
                timer:1500,
                ruta:''
            })
        }
    })
})


//LOGIN
app.post('/login',async(req,res)=>{
    const {user,pass} = req.body;
    let passwordHashed = await bcrypts.hash(pass,8)

    if(user && pass) {
        connection.query('SELECT * FROM newsDaily WHERE user_ = ?', [user], async (error,result)=>{
            if(result.length == 0 || !(await bcrypts.compare(pass, result[0].password_))) {
                res.render('login',{
                    alert:true,
                    alertTitle:"Error",
                    alertMessage:"invalid User/password",
                    alertIcon:"error",
                    showConfirmButton:true,
                    timer:false,
                    ruta:'login' 

                })
            }else {
                res.render('login', {
                    alert:true,
                 alertTitle:"Successful log in",
                 alertMessage:"¡WELCOME TO daily News!",
                 alertIcon:"success",
                 showConfirmButton:false,
                 timer:1500,
                 ruta:'' 
                })

            }
        })
    }else {
        res.render('login',{
          alert:true,
          alertTitle:"Advertencia",
          alertMessage:"Porfavor ingrese un Usuario y password",
          alertIcon:"warning",
          showConfirmButton:true,
          timer:false,
          ruta:'login'
        })
     }
})






//PORT
const port = process.env.PORT || 3000 
app.listen(port,()=>{
    console.log('server on port ' + port)
})


