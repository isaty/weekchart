const mongoose = require('mongoose')
const topics = require('./topic')
const User = require('./user')
const dailySchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref:'User',required: true },
    topic_rel: { type: mongoose.Schema.Types.ObjectId, ref:'topic',required: true },
    day: { type: String, required: true },
    week: { type: Number, required: true },
    topic_cover: { type: Array },
})
const Daily = new mongoose.model('daily', dailySchema)
module.exports = Daily