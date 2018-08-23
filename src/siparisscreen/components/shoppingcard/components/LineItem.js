import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
      padding: 0,
      margin: 0,
  },


  clicked: {
    backgroundColor: theme.palette.primary.main,
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
    }
  },

  base: {

  },

});

class LineItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "clicked": false,
    }
  }



  render(){
    const {classes} = this.props;
    let {item} = this.props;



    return(
      <ListItem button className={classNames(classes.base, {[classes.clicked]: this.props.selected}) } onClick={() => this.props.setLine(item)}>
        <ListItemText primary={item.productName}
          secondary={item.not ? `${item.count}  Adet x ${item.productPrice} TL  <> ${item.not}` : `${item.count}  Adet x ${item.productPrice} TL`} />

        <span> {item.total}</span>
      </ListItem>
    )
  }
}


LineItem.propTypes = {
  item: PropTypes.shape({
    productName: PropTypes.string,
    productPrice: PropTypes.number,
    count: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  setLine: PropTypes.func.isRequired,
};
export default withStyles(styles)(LineItem);
