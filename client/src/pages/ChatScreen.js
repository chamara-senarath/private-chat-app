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
    const [msgList,setMsgList] = useState([])

    const loadUserList = async ()=>{
        const token = localStorage.getItem('token')
        let result = await axios.get('http://localhost:5000/user_list',{
            headers: {
                'x-auth': token,
            }
        })
        setFriendList(result.data)
    }

    const loadMsgList = async (username)=>{
        const token = localStorage.getItem('token')
        let result = await axios.get('http://localhost:5000/load_chat',{
            params:{
                'partnerName': username
            },
            headers: {
                'x-auth': token,
            }
        })
        console.log('hit',result)
        setMsgList(result.data)
    }

    const selectUser = async (username)=>{
        setReceiver(username)
        await loadMsgList(username)
    }

    const handleIncomingMsg = (data)=>{
        if(data.sender === receiver){
            let modifiedMsgList = [...msgList,data]
            setMsgList(modifiedMsgList)
        }
        else{

        }
    }

    useEffect( ()=>{
        loadUserList()
        setSender(localStorage.getItem('username'))
        let uid = localStorage.getItem('userID')
        socket = io.connect('http://localhost:5000', { query: `userID=${uid}` })

    },[])
    useEffect(()=>{
        socket.on('message',(data)=>{
            console.log('new msg',data.msg)
            handleIncomingMsg(data)
        })
    })
    const sendMsg = ()=>{
        socket.emit('message',{senderName:sender,receiverName:receiver,msg:msg}
        )
    }
    return(
        <div>
            <h2>{receiver}</h2>
            <Grid container spacing={3}>
                <Grid item>
                    <FriendList friendList={friendList} selectUser={selectUser}></FriendList>
                </Grid>
                <Grid item>
                    <ChatView msgList={msgList}></ChatView>
                    <input type="text" onChange={e=>setMsg(e.target.value)}></input>
                    <button onClick={sendMsg}>Click Me</button>
                </Grid>
            </Grid>

        </div>
    )
}

export default ChatScreen