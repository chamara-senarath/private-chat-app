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
        console.log(e.code)
        if(e.code===11000){
            res.status(226).send({error:'Username is already taken. Please enter another username'})
        }
        else{
            res.status(206).send({error:e.toString()})

        }
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
        res.status(206).send({error:error.toString()})
    }
}

module.exports = {
    userRegister,
    userLogin
}