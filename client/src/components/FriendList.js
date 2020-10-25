import React from 'react';
import {Grid} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DotIcon from '@material-ui/icons/FiberManualRecord';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

const FriendList = ({friendList,selectUser}) => {
    return (
        <Grid container direction="column">
            {friendList.map((user)=>{
                return(
                    <Grid container
                          justify="flex-start"
                          alignItems="center"  key={user.username}>
                        <DotIcon style={{
                            color:`${user.active?'green':'red'}`
                        }}/>
                        <Button onClick={()=>{selectUser(user.username)}}>
                            <Grid alignItems="center"  container spacing={1}>
                                <Grid item>
                                    <Typography>{user.username}</Typography>
                                </Grid>
                                <Grid item>
                                    <Chip size='small' style={{backgroundColor:`${user.unread_count!=0?'yellow':''}`}} label={user.unread_count}/>
                                </Grid>
                            </Grid>

                        </Button>
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default FriendList;