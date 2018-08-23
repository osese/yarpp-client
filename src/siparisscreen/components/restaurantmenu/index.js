import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuButton from './components/MenuButton';
import {getRequest} from '../../../utils/fetch12';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    flex:1,
  },


});


class RestaurantMenu extends React.Component{


  constructor(props){
    super(props);
    this.state = {isFetching: true , isFetching2: true, currentTab: 0};
    this.pc = {};
  }

  handleTabChange =  (event, value) => {
        this.setState({ currentTab: value });

  }
  componentDidMount(){

    fetch(getRequest('/product'))
    .then(response => response.json())
    .then(json => this.setState({ urunler: json, isFetching2: false}))
    .catch(error => console.error(error))

    fetch(getRequest('/category'))
    .then(response => response.json())
    .then(json => this.setState({kategoriler: json, isFetching: false}))
    .catch(error => console.error(error));

  }

  render(){

    const {classes} = this.props;
    const {isFetching, isFetching2} = this.state;
    const {currentTab, kategoriler} = this.state;

    if(isFetching){
      return <h1> Urunler bekleniyor </h1>
    }
    if(isFetching2){
      return <h1> Urunler bekleniyor </h1>
    }
    this.state.kategoriler.forEach(kat =>
      this.pc[kat.id] = []
    )
    this.state.kategoriler.forEach(kat => this.state.urunler.forEach(
      urun => {
          if(urun.categories.id === kat.id){
              this.pc[kat.id].push(urun)
          }
    }))
    return(

        <div className={classes.root}>
        <Tabs
         value={currentTab}
         onChange={this.handleTabChange}
         scrollable
         scrollButtons="on"
         indicatorColor="primary"
         textColor="primary"
       >
          {kategoriler.map(category =>
            <Tab key={category.id} label={category.name} />
          )}

         </Tabs>
          {
            this.pc[this.state.kategoriler[currentTab].id].map(item =>
                <MenuButton key={item.id} item={item} addOrder={this.props.addOrder}/>
            )
          }
        </div>
    )}
}

export default withStyles(styles)(RestaurantMenu);
