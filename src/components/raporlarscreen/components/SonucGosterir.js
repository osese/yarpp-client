import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
const styles = theme => ({

  picker: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    margin: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,

  },
});

class SonucGosterir extends React.Component{



  render(){
    const {classes} = this.props;
    const {total, payed} = this.props;

    return (
      <Paper className={classes.root} >
        <Typography variant="headline">

          Toplam: {total} TL
        </Typography>
        <Typography variant="headline">

          Odenen: {payed} TL
        </Typography>

      </Paper>
    )
  }
}


export default withStyles(styles)(SonucGosterir);
