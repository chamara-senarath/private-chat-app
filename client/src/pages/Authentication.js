import React , {useState} from 'react';
import { useHistory } from "react-router-dom";

import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Grid} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import axios from 'axios'
import Alert from '@material-ui/lab/Alert';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};




function Authentication() {
    const history = useHistory();
    const [errorMsg,setErrorMsg] = useState('')

    const [value, setValue] = useState(0);
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleLogin = async () => {
        try{
            let result = await axios.post("http://localhost:5000/login",{
                username:username,
                password:password
            })
            localStorage.setItem('token',result.data.token)
            localStorage.setItem('userID',result.data.user_id)
            localStorage.setItem('username',result.data.username)
            if(result.status===200){
                history.push("/home");
            }
            else{
                setErrorMsg(result.data.error)
            }
        }
        catch (e){
            console.log(e)
        }

    }

    const handleRegister = async () => {
        try{
            let result = await axios.post("http://localhost:5000/register",{
                username,
                password
            })
            if(result.status===200){
                history.push("/home");
            }
            else{
                setErrorMsg(result.data.error)
            }
        }
        catch (e){
            console.log(e)
        }

    }

    const Form = (formName)=>{
        return(
            <Grid container direction="column" spacing={3} justify="center"
                  alignItems="center"  >
                <Grid item>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <PersonIcon />
                        </Grid>
                        <Grid item>
                            <TextField onChange={(e)=>setUsername(e.target.value)} label="Username" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <LockIcon />
                        </Grid>
                        <Grid item>
                            <TextField onChange={(e)=>setPassword(e.target.value)} type="password" label="Password" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button onClick={formName==='login'?handleLogin:handleRegister} variant="contained" color="primary">
                        {formName.toUpperCase()}
                    </Button>
                </Grid>
            </Grid>
        )

    }

    return (
        <Grid container  direction="column"
              justify="center"
              alignItems="center" style={{minHeight: '100vh'}}>
            <Grid item>
                {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}

            </Grid>
            <Grid item>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab label="Login" />
                            <Tab label="Register" />
                        </Tabs>
                    <TabPanel value={value} index={0}>
                        { Form('login') }
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        { Form('register') }

                    </TabPanel>
            </Grid>

        </Grid>

    );
}

export default Authentication
