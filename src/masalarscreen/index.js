import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import MasaButonu from './components/MasaButonu';
import { withStyles } from '@material-ui/core/styles';
import {getRequest} from '../utils/fetch12';
import WaitScreen from '../waitscreen';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
      backgroundColor: "grey",
  },

  base: {
    padding: theme.spacing.unit,

  }
});


class MasalarScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentTab: 0,
      isFetching: true,
      isFetching2: true,
    }
  }

  handleTabChange = (event, value) => {
    this.setState({
      currentTab: value,
    })
  }

  componentDidMount(){
    fetch(getRequest("/deskposition"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        masayerleri: json,
        isFetching: false,
      })
    })
    .catch(error => console.error(error))

    fetch(getRequest("/desk"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        masalar: json,
        isFetching2: false,
      })
    })
    .catch(error => console.log(error));

  }


  render(){
    const {classes} = this.props;
    const {masayerleri, masalar } = this.state;
    const {currentTab, isFetching, isFetching2} = this.state;

    if ( isFetching ){
      return <h1> Bekleniyor </h1>
    }

    if ( isFetching2 ){
      return <h1> Bekleniyor </h1>
    }

    let mp = {}
    masayerleri.forEach(yer => mp[yer.id] = []);
    masayerleri.forEach(yer => masalar.forEach( masa => {
      if(masa.position.id === yer.id){
        mp[yer.id].push(masa);
      }
    }))

    for (var key in mp) {
        if (mp.hasOwnProperty(key)) {
          mp[key].sort( function(a, b) {
            return a.name > b.name;
          });
        }
    }

    return(
      <div className={classes.base}>
        <Paper>
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
          >
            {masayerleri.map( masayeri =>
              <Tab key={masayeri.id} id={masayeri.id} label={masayeri.name} />
            )}
          </Tabs>
        </Paper>

        <Grid
          className={classNames(classes.base, classes.root)}
          container
          alignItems="center"
          alignContent="flex-start"
          justify="flex-start"
          direction="row">
          { mp[masayerleri[currentTab].id].map(masa =>

              <Grid key={masa.id} item>
                <MasaButonu masa={masa}/>
              </Grid>

          )}
        </Grid>
      </div>

    )
  }
}

export default withStyles(styles)(MasalarScreen);
