const User = require('../models/user')
const Chat = require('../models/chat')

class SocketHandler {
    constructor(io) {
        this.io = io
    }
    startListening(){
        this.io.on('connection',async (socket) =>{
            await this.updateSocket(socket.request._query.userID,socket.id)
            socket.on('message',async(data)=>{
                await this.saveMsg(data.senderName,data.receiverName,data.msg)
                await this.sendMsg(data.senderName,data.receiverName,data.msg)
            })
        })
    }
    async updateSocket(userID,socketID){
        let user = await User.findById(userID)
        if(!user){
            return
        }
        user.socketID = socketID
        await user.save()
    }

    async saveMsg(senderName,receiverName,msg){
        const chat = new Chat({
            sender:senderName,
            receiver:receiverName,
            msg:msg
        })
        try {
            await chat.save()
        }
        catch (e){
            console.log(e)
        }

    }

    async sendMsg(senderName,receiverName,msg){
        const receiverObj = await User.findOne({username:receiverName}).select({"socketID":1,"_id":0})
        this.io.to(receiverObj.socketID).emit("message", {sender:senderName,msg:msg})
    }

}

module.exports = SocketHandler