import React, { useEffect, useState} from 'react';
import io from 'socket.io-client'
import axios from 'axios'
import FriendList from "../components/FriendList";
import ChatView from "../components/ChatView";
import {Grid} from "@material-ui/core";
let socket

function ChatScreen(){
    const [sender,setSender] = useState('')
    const [receiver,setReceiver] = useState('')
    const [msg,setMsg] = useState('')
    const [friendList,setFriendList] = useState([])
    const [newMsgSender,setNewMsgSender] = useState('')

    const loadUserList = async ()=>{
        const token = localStorage.getItem('token')
        let result = await axios.get('http://localhost:5000/user_list',{
            headers: {
                'x-auth': token,
            }
        })
        setFriendList(result.data)
    }



    const selectUser = async (username)=>{
        setReceiver(username)
        await loadUserList()
    }

    // const handleIncomingMsg = (data)=>{
    //     if(data.sender === receiver){
    //
    //         socket.emit('msg_seen',{chatID:data.chatID})
    //     }
    // }

    useEffect( ()=>{
        loadUserList()
        setSender(localStorage.getItem('username'))
        let uid = localStorage.getItem('userID')
        socket = io.connect('http://localhost:5000', { query: `userID=${uid}` })

    },[])
    useEffect(()=>{
        socket.on('message',async (data)=>{
            await loadUserList()
            setNewMsgSender(data.sender)
        })
        socket.on('reload-user-list',()=>{
            setTimeout(async ()=>{
                await loadUserList()
            },1000)

        })
    })
    const sendMsg = (msgList)=>{
        socket.emit('message',{senderName:sender,receiverName:receiver,msg:msg}
        )
        msgList.push({senderName:sender,receiverName:receiver,msg:msg})
        setMsg('')
    }
    return(
            <Grid container spacing={3}>
                <Grid item>
                    <FriendList friendList={friendList} selectUser={selectUser} />
                </Grid>
                <Grid item>
                    <ChatView setMsg={setMsg} msg={msg} sendMsg={sendMsg} receiver={receiver} newMsgSender={newMsgSender}/>
                </Grid>
            </Grid>

    )
}

export default ChatScreen