import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';


const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: "60vw",

    paddingLeft: "5vw",
  },
  base: {
    height: "80vh",
    overflowY: "scroll",
  },
  textfield: {
    width: "50vw",
  },
  button: {
    marginRight: "2vw",
    width: "10vw",
    marginBottom: "5vh",
  }
});

class SipDuzModal extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      isFetching: true,
      value: "",
    }
  }

  render(){

    const {classes} = this.props;
    const {old_orders} = this.props;

    return(
        <div >
        <List dense className={classes.base}>
        {
          old_orders.map(order =>
            <React.Fragment>
              <ListSubheader>
                {`Siparis ${order.id}`}
                <IconButton>
                  <CloseIcon onClick = { () => this.deleteHandle(order)}/>
                </IconButton>
              </ListSubheader>

              {order.orderLines.map((line) =>
                <ListItem button>
                  <ListItemText primary={line.productName}
                    secondary={line.count} />
                  <span> {line.total}</span>
                </ListItem>
              )}

            </React.Fragment>
        )
      }
        </List>
        </div>

    )
  }

  deleteHandle = (order) => {

    this.props.deleteOrder(order);
  }

}

export default withStyles(styles)(SipDuzModal);
