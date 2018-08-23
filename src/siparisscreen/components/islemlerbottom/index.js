import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';


const styles = theme => ({
  root: {
    flex: "1",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: theme.spacing.unit,
    padding: theme.spacing.unit,

  },
  button: {
    height: theme.spacing.unit * 8,
    width: "20vw",

  }
});

class IslemlerBottomNavigation extends React.Component {


  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleIslemClick = (value) => {
    this.props.handleIslem(value);
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.root}>
          <Button variant="raised" className={classes.button} onClick={() => this.handleIslemClick('sipduz')}> Sip.Düz</Button>
          <Button variant="raised" className={classes.button} onClick={() => this.handleIslemClick('aktar')}> Aktar </Button>
          <Button variant="raised" className={classes.button} onClick={() => this.handleIslemClick('odeme')}> Ödeme </Button>
      </AppBar>
    );
  }
}

IslemlerBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IslemlerBottomNavigation);
