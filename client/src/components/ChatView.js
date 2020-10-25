import React, {useState, useEffect, useRef} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

import axios from "axios";

const ChatView = ({setMsg, sendMsg, msg, receiver, newMsgSender}) => {
    const chatBox = useRef(null);

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    const [msgList, setMsgList] = useState([])

    const loadMsgList = async (username) => {
        const token = localStorage.getItem('token')
        let result = await axios.get('http://localhost:5000/load_chat', {
            params: {
                'partnerName': username
            },
            headers: {
                'x-auth': token,
            }
        })
        setMsgList(result.data)
    }

    useEffect(() => {
        loadMsgList(receiver).then(() => {
            scrollToBottom()
        })
    }, [receiver])

    useEffect(() => {
        if (newMsgSender === receiver) {
            loadMsgList(receiver).then(() => {
                scrollToBottom()
            })
        }
    }, [newMsgSender])

    const scrollToBottom = () => {
        setTimeout(() => {
            if (chatBox.current) {
                chatBox.current.scrollTop = chatBox.current.scrollHeight;
            }
        }, 20)
    }

    const handleSubmit = (e) => {
        if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
            sendMsg(msgList)
            scrollToBottom()
        }
    }

    return (

                <div>
                    <Grid item>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography variant="h6">{receiver}</Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <Grid container spacing={2} direction="column" justify="center"
                          alignItems="center">

                        <Grid item>
                            <Paper ref={chatBox} style={
                                {
                                    width: '80vw',
                                    height: '70vh',
                                    overflow: 'scroll',
                                    overflowX: 'hidden',
                                    padding: '30px',
                                    clear: "both"

                                }
                            }
                            >
                                {
                                    msgList.length === 0 && receiver!==''&&
                                    <Grid style={{minHeight: '70vh', minWidth: '70vw'}} container justify="center"
                                          alignItems="center">
                                        <Typography variant="h3">No Messages</Typography>
                                    </Grid>
                                }
                                {
                                    msgList.length === 0 && receiver===''&&
                                    <Grid style={{minHeight: '70vh', minWidth: '70vw'}} container justify="center"
                                          alignItems="center">
                                        <Typography variant="h3">Please Select a User</Typography>
                                    </Grid>
                                }
                                {msgList.length !== 0 && msgList.map((msg, index) => {
                                    return (
                                        <Grid key={index} item
                                        >
                                            <div style={{
                                                textAlign: `${msg.sender === receiver ? 'left' : 'right'}`,
                                                marginTop: '10px',
                                            }}><Chip color={msg.sender === receiver ? 'secondary' : 'primary'}
                                                     label={msg.msg}/></div>

                                        </Grid>
                                    )
                                })}

                            </Paper>
                        </Grid>
                        {receiver !== '' &&
                        <Grid item>
                            <TextField placeholder="Type your text here"
                                       variant="outlined" style={{width: '75vw'}} value={msg}
                                       onChange={e => setMsg(e.target.value)}
                                       onKeyDown={handleSubmit}
                            > </TextField>
                            <IconButton color="primary" onClick={handleSubmit}><SendIcon/></IconButton>
                        </Grid>
                        }

                    </Grid>
                </div>

    );
};

export default ChatView;