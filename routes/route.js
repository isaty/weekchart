const express = require('express')
const route = new express.Router()
const User = require('../models/user')
const topics = require('../models/topic')
const Daily = require('../models/daily')
const auth = require('../middleware/auth')
const dateTime = require('../dateTime')
route.get('/', (req, res) => {
    res.json({ message: "Welcome" })
})
route.post('/user', async (req, res) => {
    const user = new User(req.body)
    console.log(req.body)
    try {
        await user.save()
        res.json({
            message: "Successfull"
        })
    } catch (e) {
        res.json({ message: e })
    }
})
route.get('/topics',auth,async(req,res)=>{
    try {
        const topic = await topics.findOne({ owner: req.user._id })
        res.json({data:topic.topic,week:topic.week}) 
    }
     catch (e) { 
       console.log(e)
        res.json({ e }) }
})
route.post('/topics', auth, async (req, res) => {
    req.body.owner = req.user._id
    let topc = await topics.findOne({ owner: req.body.owner })
    if (!topc)
        topic = new topics(req.body)
    else {
        topic = topc
        req.body.topic = await topic.findTopic(req.body.topic)
        topic.topic = topic.topic.concat(req.body.topic)
    }

    try {
        await topic.save()
        res.json({ message: "saved" })
    } catch (e) {
        res.json({ message: e })
    }
})
route.delete('/topics', auth, async (req, res) => {
    try {
        const topic = await topics.findOne({ owner: req.user._id })
        if (!topic)
            throw error("not found")
        await topic.remove()
        res.json({ message: "successful" })
    } catch (e) {
        res.json({ e })
    }
})
route.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generate()
        res.json({ token })
    } catch (e) {
        res.json({ e })
    }
})
route.get('/routine/:week', auth, async (req, res) => {
    
    const topic = await topics.findOne({ owner: req.user._id })

    const week = req.params.week
    const daily = await Daily.find({ owner: req.user._id, week })
    await topic.up()
    res.json({ data: daily })

})
route.post('/routine', auth, async (req, res) => {
    try {
        
        let daily
        const topic = await topics.findOne({ owner: req.user._id })
        req.body.day = new Date().getDay()
        req.body.week = topic.week + dateTime.week(topic.createdAt)
        req.body.topic_rel = topic._id
        req.body.owner = req.user._id
        let dailies=await Daily.findOne({'topic_rel':topic._id,'week':req.body.week,'day':req.body.day})
        if(!dailies){
            req.body.topic_cover=[]
        for(i in topic.topic)
        {
             req.body.topic_cover[i]=req.body.topic.includes(topic.topic[i])
        }
         daily = new Daily(req.body)
             }
        else
            {
                let index=topic.topic.indexOf(req.body.topic)
                if(index>0)
                dailies.topic_cover[index]=Boolean(true)
                 daily=dailies   
                daily.markModified('topic_cover')    
            }
            await daily.save()
        await topic.up()
        res.status(200).json({message:"saved"})
    }
    catch (e) {
        console.log(e)
        res.status(201).json({message:"unsuccessfull"})
    }
})
route.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.json({ message: "logout successfull" })
    } catch (e) {
        res.json({ e })
    }
})

module.exports = route