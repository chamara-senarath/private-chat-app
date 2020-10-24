import React, { useEffect, useState} from 'react';
import io from 'socket.io-client'
let socket

function App(){
    const [sender,setSender] = useState('')
    const [receiver,setReceiver] = useState('')
    const [msg,setMsg] = useState('')

    useEffect(()=>{
        let uid = prompt('uid')
        socket = io.connect('http://localhost:5000', { query: `userID=${uid}` })

    },[])
    useEffect(()=>{
        socket.on('message',(data)=>{
            console.log(data)
        })
    })
    const sendMsg = ()=>{
        socket.emit('message',{senderName:sender,receiverName:receiver,msg:msg}
        )
    }
    return(
        <div>
            <input type="text" onChange={e=>setReceiver(e.target.value)}></input>
            <input type="text" onChange={e=>setSender(e.target.value)}></input>
            <input type="text" onChange={e=>setMsg(e.target.value)}></input>
            <button onClick={sendMsg}>Click Me</button>
        </div>
    )
}

export default App