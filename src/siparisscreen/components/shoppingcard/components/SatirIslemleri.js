import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "purple",
    padding: theme.spacing.unit,
  },
  button: {
    height: theme.spacing.unit * 8,
    width: theme.spacing.unit * 8
  }
});

class SatirIslemleri extends React.Component {


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="space-around" className={classes.root}>
        <Grid item>
          <Button variant="raised" className={classes.button} onClick={() => this.props.action("not")}> Not Ekle </Button>
        </Grid>
        <Grid item>
          <Button variant="raised" className={classes.button} onClick={() => this.props.action("sil") }> Sil </Button>
        </Grid>
        <Grid item>
          <Button variant="raised" className={classes.button} onClick={() => this.props.action("mutfagagonder")}> Mtfk Gonder </Button>
        </Grid>
        <Grid item>
          <Button variant="raised" className={classes.button} onClick={() => this.props.action("gonder")}> Ekle </Button>
        </Grid>
      </Grid>

    );
  }
}

SatirIslemleri.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SatirIslemleri);
