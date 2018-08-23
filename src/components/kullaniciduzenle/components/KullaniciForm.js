import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

  },

});
class KullaniciForm extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      role: "",
      username: "",
      name: "",
      password: "",
    }
  }

  handleChange = name =>  event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleKaydet = () => {


    if(this.state.name.trim() === ""){
      this.props.snackBarHook("Kullanici adi boş bırakılamaz. ");
      return;
    }

    if(this.state.password.trim() === ""){
      this.props.snackBarHook("Şifre boş bırakılamaz.");
      return;
    }

    if(this.state.name.trim() === ""){
      this.props.snackBarHook("İsim boş bırakılamaz.");
      return;
    }

    if(this.state.role === ""){
      this.props.snackBarHook("Rol boş bırakılamaz.");
      return;
    }

    let kullanici = {
      "name": this.state.name,
      "password": this.state.password,
      "username": this.state.username,
      "roles": [
        this.state.role,
      ]
    }


    this.setState({
      "name": "",
      "password": "",
      "username": "",
      "roles": [
        this.state.role,
      ]
    })
    this.props.kullaniciKaydet(kullanici);
  }

  render(){
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline">
          Kullanici Ekle
        </Typography>
        <form>
          <Grid container spacing={16} >

            <Grid item xs={12}>
              <TextField required label="Kullanici Adi" value={this.state.username} onChange={this.handleChange('username')}/>

            </Grid>
            <Grid item xs={12}>
              <TextField required label="İsim" value={this.state.name}  onChange={this.handleChange('name')}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required label="Şifre" value={this.state.password}  onChange={this.handleChange('password')}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
              required
              select
              label="Rol"
              helperText="Kullanici rolünü seç."
              value={this.state.role}
              onChange={this.handleChange('role')}>

              <MenuItem value={"ROLE_ADMIN"}> Admin </MenuItem>
              <MenuItem value={"ROLE_GARSON"}> Garson </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button variant="raised" color="primary" onClick={this.handleKaydet}> Kaydet </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    )
  }
}

export default  withStyles(styles)(KullaniciForm);
