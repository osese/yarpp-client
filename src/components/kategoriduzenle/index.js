import React from 'react';
import KategoriForm from './components/KategoriForm';
import KategoriTable from './components/KategoriTable';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {getRequest, postRequest, deleteRequest} from '../../utils/fetch12';

class KategoriDuzenle extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isFetching: true,
      snackBarOpen: false,
      snackBarMessage: "",
    }
  }
  componentDidMount(){
    fetch(getRequest("/category"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        kategoriler: json,
        isFetching: false,
      })
    })
  }

  snackBarMessenger = (message) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: message,
    })
  }

  render(){
    const {isFetching} = this.state;

    if(isFetching){
      return <h1> bekleniyor </h1>
    }

    return (
      <div>
        <KategoriForm kategoriKaydet = {this.kategoriKaydet} snackBarMessenger = {this.snackBarMessenger}/>
        <KategoriTable kategoriler ={this.state.kategoriler} kategoriDelete={this.kategoriDelete}/>
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

  kategoriKaydet = (kategori) => {
    fetch(postRequest('/category', kategori))
    .then(response => response.json())
    .then(json => this.setState(prevState => {
      return {kategoriler: [...prevState.kategoriler, json]}
    }))
  }

  kategoriDelete = (kategori) => {
    fetch(deleteRequest('/category/' + kategori.id))
    .then(response => response.text())
    .then(text => {

      if(text === "okey"){
        this.setState( prevState => {
          return { kategoriler: prevState.kategoriler.filter( e => e.id !== kategori.id),
            snackBarOpen: true,
            snackBarMessage: kategori.name + " silindi."}
          })
      }else{
        this.snackBarMessenger("Kategori ürüne sahip olduğu için silinemedi.");
      }
    })
    .catch(error => this.setState({
      snackBarOpen: true,
      snackBarMessage: kategori.name + " silinirken bir hata oluştu.",
    }))
  }
}

export default KategoriDuzenle;
