import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import LineItem from './components/LineItem';
import SatirIslemleri from './components/SatirIslemleri';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {

  },

  base: {
      backgroundColor: "white",
      height: "60vh",
      padding: 0,
      margin: 0,
      overflow: "auto",
  },
  total: {
    borderTop: "1px solid grey",
    borderBottom: "1px solid grey",
    marginBottom: theme.spacing.unit,
    height: "10vh",
  }

});

class ShoppingCard extends React.Component{



  render(){
    const {classes} = this.props;

    let {lineitems} = this.props;
    return(
      <div className={classes.root}>
          <div className={classes.base}>
              <List dense>
                  {
                    lineitems.map((item, index) =>
                      index === this.props.selected ?
                        <LineItem key={item.id} selected={true}  item={item} setLine={this.props.setLine}/>
                      :
                        <LineItem key={item.id} selected={false} item={item} setLine={this.props.setLine}/>
                    )
                  }
              </List>
          </div>
          <div className={classes.total}>
            <Typography variant="headline">
              Toplam: {this.getTotal()} TL
            </Typography>
          </div>
          <SatirIslemleri action={this.props.handleLineIslem}/>
        </div>
    )}

    getTotal = () => {
      let {lineitems} = this.props;
      let total = 0;
      lineitems.forEach(e => {
        total += e.total;
      })
      return total;
    }
}

export default withStyles(styles)(ShoppingCard);
