import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {getRequest, postRequest, deleteRequest} from '../../utils/fetch12';
import MasalarTable from './components/MasalarTable';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MasalarForm from './components/MasalarForm';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class MasaDuzenle extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isFetching: true,
      isFetching2: true,
      snackBarOpen: false,
      snackBarMessage: "",
    }

    this.yenimasa = {}

  }

  componentDidMount(){
    fetch(getRequest("/desk"))
    .then(response =>  response.json())
    .then(json => {
      this.setState({
        masalar: json,
        isFetching: false,
      })
    })
    .catch(error => {console.log(error)})

    fetch(getRequest("/deskposition"))
    .then(response => response.json())
    .then(json => {
      this.setState({
        masayerleri: json,
        isFetching2: false,
      })
    })
  }

  handleSnackBarClose = () => {
      this.setState({
        snackBarOpen: false,
      })
  }

  handleMasaEkle = (masa) => {
    if(masa.name === "" || masa.position.name === ""){
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "Masa adi veya yeri boş bırakılamaz.",
      })
      return;
    }

    fetch(postRequest("/desk", masa))
    .then(response => {
      if(response.status > 400){
        this.setState({
          snackBarOpen: true,
          snackBarMessage: "Bir hata oluştu. ",
        })
      }else{
        response.json().then(json => {
          this.setState( prevState => {
            return {
              snackBarOpen: true,
              snackBarMessage: json.name + " başarıyla eklendi.",
              masalar: [...prevState.masalar, json],
            }
          })

        })
      }
    })
    .catch(json => {
      this.setState({
        snackBarOpen: true,
        snackBarMessage: "Bir hata oluştu.",
      })
    })
  }

  handleMasaDelete = (masa) => {
    //delete from db
    fetch(deleteRequest('/desk/' + masa.id))
    .then(response => {
      this.setState(prevState => {
          return {
            snackBarOpen: true,
            snackBarMessage: masa.name + " silindi.",
            masalar: [...prevState.masalar.filter(e => e.id !== masa.id)],
          }
      })

    })
    .catch(error => console.log(error))

  }



  render(){
    const {masayerleri, isFetching, isFetching2} = this.state;


    if(isFetching){
      return <h1> Waiting </h1>
    }
    if(isFetching2){
      return <h1> Bekleniyor </h1>
    }
    return (
      <div>
        <MasalarForm handleMasaEkle = {this.handleMasaEkle}  masayerleri = {masayerleri} />
        <div>
          <MasalarTable masalar={this.state.masalar} masaDelete = {this.handleMasaDelete}/>
        </div>
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

export default withStyles(styles)(MasaDuzenle);
