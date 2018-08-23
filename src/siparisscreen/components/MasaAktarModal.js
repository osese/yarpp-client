import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {getRequest, postRequest} from '../../utils/fetch12';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import {withRouter} from 'react-router-dom'



const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

  },
});

class MasaAktarModal extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      isFetching: true,
      value: "",
    }
  }

  componentDidMount(){
    fetch(getRequest("/desk"))
    .then(response =>  response.json())
    .then(json => {
      this.setState({
        masalar: json,
        isFetching: false,
      })
    })
    .catch(error => {console.error(error)})
  }

  render(){

    const {classes} = this.props;

    if(this.state.isFetching){
      return <h1> Bekleniyor. </h1>
    }

    const {masalar} = this.state;
    let curMasa;
    masalar.forEach( masa => {
      if(masa.id == this.props.srcId){
        curMasa = masa;
      }
    })

    return(
        <Paper className={classes.root}>
          <Typography variant="headline">
            {curMasa.name} taşınıyor.
          </Typography>
          <Grid container spacing={16} >
            <Grid item xs={12}>
              <TextField
              required
              select
              label="Masa Seç"
              helperText="Masanın nereye aktarılacağını seçiniz."
              value={this.state.value}
              onChange={this.handleChange}>
                {
                  masalar.map(masa =>
                    <MenuItem key={masa.id} value={masa.id}> {masa.name}</MenuItem>
                  )
                }
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button variant="raised" color="primary" onClick={this.handleAktar} > Aktar </Button>
            </Grid>

          </Grid>
        </Paper>

    )
  }

  handleAktar = () => {
    let srcId = this.props.srcId;
    let destId =  this.state.value;

    fetch(postRequest("/desk/" + srcId + "/tasi/" + destId, {}))
    .then(response => this.props.history.push('/'))
    .catch(error => console.error(error))

  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }
}

export default withRouter(withStyles(styles)(MasaAktarModal));
