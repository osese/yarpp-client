import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
  },

  textField: {
    flexBasis: 200,
  },margin: {
    margin: theme.spacing.unit,
  },
});
class UrunForm extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      "name": "",
      "price": "",
      "code": "",
      "cat": "",
    }
  }

  handleChange = name =>  event => {
    this.setState({
      [name]: event.target.value
    })
  }


  handleKaydet = (e) => {


    if(this.state.name === ""){
      this.props.snackBarMessenger("Ürün adı boş bırakılamaz.");
      return;
    }

    if(this.state.cat === ""){
      this.props.snackBarMessenger("Ürün kategorisi boş bırakılamaz.")
      return;
    }

    if(this.state.price === ""){
      this.props.snackBarMessenger("Fiyat boş bırakılamaz");
      return;
    }


    let catAll = null;

    this.props.kategoriler.forEach(kat => {
      if(kat.id === this.state.cat){
        catAll = kat;
      }
    })

    let urun = {
      "name": this.state.name,
      "price": this.state.price,
      "code": this.state.code,
      "categories": catAll,
    }




    this.props.urunKaydet(urun);
    this.setState({
      "name": "",
      "price": "",
      "code": "",
      "cat": "",
    })
  }

  render(){
    const {classes} = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="headline">
          Ürün Ekle
        </Typography>
        <form>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField required label="Urun Adi" value={this.state.name} onChange={this.handleChange('name')}/>
            </Grid>
            <Grid item xs={12}>
              <TextField required label="Fiyat" value={this.state.price} onChange={this.handleChange('price')}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Barkod" value={this.state.code} onChange={this.handleChange('code')}/>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                select
                value={this.state.cat}
                onChange={this.handleChange('cat')}
                label="Kategori"
                helperText="Ürün Kategorisi Seç"
                >
                {
                  this.props.kategoriler
                  .map(kat =>
                    <MenuItem key={kat.id} value={kat.id}> {kat.name} </MenuItem>
                  )
                }
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

export default  withStyles(styles)(UrunForm);
