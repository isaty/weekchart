const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/task',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true 
}).then(()=>{
    console.log("databse connection established")
}).catch(e=>{
console.log("error",e)
})
