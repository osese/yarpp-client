import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';

const styles = theme => ({

  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

  },

});

class MasalarForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      masaname: "",
      masapos: "",
    }
  }

  handleChangeName = (event) => {
    this.setState({
      masaname: event.target.value,
    })
  }

  handleChangePos = (event) => {
    this.setState({
      masapos: event.target.value,
    })
  }


  handleMasaEkle = () => {
    this.props.handleMasaEkle({name: this.state.masaname, position: {name: this.state.masapos}});
    this.setState({
      masaname: "",
      masapos: "",
    })
  }

  render(){
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline">
          Masa Ekle
        </Typography>
        <form>
          <Grid container spacing={16}>

            <Grid item xs={12}>

              <TextField
               id="name"
               name="masa"
               label="Masa Adı:"
               value={this.state.masaname}
               onChange={this.handleChangeName}
               margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                 required
                 select
                 label="Masa Yeri"
                 helperText="Masanın bulunacağı yeri seç."
                 value={this.state.masapos}
                 onChange={this.handleChangePos}>

                 {
                     this.props.masayerleri
                     .map(elem =>
                         <MenuItem  key={elem.id} value={elem.name}> {elem.name} </MenuItem>
                     )
                 }

              </TextField>
            </Grid>
            <Grid item xs={12}>

           <Button variant="raised" color="primary" onClick={this.handleMasaEkle}>
               Kaydet
           </Button>
           </Grid>
         </Grid>

       </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(MasalarForm);
