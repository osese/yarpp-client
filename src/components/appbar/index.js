import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


import MainDrawer from '../maindrawer';
import HomeIcon from '@material-ui/icons/Home';
import {withRouter} from 'react-router-dom'
import UserContext from '../usercontext';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ApplicationBar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          anchorEl: null,
          drawerOpen: false,
          isFetching: true,
        };
        this.masaadi = "";
    }
    handleChange = (event, checked) => {
      this.setState({ auth: checked });
    };

    handleUserButton = event => {

    };

    handleMenuButton = event => {
      this.setState( prevState => {
        return { drawerOpen: !prevState.drawerOpen}
      })
    }
    handleClose = () => {
      this.setState({ anchorEl: null });
    };

    goHome = ()=> {
      this.props.history.push("/");
    }

    componentWillMount() {

      // TODO: Open when user on

      // fetch(getRequest("/user/auth"))
      // .then(response => response.json())
      // .then(json => {
      //   this.setState({
      //     user: json,
      //     isFetching: false,
      //   })
      // })
      // .catch(error => console.error(error));


      // TODO: delete This
      this.setState({
        user: {
          name: "Omer",
        }
        ,isFetching: false,
      })
    }

    logout = () => {
      window.location.href = '/logout';
    }

    getMasaAdi = () => {
        return this.props.location.hash;
    }


    render(){

      const { classes } = this.props;
      const { anchorEl, isFetching } = this.state;

      return (

      <AppBar position="static" color="secondary">
       <Toolbar>
         <IconButton onClick={this.handleMenuButton} className={classes.menuButton} color="inherit" aria-label="Menu">
           <MenuIcon />
         </IconButton>
         {
           !isFetching &&
           <UserContext.Consumer>
            { user => (

             <MainDrawer
              open={this.state.drawerOpen}
              toggleDrawer={this.handleMenuButton}
              user = {user}
              logout = {this.logout}
             />
           )}
           </UserContext.Consumer>
         }

         <IconButton
          onClick={this.goHome}
         >
          <HomeIcon/>
         </IconButton>

         <Typography variant="subheading">
          {this.getMasaAdi()}
         </Typography>



       </Toolbar>
     </AppBar>
    )}
}



export default withRouter(withStyles(styles)(ApplicationBar));
