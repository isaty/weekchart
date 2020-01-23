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
const view =patth.join(__dirname,'views')
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json({ extended: false }))
//serving static files
app.use(express.static(public))
 app.set('view engine','hbs')
 app.set('views',views)

app.use(express.static(public))

app.use(routes)
app.get('/',(req,res)=>{
    res.sendFile('D:/weekchart/public/index.html')
})


app.use(routes)
app.get('/',(req,res)=>{
    res.sendFile('C:/web/weekchart/public/index.html')
})
app.listen('3000',()=>{
    console.log("connected")
})