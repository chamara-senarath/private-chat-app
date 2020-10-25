import React, {useState,useEffect} from 'react';
import {Grid} from "@material-ui/core";
import axios from "axios";

const ChatView = ({setMsg,sendMsg,msg, receiver, newMsgSender}) => {
    const [msgList,setMsgList] = useState([])

    const loadMsgList = async (username)=>{
        console.log(username)
        const token = localStorage.getItem('token')
        let result = await axios.get('http://localhost:5000/load_chat',{
            params:{
                'partnerName': username
            },
            headers: {
                'x-auth': token,
            }
        })
        setMsgList(result.data)
    }

    useEffect(()=>{
        loadMsgList(receiver)
    },[receiver])

    useEffect(()=>{
        if(newMsgSender===receiver){
            loadMsgList(receiver)
        }
    },[newMsgSender])

    return (
        <Grid container spacing={2} direction="column">
            <h2>{receiver}</h2>
            {msgList.length!==0&& msgList.map((msg,index)=>{
                return(
                    <Grid key={index} item>
                        <span>{msg.msg}</span>
                    </Grid>
                )
            })}
            {msgList.length===0 && <span>No Msg</span>}
            <Grid>
                <input type="text" value={msg} onChange={e=>setMsg(e.target.value)} />
                <button onClick={()=>{sendMsg(msgList)}}>Click Me</button>
            </Grid>
        </Grid>
    );
};

export default ChatView;