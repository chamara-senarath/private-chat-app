const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const chatRoute = require('./routes/chat_route')
const authenticationRoute = require('./routes/authentication_route')
const  MongooseConfig  = require('./config/db.js')
const SocketHandler = require('./routes/socket_handler')

class Server {
    constructor() {
        this.app = express();
        this.http = http.Server(this.app);
        this.io = socketio(this.http);
    }

    appConfig(){
        this.app.use(bodyParser.json())
        this.app.use(cors())
        new MongooseConfig().buildConnection()

    }

    includeRoutes(){
        this.app.use(authenticationRoute)
        new SocketHandler(this.io).startListening()
        this.app.use(chatRoute)
    }

    appExecute(){
        this.appConfig();
        this.includeRoutes();

        const port =  process.env.PORT || 5000;
        const host = process.env.HOST || `localhost`;

        this.http.listen(port, host, () => {
            console.log(`Listening on http://${host}:${port}`);
        });
    }
}

const app = new Server();
app.appExecute();