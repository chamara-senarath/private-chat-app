const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    msg:{
        type:String,
        required: true,
    },
    seen:{
        type:Boolean,
        default:false,
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat