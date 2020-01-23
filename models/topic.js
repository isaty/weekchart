const mongoose = require('mongoose')
const daily=require('./daily')
const dateTime=require('../dateTime')
const topicSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    day: {type: String, required: true,default:new Date().getDay()},
    week: {type: Number, required: true,default:1},
    topic: {
        type: Array,
        required: true
    }
},
    {
        timestamps: true

    })
    topicSchema.virtual('dailies',{
        ref:'daily',
        localField:'_id',
        foreignField:'topic_rel'
    })
    topicSchema.methods.up=async function(){
        const topic =this
        topic.day=new Date().getDay()
        topic.week=topic.week+dateTime.week(topic.createdAt)
        await topic.save()
    }
    topicSchema.pre('remove',async function(next){
       const topic=this
        await daily.deleteMany({'topic_rel':topic._id})
        next()
    })
topicSchema.methods.findTopic = async function (text) {
    const t = []
    const topic = this
    for (i in text) {
        if (!topic.topic.includes(text[i]))
            t.push(text[i])
    }
    return t
}
const topic =  mongoose.model('topic', topicSchema)
module.exports = topic