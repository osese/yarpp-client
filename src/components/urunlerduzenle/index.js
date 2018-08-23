import React from 'react';
import UrunForm from './components/UrunForm';
import UrunTable from './components/UrunTable';
import {getRequest, postRequest, deleteRequest} from '../../utils/fetch12';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class UrunlerDuzenle extends React.Component{

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


  snackBarMessenger = (message) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: message,
    })
  }
  componentDidMount(){
    fetch(getRequest("/category"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        kategoriler: json,
        isFetching2: false,
      })
    })
    fetch(getRequest("/product"))
    .then(response =>  response.json())
    .then(json => {
      this.setState({
        urunler: json,
        isFetching: false,
      })
    })
    .catch(error => {console.log(error)})
  }

  urunKaydet = (urun) => {

    fetch(postRequest("/product", urun))
    .then(response =>  response.json())
    .then(json => {

      this.setState(prevState => {
        return {
          urunler: [...prevState.urunler, json],
          snackBarOpen: true,
          snackBarMessage: urun.name + " eklendi.",
        }
      })
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: urun.name + " eklenirken bir hata oluştu.",
    }))
  }


  render(){
    const {isFetching, isFetching2} = this.state ;

    if(isFetching){
      return <h1> bekleniyor.. </h1>
    }

    if(isFetching2){
      return <h1> bekleniyor.. </h1>
    }
    return (
      <div>
        <UrunForm urunKaydet = {this.urunKaydet} kategoriler= {this.state.kategoriler} snackBarMessenger = {this.snackBarMessenger}/>
        <UrunTable urunler = {this.state.urunler} urunDelete = {this.handleUrunDelete}/>
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

  handleUrunDelete = (urun)=> {

    fetch(deleteRequest('/product/' + urun.id))
    .then(response => this.setState( prevState => {
      return {
        urunler: prevState.urunler.filter(e => e !== urun),
        snackBarOpen: true,
        snackBarMessage: urun.name + " silindi.",
      }
    }))
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: urun.name + " silinirken bir hata oluştu.",
    }))
  }
}

export default UrunlerDuzenle;
