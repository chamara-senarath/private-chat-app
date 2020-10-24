const express = require('express')
const router = new express.Router()
const Chat = require('../models/chat')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.get('/user_list',auth,async (req, res) => {
    const userID = req.user._id
    const userList = await User.find({_id:{$ne:userID}})
    res.status(200).send(userList)
})

router.get('/load_chat',auth,(async(req, res) => {
    const userName = req.user.userName
    const partnerName = req.query.partnerName
    const msgList = await Chat.find( {
        $or:[
            { $and:[ {'receiver':userName}, {'sender':partnerName} ]},
            { $and:[ {'receiver':partnerName}, {'sender':userName} ]}
        ]
    } )
    res.status(200).send(msgList)


}))


module.exports = router
