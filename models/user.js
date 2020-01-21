const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const topics=require('./topic')
const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },

    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    contact: {
        type: String,
        required: true,
        min: 10,
        maxlength: 10,
        validate(value) {
            if (!validator.isInt(value)) {
                throw new Error("Invalid Contact Number")
            }
        }
    },


    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    }
)

UserSchema.virtual('topics',{
    ref:'topic',
    localField:'_id',
    foreignField:'owner'
})

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})
//methods have instances of user model not the model itself like an individual user 
UserSchema.methods.generate=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'week')
    user.tokens=user.tokens.concat({token})
    await user.save()
     return token

}
//statics method on User Model
UserSchema.statics.findByCredentials=async function(email,pass){
const user=await User.findOne({email})
if(!user)
throw new Error('Login Failed')

const password=bcrypt.compare(user.password,pass)

if(!password)
throw new  Error('Login failed')

return user
}
const User = new mongoose.model('User', UserSchema,)
module.exports = User