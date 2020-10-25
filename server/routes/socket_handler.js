const User = require('../models/user')
const Chat = require('../models/chat')

class SocketHandler {
    constructor(io) {
        this.io = io
    }
    startListening(){
        this.io.on('connection',async (socket) =>{
            let socketObj = socket
            const userID = socket.request._query.userID
            await this.updateUser(userID,socket.id)
            socket.emit('reload-user-list')
            socket.on('message',async(data)=>{
                await this.sendMsg(data.senderName,data.receiverName,data.msg)
            })
            socket.on('msg_seen',async(data)=>{
                await this.setMsgStatus(data.chatID)
            })
            socket.on('disconnect',async()=>{
                await this.setUserStatus(userID)
                socketObj.broadcast.emit('reload-user-list')
            })
        })
    }
    async updateUser(userID,socketID){
        let user = await User.findById(userID)
        if(!user){
            return
        }
        user.socketID = socketID
        user.active = true
        await user.save()
    }

    async setUserStatus(userID){
        let user = await User.findById(userID)
        if(!user){
            return
        }
        user.active = false
        await user.save()

    }

    async setMsgStatus(chatID){
        let chat = await Chat.findById(chatID)
        chat.seen = true
        await chat.save()
    }

    async sendMsg(senderName,receiverName,msg){
        const chat = new Chat({
            sender:senderName,
            receiver:receiverName,
            msg:msg
        })
        try {
            await chat.save()
            const receiverObj = await User.findOne({username:receiverName}).select({"socketID":1,"_id":0})
            this.io.to(receiverObj.socketID).emit("message", {sender:senderName,msg:msg,chatID:chat._id})
        }
        catch (e){
            console.log(e)
        }
    }
}

module.exports = SocketHandler