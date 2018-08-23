import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "purple"
  },
  button: {
    height: theme.spacing.unit * 8,
    width: theme.spacing.unit * 8
  }
});

class Islemler extends React.Component {


  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="space-around" classNames={classes.root}>
        <Grid item>
          <Button variant="raised" className={classes.button}> Not Ekle </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button}> Sil </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button}> Mtfk Gonder </Button>
        </Grid>
        <Grid item>
          <Button className={classes.button}> Ekle ee </Button>
        </Grid>
      </Grid>

    );
  }
}

Islemler.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Islemler);
