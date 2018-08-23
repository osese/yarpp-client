import React from 'react';

import OldOrders from '../../../siparisscreen/components/oldorders';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    margin: theme.spacing.unit *3 ,
  },
});

class SiparisListesi extends React.Component{



  render(){
      const {classes} = this.props;

      return (
        <Paper className={classes.root}>
          <OldOrders old_orders = {this.props.siparisler} toplam={this.props.toplam}/>
        </Paper>
      )
  }
}

export default withStyles(styles)(SiparisListesi);
