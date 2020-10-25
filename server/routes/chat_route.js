const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')

const { fetchUserList,loadChat } = require('../controllers/chat_controller')

router.get('/user_list',auth,fetchUserList)

router.get('/load_chat',auth,loadChat)


module.exports = router
