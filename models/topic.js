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
        const day=new Date().getDay()
        const change=dateTime.week(topic.createdAt)
        if(change!=0)
        topic.week=topic.week+dateTime.week(topic.createdAt)
        else if(topic.day!=day && day<topic.day)
        {topic.week=1+topic.week
        console.log(topic.week)
        }
        topic.day=day
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