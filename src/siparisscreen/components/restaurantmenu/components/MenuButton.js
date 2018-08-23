import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  base: {
    margin: theme.spacing.unit,
    backgroundColor: "orange",
    height: theme.spacing.unit * 12,
    width: theme.spacing.unit * 12,
  }

});

class MenuButton extends React.Component{


  render(){
    const {classes} = this.props;
    let {item} = this.props;

  

    return(
      <button className={classes.base} onClick={this.addOrder}>
        {item.name} * {item.price}
      </button>

    )}

    addOrder = () => {
      this.props.addOrder(this.props.item);
    }
}

MenuButton.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string,
    code: PropTypes.string,
  }).isRequired,
  addOrder: PropTypes.func.isRequired,
}

export default withStyles(styles)(MenuButton);
