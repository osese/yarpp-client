import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {postRequest} from "../utils/fetch12";


const styles = theme => ({
    merkez: {
        height: 300,
    },
    root:{
        margin: theme.spacing.unit * 3,
        height: '100%',
    }
});

class LoginScreen extends React.Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            "username": "",
            "password": ""
        }
    }

    onInputChange(event){
        this.setState(
            {
                [event.target.name] : event.target.value
            }
        )
    }

    onSubmit(event){

        // This is where u should make REST call!
        // consider this use object as it returns from remote server
        const user =  {
            "username": this.state.username,
            "password": this.state.password,
        };

        fetch(postRequest("/user/login", user))
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }

    render(){
        const {classes} = this.props ;
        return(
                <div classes={classes.root}>
                <Grid container>
                    <Grid item xs={1} sm={3} md={4}>
                    </Grid>
                    <Grid item xs={10} sm={6} md={4} >
                        <Paper>
                            <Grid container
                            justify={"space-around"}
                            spacing={16}
                            direction={"column"}
                            alignItems={"center"}
                            className={classes.merkez}
                            >
                                <Grid item >

                                    <TextField
                                        id="username"
                                        name="username"
                                        label="Kullanici Adi"
                                        onChange={this.onInputChange}
                                        />
                                </Grid>
                                <Grid item >

                                    <TextField
                                        id="password"
                                        name="password"
                                        type="password"
                                        label="Şifre"
                                        onChange={this.onInputChange}
                                    />
                                </Grid>
                                <Grid item>

                                    <Button variant="raised" color="primary" onClick={this.onSubmit}>
                                        Giriş Yap
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
                </div>

        )
    }
}


LoginScreen.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginScreen);
