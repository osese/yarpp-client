import React from 'react';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCard from './components/shoppingcard/';
import RestauranteMenu from './components/restaurantmenu/';
import NotEkleModal from './components/NotEkleModal';
import OldOrders from './components/oldorders';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IslemlerBottomNavigation from './components/islemlerbottom';
import {getRequest, postRequest, deleteRequest} from '../utils/fetch12';
import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import MasaAktarModal from './components/MasaAktarModal';
import SipDuzModal from './components/SipDuzModal';
import Paper from '@material-ui/core/Paper'
import UserContext from '../components/usercontext';

const styles = theme => ({
  root: {
    backgroundColor: "white",
    margin: 0,
    padding: "2px",
  },
  leftbase:{
    backgroundColor: "white",
    height: "100%",
    bordert: "1px solid black",
  },

  rightbase:{

    height: "100vh",
    overflow: "auto",
  },
  modal: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',

  }
});

const islemler = {
  bir: "BIR",
  iki: "IKI",
  uc: "UC",
  dort: "DORT",
  bes: "BES",
  alti: "ALTI",
  yedi: "YEDI",
  sekiz: "SEKIZ",
  dokuz: "DOKUZ",
  sifir: "SIFIR",
  adet: "ADET",
  sil: "SIL",
  ode: "ODE",
  bolode: "BOLODE",
  nokta: "NOKTA",
  mutfagagonder: "MUTFAKGONDER",
  not: "NOT",
  aktar: "AKTAR",
};



class SiparisScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      islemMode: "normal",
      lineitems: [],
      old_orders: [],
      selectedLine: -1,
      totalAmount: 0,
      notEkleOpen: false,
      currentShoppingCard: 1,
      isModalOpen: false,
      modal: '',
    }
  }

  componentWillMount(){
      // todo take masa siparisleri by masa id
      let id = parseInt(this.props.match.params.id);
      fetch(getRequest("/desk/" + id + "/order"))
      .then(response => response.json())
      .then(json => this.setState({old_orders: json}))
      .catch(error => console.error(error))

  }


  shoppingCardChanged = (event, value) =>  {
    this.setState({
      currentShoppingCard: value
    })
  }

  render(){
    const {classes} = this.props;
    const {currentShoppingCard, lineitems, selectedLine, old_orders} = this.state;

    let total = 0;

    old_orders.forEach(order => order.orderLines.forEach(line =>{
      total += line.total;
    }))

    return(
      <div>
        <Grid
        container
        className={classNames(classes.root)}>
          <Grid item xs={6} className={classes.leftbase}>
            <Paper>
            <Grid
            container

            direction="column"
            alignItems = "stretch"
            >
            <Tabs
              value={currentShoppingCard}
              onChange={this.shoppingCardChanged}
              indicatorColor="primary"
              textColor="primary"
              scrollable
              scrollButtons="auto"
            >
              <Tab label="Eski" />
              <Tab label="Yeni" />
            </Tabs>
              {currentShoppingCard === 0 && <Grid><OldOrders old_orders = {old_orders} toplam = {total} /> </Grid>}
              {currentShoppingCard === 1 && <Grid><ShoppingCard selected ={selectedLine} setLine = {this.setSelectedLine} lineitems={lineitems}  handleLineIslem={this.handleLineIslem}/></Grid>}
            </Grid>
            </Paper>
          </Grid>

          <Grid item xs={6} className={classes.rightbase}>
              <RestauranteMenu addOrder={this.addOrder}/>
          </Grid>
          <NotEkleModal selectedLine={lineitems[selectedLine]} open={this.state.notEkleOpen} handleClose={this.notEkleHandleClose} handleKaydet={this.notEkleKaydet} />
          <UserContext.Consumer>
            { user => (
              user.roles[0] === 'ROLE_ADMIN' && <IslemlerBottomNavigation handleIslem = {this.handleIslemNavigationAction}/>
            )}
          </UserContext.Consumer>

        </Grid>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.modal}>
            <AppBar position="static" color="default">
              <Toolbar>
                  <IconButton>
                    <CloseIcon onClick={this.handleModalClose}/>
                  </IconButton>
              </Toolbar>

            </AppBar>
            {this.state.modal === 'aktar' && <MasaAktarModal srcId = {this.props.match.params.id}/>}
            {this.state.modal === 'sipduz' && <SipDuzModal old_orders={this.state.old_orders} deleteOrder={this.deleteOrder}/>}


          </div>
        </Modal>

      </div>
    )
  }

  deleteOrder = (order) => {
    // delete from db and mem
    fetch(deleteRequest("/order/" + order.id))
    .then(response => this.setState(prevState => {
      return { old_orders: prevState.old_orders.filter( e => e.id !== order.id )}
    }))
    .catch(error => console.error(error))




  }

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    })
  }

  handleIslemNavigationAction = (value) => {
    let id = parseInt(this.props.match.params.id);
    if(value === 'odeme'){
      this.props.history.push("/odemeler/" + id);
    }else if (value === 'sipduz'){
      this.setState({
        isModalOpen: true,
        modal: 'sipduz',
      })
    }else if (value === 'aktar'){
      this.setState({
        isModalOpen: true,
        modal: 'aktar',
      })
    }
  }

  handleLineIslem = (action) => {
    let {selectedLine} = this.state;
    let {lineitems} = this.state;
    if(action === "not"){
      if(selectedLine !== -1){
        this.notEkleHandleOpen();
      }
    }else if(action === "sil"){
      if(selectedLine !== -1){
        lineitems = lineitems.splice(selectedLine, 1);
        this.setState({
          selectedLine: -1
        });

      }
    }else if(action === "mutfagagonder"){
      this.postOrders();
    }else if(action === "gonder"){
      this.postOrdersWithoutPrint();
    }

  }

    notEkleHandleClose = () => {
      this.setState({
        notEkleOpen: false,
      })
    }
    notEkleHandleOpen = ()=> {
      this.setState({
        notEkleOpen: true,
      })
    }

    notEkleKaydet = (note) => {
      this.setState(prevState => {
          let s = prevState.selectedLine;
          prevState.lineitems[s].note = note;
          return {lineitems: prevState.lineitems}
      })
      this.notEkleHandleClose();
    }

    postOrders = () => {
      if(this.state.lineitems.length === 0){
        return;
      }

      let id = parseInt(this.props.match.params.id);
      fetch(postRequest("/desk/" + id + "/order/yazdir", this.state.lineitems))
      .then(response => response.json())
      .then(json => { this.setState( prevState => {return {old_orders: [...prevState.old_orders, json], lineitems: []}})})
      .catch(error => console.error(error))
    }

    postOrdersWithoutPrint = () => {
      if(this.state.lineitems.length === 0){
        return;
      }

      let id = parseInt(this.props.match.params.id);
      fetch(postRequest("/desk/" + id + "/order", this.state.lineitems))
      .then(response => response.json())
      .then(json => { this.setState( prevState => {return {old_orders: [...prevState.old_orders, json], lineitems: []}})})
      .catch(error => console.error(error))
    }

    setSelectedLine = (line) =>{
      let a = -1;
      this.setState( (prevState) => {
        for(var i = 0; i < prevState.lineitems.length; i++){
            if(prevState.lineitems[i].productName === line.productName){
              if(prevState.selectedLine !== i){
                a = i;
              }
          return {selectedLine: a};
        }
      }
      });

    }


    addOrder = (order) =>{
      this.setState( prevState =>{
        for(let i=0; i<prevState.lineitems.length; i++){
          if(prevState.lineitems[i].productName === order.name){
            prevState.lineitems[i].count += 1;
            prevState.lineitems[i].total += order.price;

            return {lineitems: prevState.lineitems};
          }
        }
        return {lineitems: [...prevState.lineitems, {"productName": order.name, "productPrice": order.price, "count": 1, "total": order.price}]}
      })
    }

}

export default withRouter(withStyles(styles)(SiparisScreen));
