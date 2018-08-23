import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {NavLink}  from 'react-router-dom';

const styles = theme => ({
  base: {
    display: "block",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    width: theme.spacing.unit*10,
    height: theme.spacing.unit*10,
    align: "center",
    "&:link, &:visited":{
      color: "white",
      textDecoration: "none",
      textAlign: "center",
    },

    margin: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
  },

  empty: {
    backgroundColor: "green",
    "&:hover":{
      backgroundColor: "green",
    }
  },

  full :{
    backgroundColor: "red",
    "&:hover":{
      backgroundColor: "red",
    }
  }
});

function MasaButonu(props){
  const {classes} = props;
  let {masa} = props;

  return (
    <NavLink
      to={{
        pathname: '/siparis/' + masa.id,
        hash: '#' + masa.name,
      }}

      className={classNames(classes.base, {[classes.empty]: !masa.state, [classes.full]: masa.state})}
    > {masa.name} </NavLink>
  )
}

MasaButonu.propTypes = {
  classes: PropTypes.object.isRequired,
  masa: PropTypes.object.isRequired
};

export default withStyles(styles)(MasaButonu);
