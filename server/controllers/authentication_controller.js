const User = require('../models/user')

const userRegister = async (req,res)=>{
    const user = new User({
        username: req.body.username,
        password:req.body.password
    })
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(200).send(token)
    }
    catch (e){
        console.log(e)
    }
}

const userLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();
        res.send({
            user_id: user._id,
            username:user.username,
            token: token,
        });
    } catch (error) {
        res.status(400).send(error.toString());
    }
}

module.exports = {
    userRegister,
    userLogin
}