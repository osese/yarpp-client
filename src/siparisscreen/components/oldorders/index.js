import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
      backgroundColor: "white",
      height:"100vh",
      padding: 0,
      margin: 0,
      overflow: "auto",
  },
  total: {
    height: "10vh",
  }

});

class OldOrders extends React.Component{


  render(){
    const {old_orders} = this.props;
    const {classes} = this.props;

    return (
        <div className={classes.root}>
          <List dense>
          {
            old_orders.map(order =>
              <React.Fragment key={order.id}>
                <ListSubheader>
                  {`Siparis ${order.id}. ${order.startDate}`}
                </ListSubheader>

                {order.orderLines.map(line =>
                  <ListItem button key={line.id}>
                    <ListItemText primary={line.productName}
                      secondary={line.count} />
                    <span> {line.total}</span>

                  </ListItem>
                )}

              </React.Fragment>
          )
        }
          </List>
          <h4> Toplam: {this.props.toplam} TL</h4>
        </div>
    )
  }
}

export default withStyles(styles)(OldOrders);
