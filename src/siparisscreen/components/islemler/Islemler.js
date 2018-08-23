import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IslemButonu from './components/IslemButonu';

const styles = theme => ({
  root: {
      backgroundColor: "orange",
      height: "50vh",
  },

  base: {
    padding: theme.spacing.unit,

  },
  border: {
    border: "1px solid black",
  }
  ,
  fullwidth: {
    width: "100%",
    height: "8vh",
  },
  fullheight: {
    width: "100%",
    height: "100%"

  }
});


class Islemler extends React.Component{

  onClick = (text) => {
    this.props.islemYap(text);
  }
  render(){
    const {classes} = this.props;
    const {islemler} = this.props;
    return(
        <div className={classes.root}>
          <Grid container direction="row" alignItems="center"  alignContent="center">
            <Grid item xs={4}>
              <IslemButonu onClick={this.onClick} olay={islemler.not}> NOT </IslemButonu>
            </Grid>
            <Grid item xs={4}>
              <IslemButonu onClick={this.onClick} olay={islemler.aktar}> AKTAR </IslemButonu>
            </Grid>
            <Grid item xs={4}>
              <IslemButonu onClick={this.onClick} olay={islemler.bolode}> BÖL ÖDE </IslemButonu>
            </Grid>
            <Grid item xs={12}>
              <IslemButonu onClick={this.onClick} olay={islemler.mutfagagonder}> Mutfaga Gonder </IslemButonu>
            </Grid>

            <Grid item xs={12} >
              <Grid container direction="row" alignItems="stretch">
                <Grid item xs={4}>
                  <IslemButonu fullheight onClick={this.onClick} olay={islemler.ode}> Ödeme </IslemButonu>
                </Grid>
                <Grid item xs={2}> {/* numaralar başlangıç */}
                  <Grid container direction="column">
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.bir}>1</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.dort}>4</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.yedi}>7</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick}>+/-</IslemButonu></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="column">
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.iki}>2</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.bes}>5</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.sekiz}>8</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.sifir}>0</IslemButonu></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                  <Grid container direction="column">
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.uc}>3</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.alti}>6</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.dokuz}>9</IslemButonu></Grid>
                    <Grid item><IslemButonu onClick={this.onClick} olay={islemler.nokta}>.</IslemButonu></Grid>
                  </Grid>
                </Grid>
                <Grid item xs={2}>
                <Grid container direction="column">
                  <Grid item><IslemButonu statefull onClick={this.onClick} olay={islemler.adet}>Ad</IslemButonu></Grid>
                  <Grid item><IslemButonu onClick={this.onClick} olay={islemler.sil}>x</IslemButonu></Grid>
                </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
    )}
}

export default withStyles(styles)(Islemler);
