import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router-dom'

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class MainDrawer extends React.Component {


  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.toggleDrawer}
            onKeyDown={this.props.toggleDrawer}
          >
              <List className={classes.list} >
                  <ListItem>
                    <ListItemText primary={this.props.user.name} />
                  </ListItem>
                  {
                    this.props.user.roles[0] === 'ROLE_ADMIN' && (
                      <React.Fragment>
                  <Divider />
                  <ListItem button onClick={ () => this.props.history.push('/masalarduzenle') }>
                    <ListItemText primary="Masalar" />
                  </ListItem>
                  <ListItem button onClick={ () => this.props.history.push('/kullaniciduzenle') }>
                    <ListItemText primary="Kullanıcılar"  />
                  </ListItem>
                  <ListItem button onClick={ () => this.props.history.push('/urunlerduzenle') }>
                    <ListItemText primary="Ürünler" />
                  </ListItem>
                  <ListItem button onClick={ () => this.props.history.push('/kategoriduzenle') }>
                    <ListItemText primary="Kategoriler" />
                  </ListItem>
                  <ListItem button onClick={ () => this.props.history.push('/raporlarscreen') }>
                    <ListItemText primary="Raporlar" />
                  </ListItem>
                  <ListItem button onClick={ () => this.props.history.push('/masayerleriduzenle') }>
                    <ListItemText primary="Masa Yerleri" />
                  </ListItem>
                </React.Fragment>
              )}
              <Divider />
              <ListItem button onClick={this.props.logout} >
                <ListItemText primary={"Çıkış Yap"} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }


}

MainDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(MainDrawer));
