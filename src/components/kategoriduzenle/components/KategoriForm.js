import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
  },
});
class KategoriForm extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      name: "",
    }
  }

  handleChange = name =>  event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleKaydet = (e) => {

    if(this.state.name === ""){
      this.props.snackBarMessenger("Kategori adı boş bırakılamaz.");
      return;
    }

    let kategori = {
      "name": this.state.name,
    }

    this.setState({
      "name": "",
    })
    this.props.kategoriKaydet(kategori);
  }

  render(){
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline">
          Kategori Ekle
        </Typography>
        <form>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField label="Kategori Adi" value={this.state.name} onChange={this.handleChange('name')}/>
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

export default  withStyles(styles)(KategoriForm);
