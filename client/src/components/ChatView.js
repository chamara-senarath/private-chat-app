import React from 'react';
import {Grid} from "@material-ui/core";

const ChatView = ({msgList}) => {
    return (
        <Grid container direction="column">
            {msgList.length!==0&& msgList.map((msg,index)=>{
                return(
                    <Grid key={index} item>
                        <span>{msg.msg}</span>
                    </Grid>
                )
            })}
            {msgList.length===0 && <span>No Msg</span>}
        </Grid>
    );
};

export default ChatView;