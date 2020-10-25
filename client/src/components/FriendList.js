import React from 'react';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const FriendList = ({friendList,selectUser}) => {
    return (
        <Grid container direction="column">
            {friendList.map((user,index)=>{
                return(
                    <Grid item key={index}>
                        <Button onClick={()=>{selectUser(user.username)}}> {user.username} {user.unread_count} {user.active?'online':'offline'}</Button>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default FriendList;