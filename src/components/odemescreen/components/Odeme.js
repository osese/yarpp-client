import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
  },
  button: {
    margin: theme.spacing.unit,
  }

});

class Odeme extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      type: "",
      amount: 0,
    }

  }

  handleChange = name =>  event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render(){
    const {classes} = this.props;

    return(
      <Paper className={classes.root}>

          <Grid container spacing={16} >

            <Grid item xs={12}>
            <Typography variant="headline">
              Ödemeler
            </Typography>
              <List dense component="li">
                  {this.props.odemeler.map( odeme =>
                    <ListItem button>
                      <ListItemText primary={`${odeme.paymentDate} tarihinde ${odeme.amount} TL ödendi.`} />
                    </ListItem>
                  )}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="headline">
                Ödeme Yap
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                required
                value={this.state.type}
                onChange={this.handleChange('type')}
                helperText="Ödeme Tipi"
                >
                <MenuItem value="CREDITCARD">Kredi Kartı</MenuItem>
                <MenuItem value="CASH">Nakit</MenuItem>
                <MenuItem value="OTHER">Diğer</MenuItem>
              </TextField>

            </Grid>
            <Grid item xs={12}>
              <TextField required label="Miktar" value={this.state.amount} onChange={this.handleChange('amount')}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="headline">
                Kalan : {this.props.kalan } TL
              </Typography>
            </Grid>


            <Grid item xs={12}>
              <div>
                <Button className={classes.button} variant="raised" color="primary" onClick={this.props.masaYazdir}> Yazdır </Button>
                <Button className={classes.button} variant="raised" color="primary" onClick={this.odemeYap}> Öde </Button>
                <Button className={classes.button} variant="raised" color="primary" onClick={this.props.masaTamam}> Masa Tamam </Button>
              </div>
            </Grid>
          </Grid>
      </Paper>

    )
  }


  odemeYap = () => {
    if(this.state.type === ""){
      this.props.snackBarMessenger("Ödeme Tipi Seçmelisiniz.");
      return;
    }
    if(this.state.amount === 0){
      this.props.snackBarMessenger("Ödenecek miktari girmelisiniz.");
      return;
    }

    this.props.odemeYap(this.state.amount, this.state.type);
    this.setState({
      amount: 0,
      type: "",
    })
  }
}


export default withStyles(styles)(Odeme);
