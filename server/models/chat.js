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
    }
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat