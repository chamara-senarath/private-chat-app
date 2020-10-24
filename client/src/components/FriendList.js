import React from 'react';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';

const FriendList = ({friendList,selectUser}) => {
    return (
        <Grid container direction="column">
            {friendList.map(user=>{
                return(
                    <Grid item>
                        <Button onClick={()=>{selectUser(user.username)}}> {user.username}</Button>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default FriendList;