import React from 'react';
import KullanicilarTable from './components/KullanicilarTable';
import KullaniciForm from './components/KullaniciForm'
import {getRequest, postRequest, deleteRequest} from '../../utils/fetch12';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class KullaniciDuzenle extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isFetching: true,
      snackBarOpen: false,
      snackBarMessage: "",
    }
  }

  componentDidMount(){
    fetch(getRequest("/user"))
    .then(response =>  response.json())
    .then(json => {
      this.setState({
        kullanicilar: json,
        isFetching: false,
      })
    })
    .catch(error => {console.log(error)})
  }

  kullaniciKaydet = (kullanici) => {
    fetch(postRequest("/user", kullanici))
    .then(response => response.json())
    .then(json => {
      this.setState(prevState => {
        return {kullanicilar : [...prevState.kullanicilar, json]}
      })
    })
  }

  kullaniciDelete = (kullanici) => {
    fetch(deleteRequest("/user/" + kullanici.id))
    .then(response => {
      this.setState(prevState => {
        return{
          snackBarOpen: true,
          snackBarMessage: kullanici.name + " silindi",
          kullanicilar: [...prevState.kullanicilar.filter(e => e.id !== kullanici.id)],
        }
      })
    })
    .catch(error => console.log(error));

  }

  snackBarMessenger = (message) => {
    this.setState({
      snackBarOpen: true,
      snackBarMessage: message,
    })
  }
  handleSnackBarClose = () => {
      this.setState({
        snackBarOpen: false,
      })
  }
  render(){
    const {isFetching} = this.state;

    if(isFetching){
      return <h1> bekleniyor.. </h1>
    }

    return (
      <div>
        <KullaniciForm kullaniciKaydet = {this.kullaniciKaydet} snackBarHook = {this.snackBarMessenger}/>
        <KullanicilarTable kullanicilar =  {this.state.kullanicilar} handleUserDelete = {this.kullaniciDelete}/>
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

}

export default KullaniciDuzenle;
