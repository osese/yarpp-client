import React from 'react';
import {getRequest, postRequest, deleteRequest} from '../../utils/fetch12';
import MasaYerleriForm from './components/MasaYerleriForm';
import MasaYerleriTable from './components/MasaYerleriTable';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';




class MasaYerleriDuzenle extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isFetching: true,
    }
  }
  componentDidMount(){
    fetch(getRequest("/deskposition"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        masayerleri: json,
        isFetching: false,
        snackBarOpen: false,
        snackBarMessage: "",
      })
    })
    .catch(error => console.error(error))
  }

  handleSnackBarClose = () => {
      this.setState({
        snackBarOpen: false,
      })
  }

  render(){

    const {isFetching} = this.state;

    if(isFetching){
      return <h1> bekleniyor </h1>
    }

    return (
      <div>
        <MasaYerleriForm masaYeriKaydet = {this.masaYeriKaydet} snackBarMessenger = {this.snackBarMessenger}/>
        <MasaYerleriTable masayerleri = {this.state.masayerleri} masaYeriDelete = {this.masaYeriDelete}/>
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

  masaYeriKaydet = (masayeri) => {
    fetch(postRequest('/deskposition', masayeri))
    .then(response => response.json())
    .then(json => this.setState(prevState => {

      return {masayerleri: [...prevState.masayerleri, json], snackBarOpen: true, snackBarMessage: masayeri.name + " eklendi."}
    }))
  }

  masaYeriDelete = (masayeri) => {
    fetch(deleteRequest('/deskposition/' + masayeri.id))
    .then(response => response.text())
    .then(text => {

      if(text === "okey"){
        this.setState( prevState => {
          return { masayerleri: prevState.masayerleri.filter( e => e.id !== masayeri.id),
            snackBarOpen: true,
            snackBarMessage: masayeri.name + " silindi."}
          })
      }else{
        this.snackBarMessenger("Masa yeri masaya sahip olduğu için silinemedi.");
      }
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: masayeri.name + " silinirken bir hata oluştu.",
    }))
  }

  snackBarMessenger = (message) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: message,
    })
  }
}

export default MasaYerleriDuzenle;
