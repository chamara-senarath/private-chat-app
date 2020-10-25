const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const { userRegister,userLogin } = require('../controllers/authentication_controller')

router.post('/register',userRegister)

router.post('/login',userLogin)



module.exports = router
