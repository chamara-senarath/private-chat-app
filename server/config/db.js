const mongoose = require('mongoose');

class MongooseConfig{
    constructor() {
        process.env.MONGODB_URI = "mongodb://localhost:27017/ChatApp";
    }
    buildConnection(){
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
    }
}



module.exports = MongooseConfig
