const Chat = require('../models/chat')
const User = require('../models/user')

const fetchUserList = async (req, res) => {
    const userID = req.user._id
    const username = req.user.username
    const userList = await User.find({_id:{$ne:userID}})
    const modifiedUserList = []
    for (let i=0;i<userList.length;i++){
        const partner = userList[i]
        const unread_count = await Chat.count({ $and:[ {'receiver':username}, {'sender':partner.username},{'seen':false} ]})
        const obj = {
            username:partner.username,
            unread_count,
            active:partner.active
        }
        modifiedUserList.push(obj)
    }
    res.status(200).send(modifiedUserList)
}

const loadChat = async(req, res) => {
    const userName = req.user.username
    const partnerName = req.query.partnerName
    await Chat.updateMany( {
        $or:[
            { $and:[ {'receiver':userName}, {'sender':partnerName} ]},
            { $and:[ {'receiver':partnerName}, {'sender':userName} ]}
        ]
    }, { $set: { seen:true } })
    const msgList = await Chat.find({
        $or:[
            { $and:[ {'receiver':userName}, {'sender':partnerName} ]},
            { $and:[ {'receiver':partnerName}, {'sender':userName} ]}
        ]
    })
        console.log(msgList)
    res.status(200).send(msgList)

}



module.exports = {
    fetchUserList,
    loadChat
}