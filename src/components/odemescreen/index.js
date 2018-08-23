import React from 'react';
import Odeme from './components/Odeme';
import {getRequest} from '../../utils/fetch12';
import SiparisListesi from './components/SiparisListesi';
import Grid from '@material-ui/core/Grid';
import {postRequest} from '../../utils/fetch12';
import { withRouter } from 'react-router'
import {withStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class OdemeScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isFetching: true,
      isFetching2: true,
      snackBarOpen: false,
      snackBarMessage: "",
    }
  }
  handleSnackBarClose = () => {
      this.setState({
        snackBarOpen: false,
      })
  }

  componentDidMount(){
    let id = parseInt(this.props.match.params.id);



    fetch(getRequest("/desk/" + id + "/payments"))
    .then(response => response.json())
    .then(json => this.setState({odemeler: json, isFetching: false,}))
    .catch(error => console.error(error))

    fetch(getRequest("/desk/" + id + "/order"))
    .then(response => response.json())
    .then(json => this.setState({siparisler: json, isFetching2: false}))
    .catch(error => console.error(error))

  }

  render(){
    const {isFetching, isFetching2} = this.state;

    if(isFetching){
      return (<h1> Server bekleniyor. </h1>)
    }

    if(isFetching2){
      return (<h1> Server bekleniyor. </h1>)
    }

    const {siparisler, odemeler} = this.state;
    let total = 0;
    let odenen = 0;

    odemeler.forEach(odeme => {
      odenen += odeme.amount;
    })
    siparisler.forEach(order => order.orderLines.forEach(line =>{
      total += line.total;
    }))

    return (
      <div>
        <Grid container>
          <Grid item xs={6} >
            <SiparisListesi siparisler = {this.state.siparisler} toplam={total}/>
          </Grid>
          <Grid item xs={6}>
            <Odeme snackBarMessenger={this.snackBarMessenger} odemeler = {this.state.odemeler} masaid = {this.props.match.params.id}  odemeYap = {this.odemeYap} kalan={total - odenen} masaTamam={this.masaTamam} masaYazdir={this.masaYazdir}/>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackBarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackBarMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackBarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }

  snackBarMessenger = (message) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: message,
    })
  }

  odemeYap = (amount, paymentType) => {

    let id = parseInt(this.props.match.params.id);
    fetch(postRequest("/desk/" + id + "/payments", {amount: amount, paymentType: paymentType}))
    .then(response => response.json())
    .then(json => {
      this.setState({
        odemeler: json,
        snackBarOpen: true,
        snackBarMessage: "Odeme islemi gerçekleşti.",
      })
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: "Bir hata oluştu.",
    }))
  }

  masaTamam = () => {
    let id = parseInt(this.props.match.params.id);

    fetch(postRequest("/desk/" + id + "/onay", {}))
    .then(response => response.json())
    .then(json => {
      // ana ekrana dön
      this.props.history.push("/")
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: "Bir hata oluştu.",
    }))
  }

  masaYazdir = () => {
    let id = parseInt(this.props.match.params.id);

    fetch(postRequest("/desk/" + id + "/yazdir", {}))
    .then(response => response.json())
    .then(json => {
      // receipt dönüyor
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "Fiş yazdırılıyor.",
      })
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: "Yazdirirken bir hata oluştu.",
    }))
  }
}

export default withRouter(OdemeScreen);
