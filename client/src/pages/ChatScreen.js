import React, { useEffect, useState} from 'react';
import io from 'socket.io-client'
import axios from 'axios'
import FriendList from "../components/FriendList";
import ChatView from "../components/ChatView";
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
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
        setTimeout(async ()=>{
            await loadUserList()
        },20)
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
                setNewMsgSender(data.sender)
                setTimeout(()=>{
                    setNewMsgSender('')
                },50)
                setTimeout(async ()=>{
                    await loadUserList()
                },20)
        })
        socket.on('reload-user-list',()=>{
            setTimeout(async ()=>{
                await loadUserList()
            },20)

        })
    })
    const sendMsg = (msgList)=>{
        if(msg===''){
            return
        }
        socket.emit('message',{senderName:sender,receiverName:receiver,msg:msg}
        )
        msgList.push({senderName:sender,receiverName:receiver,msg:msg})
        setMsg('')
    }
    return(

                <div>
                    {
                        friendList.length===0&&
                        <Grid style={{minHeight: '70vh',minWidth:'70vw'}} container justify="center"
                              alignItems="center" >
                            <Typography variant="h3">No Users in the System</Typography>
                        </Grid>
                    }
                    {
                        friendList.length!==0&&
                        <Grid container spacing={6} style={{
                            padding:'30px'
                        }}>
                            <Grid item>
                                <FriendList friendList={friendList} selectUser={selectUser} />
                            </Grid>
                            <Grid item>
                                <ChatView setMsg={setMsg} msg={msg} sendMsg={sendMsg} receiver={receiver} newMsgSender={newMsgSender}/>
                            </Grid>
                        </Grid>
                    }
                </div>


    )
}

export default ChatScreen