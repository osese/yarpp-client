import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const styles = theme => ({

  base: {
    width: "100%",
    height: "8vh",
    backgroundColor: "grey",
  },
  fullheight: {
    width: "100%",
    height: "100%"
  },
  clicked: {
    backgroundColor: "purple",
  }
});

class IslemButonu extends React.Component{

  constructor(props){
    super(props);
    this.state = {clicked: false};
  }
  render(){
    const {classes} = this.props;
    const {statefull} = this.props;

    if(statefull){
      return (
        <button onClick={()=> { this.setState(p => {return {clicked: !p.clicked}}); this.props.onClick(this.props.olay)}} className={classNames(classes.base, {[classes.fullheight] : this.props.fullheight, [classes.clicked]: this.state.clicked})}>
          {this.props.children}
        </button>
      )
    }
    return(
      <button onClick={()=> {this.props.onClick(this.props.olay)}} className={classNames(classes.base, {[classes.fullheight] : this.props.fullheight})}>
        {this.props.children}
      </button>
    )
  }
}

IslemButonu.propTypes = {
  olay: PropTypes.string.isRequired,
}
export default withStyles(styles)(IslemButonu);
