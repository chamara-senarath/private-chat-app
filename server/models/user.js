const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    socketID:{
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
}, {
    timestamps: true
})

userSchema.methods.generateAuthToken = function () {
    let user = this
    let token = jwt.sign({ _id: user._id.toHexString() }, 'ASCENTIC').toString()

    user.tokens = user.tokens.concat([{ token }])

    return user.save().then(() => {
        return token
    })
}

userSchema.statics.findByToken = function (token) {
    let user = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'ASCENTIC')
    } catch (error) {
        return Promise.reject()
    }
    return user.findOne({
        '_id': decoded._id,
        'tokens.token': token,
    })
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Unable to login. No user found");
    }
    let passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        throw new Error("Unable to login. Password Incorrect");
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User