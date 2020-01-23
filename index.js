const express=require('express')
const bodyparser=require('body-parser')
// const path=require('path')
const app=express()
const path=require('path')
// const public=path.join(__dirname,'public')
const routes=require('./routes/route')
const hbs=require('hbs')

//connect to  database 
require('./db/connect')
const public=path.join(__dirname,'public')
const view =path.join(__dirname,'views')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json({ extended: false }))
//serving static files
app.use(express.static(public))
 app.set('view engine','hbs')
 app.set('views',view)

app.use(express.static(public))

app.use(routes)

app.listen('3000',()=>{
    console.log("connected")
})